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

  async create({
    firstname,
    secondname,
    fathername,
    password,
    roles,
    email,
  }: CreateUserDto) {
    const hashedPassword = await hash(password, 10);
    return await this.userRepository.save({
      firstname,
      secondname,
      fathername,
      roles,
      email,
      password: hashedPassword,
    });
  }

  async findOneById(id: number) {
    return await this.userRepository.findOne({
      where: {
        id,
      },
    });
  }

  async findOneByEmail(email: string) {
    return await this.userRepository.findOne({
      where: {
        email,
      },
    });
  }

  async update(
    id: number,
    {
      firstname,
      secondname,
      fathername,
      password,
      roles,
      email,
      birthday,
      avatar,
      phone,
    }: UpdateUserDto,
  ) {
    return await this.userRepository.update(
      {
        id,
      },
      {
        firstname,
        secondname,
        fathername,
        password,
        roles,
        email,
        birthday,
        avatar,
        phone,
      },
    );
  }

  async delete(id: number) {
    return await this.userRepository.delete({
      id,
    });
  }
}
