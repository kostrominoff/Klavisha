import { ConfigService } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';

// Access token
export const JwtConfig = (configService: ConfigService): JwtModuleOptions => ({
  secret: configService.getOrThrow('JWT_SECRET'),
  signOptions: {
    expiresIn: '10s',
  },
});
