import { Role } from './role.model';

export interface User {
  id: string;
  username: string;
  email: string;
  phoneNumber: string;
  createdDate: string;
  updatedDate: string;
  role: Role;
}
