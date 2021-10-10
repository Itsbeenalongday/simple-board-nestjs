import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStragtegy } from './jwt.strategy';
import { UserRepository } from './user.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: "sungmin's secret", // 서버에 저장하는 jwt 인증 시 사용하는 secret key, 아무 텍스트나 상관없다.(Dot Env로 감춰야 한다)
      signOptions: { expiresIn: 60 * 60 }, // 초 단위, 여기서는 1시간
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStragtegy], // auth module 내에서 사용하기 위함
  exports: [JwtStragtegy, PassportModule], // 외부 module에서도 사용할 수 있게 하기 위함
})
export class AuthModule {}
