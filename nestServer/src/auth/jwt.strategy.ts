import {
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { Strategy } from 'passport-jwt';
import { UsersService } from 'src/users/users.service';
@Injectable()
class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UsersService) {
    super({
      jwtFromRequest: (req: Request) => req.cookies.token,
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET as string,
    });
  }
  async validate(payload: { id: number }) {
    const user = await this.userService.findById(payload.id);
    if (!user) {
      throw new HttpException('You need to sign up first', 401);
    }
    return user;
  }
}
export default JwtStrategy;
