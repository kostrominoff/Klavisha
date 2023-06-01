import { Body, Controller, Post } from '@nestjs/common';
import { InstitutionsService } from './institutions.service';
import { CreateInstitutionDto } from './dto/create-institution.dto';
import { Auth } from 'src/auth/guards/auth.guard';
import { GuardRoles } from '@klavisha/types';

@Controller('institutions')
export class InstitutionsController {
  constructor(private readonly institutionsService: InstitutionsService) {}

  @Auth([GuardRoles.ADMIN])
  @Post()
  async create(@Body() dto: CreateInstitutionDto) {
    return await this.institutionsService.create(dto);
  }
}
