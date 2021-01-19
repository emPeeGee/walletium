import { User } from 'src/modules/users/user.entity';

export interface SaveLabel {
  name: string;
  color: string;
  user: User;
}
