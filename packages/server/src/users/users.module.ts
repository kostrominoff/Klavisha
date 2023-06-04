import { Global, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { GroupsModule } from 'src/groups/groups.module';
import { InstitutionsModule } from 'src/institutions/institutions.module';

@Global()
@Module({
  imports: [
    GroupsModule,
    InstitutionsModule,
    TypeOrmModule.forFeature([UserEntity]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
