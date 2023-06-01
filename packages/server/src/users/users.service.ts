import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { hash } from 'bcrypt';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create({ password, ...dto }: CreateUserDto) {
    const hashedPassword = await hash(password, 10);
    return await this.userRepository.save({
      ...dto,
      password: hashedPassword,
    });
  }

  async findOneById(id: number) {
    return await this.userRepository.findOne({
      where: {
        id,
      },
      relations: {
        institutions: true,
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
