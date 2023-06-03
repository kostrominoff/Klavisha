import { Group } from '@klavisha/types';
import { InstitutionEntity } from 'src/institutions/entities/institution.entity';
import { StudentEntity } from 'src/students/entities/student.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class GroupEntity implements Group {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => InstitutionEntity, (institution) => institution.groups)
  institution: InstitutionEntity;

  @OneToMany(() => StudentEntity, (student) => student.group)
  students: StudentEntity[];
}
