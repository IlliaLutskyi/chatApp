import * as bcrypt from 'bcrypt';
import { HttpException, Injectable } from '@nestjs/common';
import { CreateUser } from 'src/users/dto/createUser.dto';
import { UsersService } from 'src/users/users.service';
import { LoginUser } from './dto/loginUser.dto';
import { JwtService } from '@nestjs/jwt';
import { Prisma } from 'generated/prisma';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}
  async issueGoogleToken(userId: number) {
    const token = await this.jwtService.sign(
      { id: userId },
      { secret: process.env.JWT_SECRET, expiresIn: '24h' },
    );
    return token;
  }
  async signup(user: CreateUser) {
    if (!user.name || !user.email || !user.password || !user.phoneNumber)
      throw new HttpException('All fields are required', 400);
    const existingUser = await this.usersService.findByEmail(user.email);
    if (existingUser) throw new HttpException('User already exists', 400);
    user.password = await bcrypt.hash(user.password, 12);
    await this.usersService.createUser(user);
    return { message: 'You were successfully signed up' };
  }

  async login(creadentials: LoginUser) {
    const user = await this.usersService.findByEmail(creadentials.email);
    if (!user) throw new HttpException('User not found', 404);
    if (!user.password)
      throw new HttpException('You are signed up to different provider', 400);
    const match = await bcrypt.compare(creadentials.password, user.password);
    if (!match) throw new HttpException('Wrong password', 400);
    const token = this.jwtService.sign(
      { id: user.id },
      { secret: process.env.JWT_SECRET, expiresIn: '24h' },
    );
    return token;
  }
}
