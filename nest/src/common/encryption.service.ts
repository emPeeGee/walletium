import { Injectable } from '@nestjs/common';
import { hash, compare } from 'bcrypt';

@Injectable()
export class EncryptionService {
  async hash(plain: string): Promise<string> {
    return await hash(plain, 10);
  }

  async compare(plain: string, encrypted: string): Promise<boolean> {
    return await compare(plain, encrypted);
  }
}
