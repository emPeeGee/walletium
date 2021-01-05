import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IRole } from './interfaces/role.interface';
import { Role } from './role.entity';
import { roles } from './roles.data';

@Injectable()
export class RolesService {
  constructor(@InjectRepository(Role) private repository: Repository<Role>) {}

  async findByName(name: string): Promise<Role> {
    return await this.repository.findOne({ name });
  }

  async getUserRole(): Promise<Role> {
    return await this.repository.findOne({ name: 'USER' });
  }

  seed(): Array<Promise<Role>> {
    return roles.map(async (role: IRole) => {
      return await this.repository
        .findOne({ name: role.name })
        .then(async (dbRole) => {
          if (dbRole) {
            return Promise.resolve(null);
          }

          return Promise.resolve(await this.repository.save(role));
        })
        .catch((error) => Promise.reject(error));
    });
  }
}
