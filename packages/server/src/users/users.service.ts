import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { ILike, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { hash } from 'bcrypt';
import { UpdateUserDto } from './dto/update-user.dto';
import { USER_ALREADY_EXISTS } from 'src/errors';
import { Roles } from '@klavisha/types';
import { Pagination } from 'src/types/pagination';

type SearchParams = {
  name?: string;
  email?: string;
};

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {
    // Create admin user
    userRepository
      .findOne({ where: { email: 'kostromin@ngsquad.ru' } })
      .then((result) => {
        if (!result)
          this.create({
            email: 'kostromin@ngsquad.ru',
            password: 'password',
            role: Roles.ADMIN,
            firstname: 'Админ',
            secondname: 'Админович',
          });
      });
  }

  async findAll(
    { limit = 30, page = 1 }: Pagination,
    { name, email }: SearchParams,
  ) {
    const [users, count] = await this.userRepository.findAndCount({
      relations: {
        institutions: true,
        teacher: true,
        student: true,
      },
      skip: (page - 1) * limit,
      take: limit,
      where: {
        email: ILike(`%${email}%`),
        fullname: ILike(`%${name}%`),
      },
      select: {
        fullname: true,
        firstname: true,
        secondname: true,
        fathername: true,
        id: true,
        email: true,
        phone: true,
        role: true,
        avatar: true,
        birthday: true,
        student: {
          id: true,
          subgroup: true,
          group: {
            id: true,
            name: true,
          },
        },
        teacher: {
          id: true,
          institution: {
            id: true,
          },
        },
        institutions: true,
      },
    });
    const pages = Math.ceil(count / limit);
    return {
      users,
      count,
      pages,
    };
  }

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
      student: groupId && {
        group: {
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
