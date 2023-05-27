import { ILoginUserDto, IRegisterUserDto } from '@klavisha/types';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { compare } from 'bcrypt';
import { INVALID_CREDENTAILS, USER_ALREADY_EXISTS } from 'src/errors';
import { UsersService } from 'src/users/users.service';

// TODO: Validate dto

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async login({ email, password }: ILoginUserDto) {
    const user = await this.usersService.findOneByEmail(email);
    if (!user) throw new UnauthorizedException(INVALID_CREDENTAILS);

    const matchPasswords = await compare(password, user.password);
    if (!matchPasswords) throw new UnauthorizedException(INVALID_CREDENTAILS);

    // TODO: Create tokens

    return;
  }

  async register(dto: IRegisterUserDto) {
    const user = await this.usersService.findOneByEmail(dto.email);
    if (user) throw new BadRequestException(USER_ALREADY_EXISTS);

    const createdUser = await this.usersService.create(dto);
    // TODO: Update group of user

    // TODO: Create tokens
    return;
  }
}
