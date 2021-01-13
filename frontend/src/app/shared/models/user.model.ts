import { Role } from './role.model';

export interface User {
  id: string;
  username: string;
  email: string;
  phoneNumber: string;
  created: Date;
  updated: Date;
  role: Role;
}
