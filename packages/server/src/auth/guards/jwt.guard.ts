import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { cookieExtractor } from '../cookie.extractor';
import { ExtractJwt } from 'passport-jwt';
import { NO_AUTH } from 'src/errors';
import { AuthService } from '../auth.service';
import { Request, Response } from 'express';

@Injectable()
export class JwtGuard extends AuthGuard('jwt') {
  constructor(private readonly authService: AuthService) {
    super();
  }

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<Request>();
    const response = context.switchToHttp().getResponse<Response>();

    try {
      // Access token
      const accessToken = ExtractJwt.fromExtractors([cookieExtractor])(request);
      if (!accessToken) throw new UnauthorizedException(NO_AUTH);

      const userByAccessToken = await this.authService.validateAccessToken(
        accessToken,
      );

      if (userByAccessToken)
        return super.canActivate(context) as Promise<boolean>;

      // Refresh token
      const refreshToken = request.cookies.refreshToken;
      if (!refreshToken) throw new UnauthorizedException(NO_AUTH);

      const userByRefreshToken = await this.authService.validateRefreshToken(
        refreshToken,
      );
      if (!userByRefreshToken) throw new UnauthorizedException(NO_AUTH);

      // New tokens
      const tokens = await this.authService.generateTokens(
        userByRefreshToken.id,
      );

      // Set request cookies
      request.cookies.accessToken = tokens.accessToken;
      request.cookies.refreshToken = tokens.refreshToken;

      // Set response cookies
      response.cookie('accessToken', tokens.accessToken, {
        httpOnly: true,
      });
      response.cookie('refreshToken', tokens.refreshToken, {
        httpOnly: true,
      });

      return super.canActivate(context) as Promise<boolean>;
    } catch {
      // Clear cookies
      response.clearCookie('accessToken');
      response.clearCookie('refreshToken');
      return false;
    }
  }
}
