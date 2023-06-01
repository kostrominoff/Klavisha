import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InstitutionEntity } from './entities/institution.entity';
import { Repository } from 'typeorm';
import { IUpdateInstitutionDto } from '@klavisha/types';
import { NOT_FOUND as INSTITUTION_NOT_FOUND } from 'src/errors/institution.errors';
import { CreateInstitutionDto } from './dto/create-institution.dto';

@Injectable()
export class InstitutionsService {
  constructor(
    @InjectRepository(InstitutionEntity)
    private readonly institutionRepository: Repository<InstitutionEntity>,
  ) {}

  async findAll(limit = 10, page = 1) {
    const [institutions, count] = await this.institutionRepository.findAndCount(
      {
        skip: (page - 1) * limit,
        take: limit,
      },
    );
    return {
      institutions,
      count,
    };
  }

  async findOneById(id: number) {
    return await this.institutionRepository.findOne({
      where: {
        id,
      },
    });
  }

  async create({ owners, ...dto }: CreateInstitutionDto) {
    const institution = await this.institutionRepository.save({
      ...dto,
      owners: owners.map((owner) => ({
        id: owner,
      })),
    });

    return institution;
  }

  async update(
    institutionId: number,
    { owners, ...dto }: IUpdateInstitutionDto,
  ) {
    const institution = await this.institutionRepository.update(
      {
        id: institutionId,
      },
      {
        ...dto,
        owners: owners.map((owner) => ({ id: owner })),
      },
    );

    return institution;
  }

  async delete(id: number) {
    const institution = await this.findOneById(id);
    if (!institution) throw new NotFoundException(INSTITUTION_NOT_FOUND);

    return await this.institutionRepository.delete({
      id: id,
    });
  }
}
