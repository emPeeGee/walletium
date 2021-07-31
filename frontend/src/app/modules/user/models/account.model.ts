import { OpenType } from 'src/app/core/enums/open-type.enum';
import { User } from 'src/app/core/models/user.model';

export interface Account {
  id: string;
  name: string;
  color: string;
  amount: number;
  currency: string;
  createdDate: string;
  updatedDate: string;
  userId: string;
}

export interface AccountWithUser {
  id: string;
  name: string;
  color: string;
  amount: number;
  currency: string;
  createdDate: string;
  updatedDate: string;
  user: User;
}

export interface AccountDialog {
  type: OpenType;
  account: Account | null;
}
