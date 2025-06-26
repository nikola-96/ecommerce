import {
  Injectable,
  HttpException,
  HttpStatus,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TokenTypeI } from './interfaces/token.interface';

import bcrypt from 'bcryptjs';
import { User } from '../users/entities/user.entity';

const SALT_ROUNDS = 10;

@Injectable()
export class AuthHelper {
  private readonly jwt: JwtService;

  constructor(jwt: JwtService) {
    this.jwt = jwt;
  }

  // Decoding the JWT Token
  public async decode(token: string): Promise<unknown> {
    return this.jwt.decode(token, null);
  }

  // Get User by User ID we get from decode()
  //   public async validateUser(decoded: any): Promise<User> {
  //     return this.userModel.get(decoded.id);
  //   }

  // Generate JWT Token
  public generateToken(user: User): string {
    return this.jwt.sign({ id: user.id, email: user.email });
  }

  // Validate User's password
  public async isPasswordValid(
    password: string,
    userPassword: string
  ): Promise<boolean> {
    const passwordValid = await bcrypt.compare(password, userPassword);
    return passwordValid;
  }

  // Encode User's password
  public async encodePassword(password: string): Promise<string> {
    const hashedPassword: string = await bcrypt.hash(password, SALT_ROUNDS);
    return hashedPassword;
  }

  //   // Validate JWT Token, throw forbidden error if JWT Token is invalid
  //   public async validate(token: string): Promise<boolean | never> {
  //     const decoded = this.jwt.verify<TokenTypeI>(token);

  //     if (!decoded) {
  //       throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
  //     }

  //     const user: User = await this.validateUser(decoded);

  //     if (!user) {
  //       throw new UnauthorizedException();
  //     }

  //     return true;
  //   }
}
