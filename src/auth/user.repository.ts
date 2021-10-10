import {
  ConflictException,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { EntityRepository, Repository } from 'typeorm';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import { User } from './user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async signUp(authCredentialDto: AuthCredentialDto): Promise<void> {
    const user = this.create({
      ...authCredentialDto,
      password: await bcrypt.hash(
        authCredentialDto.password,
        await bcrypt.genSalt(),
      ),
    });
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

  async getUsers(): Promise<User[]> {
    return this.find();
  }

  async signIn(authCredentialDto: AuthCredentialDto): Promise<string> {
    const { name, password } = authCredentialDto;
    const user = await this.findOne({ name });
    if (user && (await bcrypt.compare(password, user.password))) {
      return '로그인에 성공하였습니다.';
    } else {
      throw new UnauthorizedException(
        '로그인에 실패하였습니다. 이름이나 비밀번호를 확인해주세요',
      );
    }
  }
}
