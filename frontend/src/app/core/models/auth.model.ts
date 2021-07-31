import { Token } from './token.model';
import { User } from './user.model';

export interface Auth {
  user: User;
  token: Token;
}
