import { Module } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { GroupsController } from './groups.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupEntity } from './entities/group.entity';
import { InstitutionsModule } from 'src/institutions/institutions.module';

@Module({
  imports: [TypeOrmModule.forFeature([GroupEntity]), InstitutionsModule],
  controllers: [GroupsController],
  providers: [GroupsService],
})
export class GroupsModule {}
