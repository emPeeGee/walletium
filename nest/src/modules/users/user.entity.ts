import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Account } from '../accounts/account.entity';
import { Label } from '../labels/labels.entity';
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

  @CreateDateColumn()
  createdDate: Date;

  @CreateDateColumn()
  updatedDate: Date;

  @OneToOne(() => Role, { eager: true })
  @JoinColumn()
  role: Role;

  @OneToMany(() => Account, (account: Account) => account.user)
  accounts: Account[];

  @OneToMany(() => Label, (label: Label) => label.user)
  labels: Label[];
}
