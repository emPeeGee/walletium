import { User } from 'src/app/shared/models/user.model';

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
