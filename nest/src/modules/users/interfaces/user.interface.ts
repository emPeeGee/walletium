import { Role } from 'src/modules/roles/role.entity';

export interface IUser {
  email: string;
  password: string;
  username: string;
  phoneNumber: string;
  role: Role;
}
