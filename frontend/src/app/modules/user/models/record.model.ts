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
  payee: string;
  note: string;
  place: string;
  account: {
    name: string;
    currency: string;
    color: string;
  };
  category: {
    name: string;
    image: string;
  };
  labels: [];
}
