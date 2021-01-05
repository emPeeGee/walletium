import { User } from 'src/modules/users/user.entity';
import { CurrencyType } from '../account.entity';

export interface IAccount {
  name: string;
  color: string;
  amount: number;
  currency: CurrencyType;
  user: User;
}
