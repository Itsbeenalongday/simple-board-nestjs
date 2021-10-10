import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import { User } from './user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
    protected jwtService: JwtService,
  ) {}

  getUsers(): Promise<User[]> {
    return this.userRepository.getUsers();
  }

  signUp(authCredentialDto: AuthCredentialDto): Promise<void> {
    return this.userRepository.signUp(authCredentialDto);
  }

  async signIn(
    authCredentialDto: AuthCredentialDto,
  ): Promise<{ accessToken: string } | string> {
    const { name } = authCredentialDto;
    if ((await this.userRepository.signIn(authCredentialDto)) === '200') {
      // payload + secret key를 이용하여 유저 토큰 생성
      return { accessToken: this.jwtService.sign({ name }) };
    }
  }
}
