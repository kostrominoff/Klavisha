import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeormConfig } from './configs/typeorm.config';
import { AuthModule } from './auth/auth.module';
import { InstitutionsModule } from './institutions/institutions.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: TypeormConfig,
    }),
    UsersModule,
    AuthModule,
    InstitutionsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
