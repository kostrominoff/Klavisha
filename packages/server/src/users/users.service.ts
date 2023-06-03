import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { hash } from 'bcrypt';
import { UpdateUserDto } from './dto/update-user.dto';
import { StudentsService } from 'src/students/students.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly studentsService: StudentsService,
  ) {}

  async create({
    password,
    groupId,
    subgroup,
    institutionsId,
    ...dto
  }: CreateUserDto) {
    // TODO: generate password and send to the email
    if (!password) password = 'password';
    const hashedPassword = await hash(password, 10);

    const user = await this.userRepository.save({
      ...dto,
      institutions: institutionsId?.map((id) => ({ id })),
      password: hashedPassword,
    });

    if (groupId)
      await this.studentsService.create({
        groupId,
        subgroup,
        userId: user.id,
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
        student: true,
      },
    });
  }

  async findOneByEmail(email: string) {
    return await this.userRepository.findOne({
      where: {
        email,
      },
      loadRelationIds: true,
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
