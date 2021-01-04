import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
