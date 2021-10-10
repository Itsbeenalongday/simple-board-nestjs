import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { GetUser } from './decorator/get-user.decorator';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get()
  index(): Promise<User[]> {
    return this.authService.getUsers();
  }

  @Post('/sign_up')
  signUp(
    @Body(ValidationPipe) authCredentialDto: AuthCredentialDto,
  ): Promise<void> {
    return this.authService.signUp(authCredentialDto);
  }

  @Post('/sign_in')
  signIn(
    @Body(ValidationPipe) AuthCredentialDto: AuthCredentialDto,
  ): Promise<{ accessToken: string } | string> {
    return this.authService.signIn(AuthCredentialDto);
  }

  @Get('/user_info')
  @UseGuards(AuthGuard())
  userInfo(@GetUser() user: User): User {
    return user;
  }
}
