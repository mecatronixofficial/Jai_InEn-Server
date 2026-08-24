import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CertificateDocument = HydratedDocument<Certificate>;

@Schema({ timestamps: true })
export class Certificate {
  @Prop({ required: true, trim: true }) title: string;
  @Prop({ required: true }) image: string;
  @Prop({ trim: true }) description?: string;
  @Prop({ trim: true }) issuer?: string;
  @Prop() issuedAt?: Date;
  @Prop({ default: 0 }) order: number;
  @Prop({ default: true, index: true }) active: boolean;
}

export const CertificateSchema = SchemaFactory.createForClass(Certificate);
CertificateSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (_document, result: any) => {
    result.id = result._id;
    delete result._id;
    return result;
  },
});
