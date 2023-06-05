import { InstitutionEntity } from 'src/institutions/entities/institution.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import { Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class TeacherEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => UserEntity, (user) => user.teacher)
  user: UserEntity;

  @ManyToOne(() => InstitutionEntity, (institution) => institution.teachers)
  institution: InstitutionEntity;
}
