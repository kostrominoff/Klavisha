import { Institution } from '@klavisha/types';
import { UserEntity } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class InstitutionEntity implements Institution {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column({ nullable: true })
  phone?: string;
  @Column({ nullable: true })
  photo?: string;
  @Column({ nullable: true })
  description?: string;
  @Column({ nullable: true })
  website?: string;
  @Column()
  city: string;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToMany(() => UserEntity, (user) => user.institutions)
  owners: UserEntity[];
}
