import { IRole } from './interfaces/role.interface';

export const roles: IRole[] = [
  { name: 'USER' },
  { name: 'ADMIN' },
  { name: 'MODERATOR' },
];

export enum Role {
  User = 'USER',
  ADMIN = 'ADMIN',
  Moderator = 'MODERATOR',
}
