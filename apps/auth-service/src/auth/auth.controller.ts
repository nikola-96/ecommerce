import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  signIn(@Body() signUpDto: SignUpDto) {
    return this.authService.signIn(signUpDto);
  }

  @Post('/login')
  signUp(@Body() signInDto: SignInDto) {
    return this.authService.signUp(signInDto);
  }
}
