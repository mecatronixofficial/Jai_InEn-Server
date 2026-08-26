import {
  BadRequestException,
  BadGatewayException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import * as streamifier from 'streamifier';
import { CloudinaryProvider } from './cloudinary.provider';

export interface UploadedImage {
  url: string;
  publicId: string;
  width: number;
  height: number;
  format: string;
  bytes: number;
}

@Injectable()
export class UploadsService {
  constructor(private readonly cloudinary: CloudinaryProvider) {}

  async uploadImage(file: Express.Multer.File): Promise<UploadedImage> {
    if (!file) throw new BadRequestException('No file provided');
    if (!file.mimetype.startsWith('image/')) {
      throw new BadRequestException('Only image uploads are accepted');
    }
    if (!file.buffer?.length) {
      throw new BadRequestException('The uploaded image is empty');
    }
    if (!this.cloudinary.isConfigured) {
      throw new InternalServerErrorException(
        'Cloudinary is not configured on the server. Set CLOUDINARY_CLOUD_NAME / CLOUDINARY_API_KEY / CLOUDINARY_API_SECRET.',
      );
    }

    return new Promise<UploadedImage>((resolve, reject) => {
      let settled = false;
      let inputStream: ReturnType<typeof streamifier.createReadStream> | undefined;
      let uploadStream: ReturnType<
        typeof this.cloudinary.client.uploader.upload_stream
      > | undefined;

      const finish = (error?: Error, image?: UploadedImage) => {
        if (settled) return;
        settled = true;
        clearTimeout(timeout);
        if (error) reject(error);
        else if (image) resolve(image);
      };

      const timeout = setTimeout(() => {
        inputStream?.destroy();
        uploadStream?.destroy();
        finish(
          new BadGatewayException(
            `Image upload timed out after ${this.cloudinary.uploadTimeoutMs / 1000} seconds. Please try again.`,
          ),
        );
      }, this.cloudinary.uploadTimeoutMs);

      try {
        uploadStream = this.cloudinary.client.uploader.upload_stream(
          {
            folder: this.cloudinary.folder,
            resource_type: 'image',
            timeout: this.cloudinary.uploadTimeoutMs,
          },
          (error, result) => {
            if (error || !result) {
              return finish(
                new BadGatewayException(error?.message || 'Cloudinary upload failed'),
              );
            }
            finish(undefined, {
              url: result.secure_url,
              publicId: result.public_id,
              width: result.width,
              height: result.height,
              format: result.format,
              bytes: result.bytes,
            });
          },
        );

        uploadStream.on('error', (error) => {
          finish(new BadGatewayException(error.message || 'Upload stream failed'));
        });

        inputStream = streamifier.createReadStream(file.buffer);
        inputStream.on('error', (error) => {
          finish(new BadGatewayException(error.message || 'Unable to read upload'));
        });
        inputStream.pipe(uploadStream);
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Upload failed';
        finish(new InternalServerErrorException(message));
      }
    });
  }

  async deleteImage(publicId: string) {
    if (!this.cloudinary.isConfigured) {
      throw new InternalServerErrorException('Cloudinary not configured');
    }
    const res = await this.cloudinary.client.uploader.destroy(publicId);
    return { ok: res.result === 'ok', result: res.result, publicId };
  }
}
