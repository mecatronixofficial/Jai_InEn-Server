import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateCertificateDto, UpdateCertificateDto } from './dto/certificate.dto';
import { Certificate, CertificateDocument } from './schemas/certificate.schema';

@Injectable()
export class CertificatesService {
  constructor(
    @InjectModel(Certificate.name)
    private readonly model: Model<CertificateDocument>,
  ) {}

  listPublic() {
    return this.model.find({ active: true }).sort({ order: 1, createdAt: -1 });
  }

  listAll() {
    return this.model.find().sort({ order: 1, createdAt: -1 });
  }

  async create(dto: CreateCertificateDto) {
    const title = dto.title.trim();
    if (!title) throw new BadRequestException('Certificate title is required');
    return this.model.create({ ...dto, title });
  }

  async update(id: string, dto: UpdateCertificateDto) {
    const patch: UpdateCertificateDto = { ...dto };
    if (dto.title !== undefined) {
      const title = dto.title.trim();
      if (!title) throw new BadRequestException('Certificate title is required');
      patch.title = title;
    }

    const certificate = await this.model.findByIdAndUpdate(id, patch, { new: true });
    if (!certificate) throw new NotFoundException('Certificate not found');
    return certificate;
  }

  async remove(id: string) {
    const certificate = await this.model.findByIdAndDelete(id);
    if (!certificate) throw new NotFoundException('Certificate not found');
    return { deleted: true, id };
  }
}
