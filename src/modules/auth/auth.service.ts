import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compareSync } from 'bcryptjs';
import { UserService } from 'src/modules/users/user.service';
import { User } from 'src/shared/types/user.type';
import { AuthInput } from './dto/auth.input';
import { AuthType } from './dto/auth.type';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(data: AuthInput): Promise<AuthType> {
    const user = await this.userService.getUser(data.email);

    if (!compareSync(data.password, user.password))
      throw new UnauthorizedException('Incorrect password');

    return { user, token: await this.jwtToken(user) };
  }

  private async jwtToken(user: User): Promise<string> {
    return this.jwtService.signAsync({ username: user.name, sub: user.id });
  }
}
