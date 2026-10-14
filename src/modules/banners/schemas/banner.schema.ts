import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type BannerDocument = HydratedDocument<Banner>;

export enum BannerKind {
  HERO = 'hero',
  ABOUT_BANNER = 'about_banner',
  OPENING_CARD = 'opening_card',
  PAGE_BANNER = 'page_banner',
  SECTION_IMAGE = 'section_image',
}

@Schema({ timestamps: true })
export class Banner {
  @Prop({ required: true, enum: BannerKind, index: true })
  kind: BannerKind;

  @Prop({ trim: true, lowercase: true, index: true }) pageKey?: string;

  @Prop({ trim: true, lowercase: true, index: true }) slotKey?: string;

  @Prop({ required: true }) title: string;
  @Prop() highlight?: string;
  @Prop() subtitle?: string;
  @Prop() eyebrow?: string;
  @Prop({ required: true }) description: string;
  @Prop({ required: true }) image: string;
  @Prop({ required: true }) ctaLabel: string;
  @Prop({ required: true }) ctaHref: string;
  @Prop() secondaryLabel?: string;
  @Prop() secondaryHref?: string;
  @Prop() badge?: string;
  @Prop() expiresAt?: Date;

  @Prop({ default: 0 }) order: number;
  @Prop({ default: true, index: true }) active: boolean;
}

export const BannerSchema = SchemaFactory.createForClass(Banner);
BannerSchema.index({ kind: 1, pageKey: 1, slotKey: 1, active: 1 });
BannerSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (_d, ret: any) => {
    ret.id = ret._id;
    delete ret._id;
    return ret;
  },
});
