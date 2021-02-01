import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Record } from '../records/record.entity';
import { User } from '../users/user.entity';

export type CurrencyType = 'MDL' | 'EUR' | 'USD' | 'RUB' | 'RON';

@Entity()
export class Account {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  color: string;

  @Column()
  amount: number;

  @Column({
    type: 'enum',
    enum: ['MDL', 'EUR', 'USD', 'RUB', 'RON'],
  })
  currency: CurrencyType;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @ManyToOne(() => User, (user: User) => user.accounts, {
    eager: true,
  })
  user: User;

  @OneToMany(() => Record, (record: Record) => record.account)
  records: Record[];
}
