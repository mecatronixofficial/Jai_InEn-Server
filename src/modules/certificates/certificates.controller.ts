import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { Roles } from '../../common/decorators/roles.decorator';
import { Role } from '../../common/enums/role.enum';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { CreateCertificateDto, UpdateCertificateDto } from './dto/certificate.dto';
import { CertificatesService } from './certificates.service';

@ApiTags('public')
@Controller('certificates')
export class CertificatesPublicController {
  constructor(private readonly service: CertificatesService) {}

  @Get()
  @ApiOperation({ summary: 'List active certificates.' })
  list() {
    return this.service.listPublic();
  }
}

@ApiTags('admin')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN, Role.EDITOR)
@Controller('admin/certificates')
export class CertificatesAdminController {
  constructor(private readonly service: CertificatesService) {}

  @Get()
  listAll() {
    return this.service.listAll();
  }

  @Post()
  create(@Body() dto: CreateCertificateDto) {
    return this.service.create(dto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateCertificateDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
