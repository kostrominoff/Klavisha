import { Student } from '@klavisha/types';
import { GroupEntity } from 'src/groups/entities/group.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToOne,
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

  @ManyToOne(() => GroupEntity, (group) => group.students, {
    cascade: true,
  })
  @JoinTable()
  group: GroupEntity;

  @OneToOne(() => UserEntity, (user) => user.student)
  user: UserEntity;
}
