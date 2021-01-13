import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
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
}
