import { OpenType } from 'src/app/core/enums/open-type.enum';

export enum RecordType {
  EXPENSE = 'EXPENSE',
  INCOME = 'INCOME',
  TRANSFER = 'TRANSFER'
}

export interface Record {
  id: string;
  type: RecordType;
  amount: number;
  userChosenDate: string;
  createdDate: string;
  updatedDate: string;
  payee?: string;
  note?: string;
  place?: string;
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
  labels?: [];
}

export interface RecordPost {
  type: string;
  amount: number;
  userChosenDate: string;
  accountId: string;
  categoryId: string;
  payee?: string;
  note?: string;
  place?: string;
  labels?: string[];
}

export interface RecordDialog {
  type: OpenType;
  record: Record | null;
}
