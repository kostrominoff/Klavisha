import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtPayload } from 'src/types/jwt-payload';
import { ConfigService } from '@nestjs/config';
import { UsersService } from 'src/users/users.service';
import { NO_AUTH } from 'src/errors';
import { UserWithoutPassword } from '@klavisha/types';
import { cookieExtractor } from '../cookie.extractor';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly usersService: UsersService,
    configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
      ignoreExpiration: false,
      secretOrKey: configService.getOrThrow('JWT_SECRET'),
    });
  }

  async validate(payload: JwtPayload): Promise<UserWithoutPassword> {
    const user = await this.usersService.findOneById(payload.userId);
    if (!user) throw new UnauthorizedException(NO_AUTH);

    delete user.password;

    return user;
  }
}
