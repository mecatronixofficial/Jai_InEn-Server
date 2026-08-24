import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import {
  CertificatesAdminController,
  CertificatesPublicController,
} from './certificates.controller';
import { CertificatesService } from './certificates.service';
import { Certificate, CertificateSchema } from './schemas/certificate.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Certificate.name, schema: CertificateSchema },
    ]),
  ],
  controllers: [CertificatesPublicController, CertificatesAdminController],
  providers: [CertificatesService],
  exports: [CertificatesService],
})
export class CertificatesModule {}
