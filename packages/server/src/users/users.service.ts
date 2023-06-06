import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { hash } from 'bcrypt';
import { UpdateUserDto } from './dto/update-user.dto';
import { USER_ALREADY_EXISTS } from 'src/errors';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create({
    password,
    groupId,
    subgroup,
    institutionsId,
    ...dto
  }: CreateUserDto) {
    // TODO: generate password and send to the email

    const oldUser = await this.findOneByEmail(dto.email);
    if (oldUser) throw new BadRequestException(USER_ALREADY_EXISTS);

    if (!password) password = 'password';
    const hashedPassword = await hash(password, 10);

    const user = await this.userRepository.save({
      ...dto,
      student: {
        group: groupId && {
          id: groupId,
        },
        subgroup: subgroup,
      },
      institutions: institutionsId?.map((id) => ({ id })),
      password: hashedPassword,
    });

    return user;
  }

  async findOneById(id: number) {
    return await this.userRepository.findOne({
      where: {
        id,
      },
      relations: {
        institutions: true,
        student: {
          group: true,
        },
        teacher: true,
      },
    });
  }

  async findOneByEmail(email: string) {
    return await this.userRepository.findOne({
      where: {
        email,
      },
      relations: {
        institutions: true,
        student: {
          group: true,
        },
        teacher: true,
      },
    });
  }

  async update(id: number, { password, ...dto }: UpdateUserDto) {
    if (password) password = await hash(password, 10);
    return await this.userRepository.update(
      {
        id,
      },
      {
        ...dto,
        password,
      },
    );
  }

  async delete(id: number) {
    return await this.userRepository.delete({
      id,
    });
  }
}
