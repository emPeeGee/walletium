import { Category } from 'src/modules/categories/category.entity';
import { Label } from 'src/modules/labels/labels.entity';
import { Account } from 'src/modules/accounts/account.entity';
import { RecordType } from '../record.entity';

export interface IRecord {
  type: RecordType;
  amount: number;
  userChosenDate: Date;
  account: Account;
  category: Category;
  createdDate?: Date;
  updatedDate?: Date;
  payee?: string;
  note?: string;
  place?: string;
  labels?: Label[];
}

export interface IRecordFrontend {
  type: RecordType;
  amount: number;
  userChosenDate: Date;
  account: {
    id: string;
    name: string;
    currency: string;
    color: string;
  };
  category: {
    id: string;
    name: string;
    image: string;
  };
  createdDate: Date;
  updatedDate: Date;
  payee?: string;
  note?: string;
  place?: string;
  labels?: Label[];
}
