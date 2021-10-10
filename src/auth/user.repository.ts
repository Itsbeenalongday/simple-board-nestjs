import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import { User } from './user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async postUser(authCredentialDto: AuthCredentialDto): Promise<void> {
    const user = this.create({ ...authCredentialDto });
    try {
      await this.save(user);
    } catch (error) {
      switch (error.code) {
        case '23505':
          throw new ConflictException('이미 존재하는 유저 이름입니다.');
        default:
          throw new InternalServerErrorException();
      }
    }
  }
}
