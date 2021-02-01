import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Account } from '../accounts/account.entity';
import { Category } from '../categories/category.entity';
import { Label } from '../labels/labels.entity';

export enum RecordType {
  EXPENSE = 'EXPENSE',
  INCOME = 'INCOME',
  TRANSFER = 'TRANSFER',
}

@Entity()
export class Record {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: RecordType,
  })
  type: RecordType;

  @Column()
  amount: number;

  @Column()
  userChosenDate: Date;

  @CreateDateColumn()
  createdDate: Date;

  @CreateDateColumn()
  updatedDate: Date;

  @Column({
    nullable: true,
  })
  payee: string;

  @Column({
    nullable: true,
  })
  note: string;

  @Column({
    nullable: true,
  })
  place: string;

  @ManyToOne(() => Account, (account: Account) => account.records, {
    eager: true,
  })
  account: Account;

  @ManyToOne(() => Category, {
    eager: true,
  })
  @JoinColumn({
    name: 'category_id',
  })
  category: Category;

  @ManyToMany(() => Label, {
    eager: true,
  })
  @JoinTable()
  labels: Label[];
}
