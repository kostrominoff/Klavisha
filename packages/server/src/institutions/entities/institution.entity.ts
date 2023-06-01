import { Institution } from '@klavisha/types';
import { UserEntity } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
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
  @Column({ nullable: true })
  city?: string;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => UserEntity, (user) => user.institutions)
  owner: UserEntity;
}
