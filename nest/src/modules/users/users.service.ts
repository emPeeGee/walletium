import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EncryptionService } from 'src/common/encryption.service';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private repository: Repository<User>,
    private encryptionService: EncryptionService,
  ) {}

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.repository.findOne({ email });

    return user;
  }

  async create(createUser: CreateUserDto): Promise<User | any> {
    const user = await this.repository.find({ email: createUser.email });
    if (user) {
      return {
        message: 'Such user already exists!',
      };
    }

    createUser.password = await this.encryptionService.hash(
      createUser.password,
    );

    const createdUser: User = await this.repository.save(createUser);
    return {
      message: 'User was registered with success',
      data: createdUser,
    };
  }
}
