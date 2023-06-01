import { Roles, User } from '@klavisha/types';
import { InstitutionEntity } from 'src/institutions/entities/institution.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
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
  @Column({ default: [Roles.STUDENT], type: 'enum', enum: Roles, array: true })
  roles: Roles[];
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

  @OneToMany(() => InstitutionEntity, (institution) => institution.owner, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  institutions: InstitutionEntity[];
}
