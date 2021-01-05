import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EncryptionService } from 'src/common/encryption.service';
import { Repository } from 'typeorm';
import { RolesService } from '../roles/roles.service';
import { CreateUserDto } from './dto/create-user.dto';
import { IUser } from './interfaces/user.interface';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private repository: Repository<User>,
    private rolesService: RolesService,
    private encryptionService: EncryptionService,
  ) {}

  async findByEmail(email: string): Promise<User> {
    return await this.repository.findOne({ email });
  }

  async findById(id: string): Promise<User> {
    return await this.repository.findOne({ id });
  }

  async create(createUser: CreateUserDto): Promise<User | any> {
    console.log(createUser);

    const user = await this.repository.find({ email: createUser.email });
    if (!user) {
      return {
        message: 'Such user already exists!',
      };
    }

    createUser.password = await this.encryptionService.hash(
      createUser.password,
    );

    const roleName = createUser.role;

    const role = roleName
      ? await this.rolesService.findByName(roleName)
      : await this.rolesService.getUserRole();

    const userToSave: IUser = {
      ...createUser,
      role: role,
    };

    const createdUser = await this.repository.save(userToSave);
    return {
      message: 'User was registered with success',
      data: createdUser,
    };
  }
}
