import { Roles, User } from '@klavisha/types';
import { InstitutionEntity } from 'src/institutions/entities/institution.entity';
import { StudentEntity } from 'src/students/entities/student.entity';
import { TeacherEntity } from 'src/teachers/entities/teacher.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class UserEntity implements User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  email: string;
  @Column()
  password: string;
  @Column({ default: Roles.USER, type: 'enum', enum: Roles })
  role: Roles;
  @Column()
  firstname: string;
  @Column()
  secondname: string;
  @Column({ nullable: true })
  fathername?: string;
  @Column({ nullable: true })
  avatar?: string;
  @Column({ nullable: true })
  birthday?: Date;
  @Column({ nullable: true })
  phone?: string;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToMany(() => InstitutionEntity, (institution) => institution.owners)
  @JoinTable()
  institutions: InstitutionEntity[];

  @OneToOne(() => StudentEntity, (student) => student.user, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn()
  student: StudentEntity;

  @OneToOne(() => TeacherEntity, (teacher) => teacher.user, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn()
  teacher: TeacherEntity;
}
