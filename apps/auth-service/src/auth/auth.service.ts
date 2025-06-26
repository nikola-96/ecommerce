import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { AuthHelper } from './auth.helper';
import { AuthedResponse } from './dto/authed.response';

@Injectable()
export class AuthService {
  @Inject(AuthHelper)
  private readonly helper: AuthHelper;

  constructor(private readonly usersService: UsersService) {}

  async signIn(signUpDto: SignUpDto): Promise<AuthedResponse> {
    const user = await this.usersService.findOneByEmail(signUpDto.email);
    if (user) {
      throw new HttpException('Conflict', HttpStatus.CONFLICT);
    }
    
    const hashedPassword = await this.helper.encodePassword(signUpDto.password);

    const registerUser = await this.usersService.create({
      ...signUpDto,
      password: hashedPassword,
    });

    if (!registerUser) {
      throw new HttpException('Something went wrong', HttpStatus.FORBIDDEN);
    }

    const accessToken = this.helper.generateToken(registerUser);

    return {
      accessToken,
      firstName: registerUser.firstName,
      lastName: registerUser.lastName,
      email: registerUser.email,
    };
  }

  async signUp(signInDto: SignInDto): Promise<AuthedResponse> {
    const user = await this.usersService.findOneByEmail(signInDto.email);

    if (!user) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }

    const passwordValid = await this.helper.isPasswordValid(
      signInDto.password,
      user.password
    );

    if (!passwordValid) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }

    const accessToken = this.helper.generateToken(user);

    return {
      accessToken,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    };
  }
}
