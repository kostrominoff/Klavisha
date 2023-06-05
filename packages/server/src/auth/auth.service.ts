import { Tokens } from '@klavisha/types';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { INVALID_CREDENTAILS, NO_AUTH, USER_ALREADY_EXISTS } from 'src/errors';
import { UsersService } from 'src/users/users.service';
import { LoginUserDto } from './dto/login-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { JwtPayload } from 'src/types/jwt-payload';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async login({ email, password }: LoginUserDto) {
    const user = await this.usersService.findOneByEmail(email);
    if (!user) throw new UnauthorizedException(INVALID_CREDENTAILS);

    const matchPasswords = await compare(password, user.password);
    if (!matchPasswords) throw new UnauthorizedException(INVALID_CREDENTAILS);

    const tokens = await this.generateTokens(user.id);
    return tokens;
  }

  async register({ groupId, ...dto }: RegisterUserDto) {
    const user = await this.usersService.findOneByEmail(dto.email);
    if (user) throw new BadRequestException(USER_ALREADY_EXISTS);

    const createdUser = await this.usersService.create({
      ...dto,
      groupId,
    });

    const tokens = await this.generateTokens(createdUser.id);
    return tokens;
  }

  async generateTokens(userId: number): Promise<Tokens> {
    const accessToken = await this.jwtService.signAsync({
      userId,
    });

    const refreshToken = await this.jwtService.signAsync(
      {
        userId,
      },
      {
        expiresIn: '5d',
        secret: this.configService.getOrThrow('JWT_REFRESH_SECRET'),
      },
    );

    return {
      accessToken,
      refreshToken,
    };
  }

  private async validateUser(id: number) {
    const user = await this.usersService.findOneById(id);
    if (!user) throw new UnauthorizedException(NO_AUTH);

    return user;
  }

  async validateAccessToken(token: string) {
    const { userId } = await this.jwtService.verifyAsync<JwtPayload>(token);

    return await this.validateUser(userId);
  }

  async validateRefreshToken(token: string) {
    const { userId } = await this.jwtService.verifyAsync<JwtPayload>(token, {
      secret: this.configService.getOrThrow('JWT_REFRESH_SECRET'),
    });

    return await this.validateUser(userId);
  }
}
