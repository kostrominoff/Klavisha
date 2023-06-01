import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InstitutionEntity } from './entities/institution.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import {
  ICreateInstitutionDto,
  IUpdateInstitutionDto,
  Roles,
} from '@klavisha/types';
import { NOT_FOUND } from 'src/errors/user.errors';
import { NOT_FOUND as INSTITUTION_NOT_FOUND } from 'src/errors/institution.errors';

@Injectable()
export class InstitutionsService {
  constructor(
    @InjectRepository(InstitutionEntity)
    private readonly institutionRepository: Repository<InstitutionEntity>,
    private readonly usersService: UsersService,
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

  async create({ ownerId, ...dto }: ICreateInstitutionDto) {
    await this.updateUserRole(ownerId, true);

    const institution = await this.institutionRepository.save({
      ...dto,
      owner: {
        id: ownerId,
      },
    });

    return institution;
  }

  async update(
    institutionId: number,
    { ownerId, ...dto }: IUpdateInstitutionDto,
  ) {
    const oldInstitution = await this.findOneById(institutionId);
    if (oldInstitution.owner.id !== ownerId) {
      await this.updateUserRole(ownerId, true);
      await this.updateUserRole(oldInstitution.owner.id);
    }

    const institution = await this.institutionRepository.update(
      {
        id: institutionId,
      },
      {
        ...dto,
        owner: {
          id: ownerId,
        },
      },
    );

    return institution;
  }

  async delete(id: number) {
    const institution = await this.findOneById(id);
    if (!institution) throw new NotFoundException(INSTITUTION_NOT_FOUND);

    await this.updateUserRole(institution.owner.id);

    return await this.institutionRepository.delete({
      id: id,
    });
  }

  private async updateUserRole(userId: number, setRole?: boolean) {
    const user = await this.usersService.findOneById(userId);
    if (!user) throw new NotFoundException(NOT_FOUND);

    if (setRole) {
      if (!user.roles.includes(Roles.INSTITUTION_ADMIN))
        return await this.usersService.update(userId, {
          roles: [...user.roles, Roles.INSTITUTION_ADMIN],
        });
    } else {
      if (
        user.institutions.length <= 1 &&
        user.roles.includes(Roles.INSTITUTION_ADMIN)
      )
        return await this.usersService.update(userId, {
          roles: user.roles.filter((role) => role !== Roles.INSTITUTION_ADMIN),
        });
    }
  }
}
