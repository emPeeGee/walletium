import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Role } from '../roles/role.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    length: 30,
    unique: true,
  })
  username: string;

  @Column({
    length: 200,
  })
  password: string;

  @Column({
    length: 30,
    unique: true,
  })
  email: string;

  @Column()
  phoneNumber: string;

  @OneToOne((type) => Role, (role) => role.name, { eager: true })
  @JoinColumn()
  role: Role;
}
