import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InstitutionEntity } from './entities/institution.entity';
import { Like, Repository } from 'typeorm';
import { NOT_FOUND as INSTITUTION_NOT_FOUND } from 'src/errors/institution.errors';
import { CreateInstitutionDto } from './dto/create-institution.dto';
import { UpdateInstitutionDto } from './dto/update-institution.dto';
import { NO_ACCESS } from 'src/errors/access.errors';

type SearchParams = {
  name?: string;
  city?: string;
};

@Injectable()
export class InstitutionsService {
  constructor(
    @InjectRepository(InstitutionEntity)
    private readonly institutionRepository: Repository<InstitutionEntity>,
  ) {}

  async findAll(limit = 10, page = 1, { name, city }: SearchParams) {
    const [institutions, count] = await this.institutionRepository.findAndCount(
      {
        skip: (page - 1) * limit,
        take: limit,
        where: {
          name: Like(`%${name}%`),
          city: Like(`%${city}%`),
        },
        select: {
          city: true,
          name: true,
          photo: true,
        },
      },
    );
    const pages = Math.floor(count / limit) + 1;
    return {
      institutions,
      count,
      pages,
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
    { owners, ...dto }: UpdateInstitutionDto,
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

  async checkIsOwner(id: number, userId: number) {
    const institution = await this.findOneById(id);
    if (!institution.owners.map(({ id }) => id).includes(userId))
      throw new ForbiddenException(NO_ACCESS);
  }
}
