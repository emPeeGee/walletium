import { User } from 'src/app/shared/models/user.model';

export interface Account {
  id: string;
  name: string;
  color: string;
  amount: number;
  currency: string;
  userId: string;
}

export interface AccountWithUser {
  id: string;
  name: string;
  color: string;
  amount: number;
  currency: string;
  user: User;
}

export interface AccountsResult {
  accounts: Account[];
}
