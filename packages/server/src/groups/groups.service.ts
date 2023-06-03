import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GroupEntity } from './entities/group.entity';
import { Repository } from 'typeorm';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { Pagination } from 'src/types/pagination';

@Injectable()
export class GroupsService {
  constructor(
    @InjectRepository(GroupEntity)
    private readonly groupRepository: Repository<GroupEntity>,
  ) {}

  async create({ institutionId, ...dto }: CreateGroupDto) {
    return await this.groupRepository.save({
      ...dto,
      institution: {
        id: institutionId,
      },
    });
  }

  async findOneById(id: number) {
    return await this.groupRepository.findOne({
      where: {
        id,
      },
      relations: {
        institution: true,
        students: true,
      },
    });
  }

  async findAll({ page = 1, limit = 30 }: Pagination, institutionId?: number) {
    const [groups, count] = await this.groupRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      where: {
        institution: {
          id: institutionId,
        },
      },
    });
    const pages = Math.ceil(count / limit);
    return { groups, count, pages };
  }

  async update(id: number, dto: UpdateGroupDto) {
    return await this.groupRepository.update(
      {
        id,
      },
      { ...dto },
    );
  }

  async delete(id: number) {
    return await this.groupRepository.delete({ id });
  }
}
