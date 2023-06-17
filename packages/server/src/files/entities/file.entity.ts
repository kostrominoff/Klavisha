import { UserEntity } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class FileEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  filename: string;
  @Column()
  originalName: string;
  @Column()
  mimetype: string;

  @ManyToOne(() => UserEntity, (user) => user.files)
  user: UserEntity;
}
