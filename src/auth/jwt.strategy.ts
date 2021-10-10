import { UserRepository } from './user.repository';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from './user.entity';

@Injectable() // 다른 곳에서 활용하능하게 injectable
export class JwtStragtegy extends PassportStrategy(Strategy) {
  // passport-jwt에 Strategy가 있음, 기본 전략을 jwt로 설정
  constructor(
    @InjectRepository(UserRepository) // repository를 사용하기 위해서 injectRepository이용, 유저 정보 추출
    private userRepository: UserRepository,
  ) {
    super({
      secretOrKey: "sungmin's secret", // 토큰 유효성 체크할 때 사용, 모듈 등록할 때 했던것(토큰 생성할 때 사용)과 동일하게 맞춰야함
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // 토큰을 가져오는 위치를 설정, 토큰을 넣을때 bearertoken 타입으로 지정됨
    });
  }

  async validate(payload: Partial<User>) {
    const user: User = await this.userRepository.findOne({
      name: payload.name,
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
