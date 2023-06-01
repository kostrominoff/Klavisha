import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { InstitutionsService } from './institutions.service';
import { CreateInstitutionDto } from './dto/create-institution.dto';
import { Auth } from 'src/auth/guards/auth.guard';
import { GuardRoles, Roles } from '@klavisha/types';
import { UpdateInstitutionDto } from './dto/update-institution.dto';
import { CurrentUser } from 'src/users/decorators/user.decorator';

@Controller('institutions')
export class InstitutionsController {
  constructor(private readonly institutionsService: InstitutionsService) {}

  @Auth([GuardRoles.ADMIN])
  @Post()
  async create(@Body() dto: CreateInstitutionDto) {
    return await this.institutionsService.create(dto);
  }

  @Get()
  async findAll(
    @Query('limit') limit?: number,
    @Query('page') page?: number,
    @Query('name') name = '',
    @Query('city') city = '',
  ) {
    return await this.institutionsService.findAll(limit, page, { name, city });
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.institutionsService.findOneById(id);
  }

  @Auth([GuardRoles.ADMIN, GuardRoles.INSTITUTION_ADMIN])
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateInstitutionDto,
    @CurrentUser('role') role: Roles,
    @CurrentUser('id') userId: number,
  ) {
    if (role !== Roles.ADMIN)
      await this.institutionsService.checkIsOwner(id, userId);
    return await this.institutionsService.update(id, dto);
  }

  @Auth([GuardRoles.ADMIN, GuardRoles.INSTITUTION_ADMIN])
  @Delete(':id')
  async delete(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser('role') role: Roles,
    @CurrentUser('id') userId: number,
  ) {
    if (role !== Roles.ADMIN)
      await this.institutionsService.checkIsOwner(id, userId);
    return await this.institutionsService.delete(id);
  }
}
