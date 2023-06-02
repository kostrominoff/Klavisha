import { Student } from '@klavisha/types';
import { GroupEntity } from 'src/groups/entities/group.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class StudentEntity implements Student {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ nullable: true })
  subgroup?: string;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => GroupEntity, (group) => group.students)
  group: GroupEntity;

  @OneToOne(() => UserEntity, (user) => user.student)
  user: UserEntity;
}
