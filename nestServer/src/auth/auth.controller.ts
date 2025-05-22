import {
  Body,
  Controller,
  Get,
  HttpException,
  Post,
  Req,
  Response,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUser } from 'src/users/dto/createUser.dto';
import { LoginUser } from './dto/loginUser.dto';
import { Request, Response as Res } from 'express';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard('google'))
  @Get('google')
  async googleLogin(@Req() req: Request) {}

  @UseGuards(AuthGuard('google'))
  @Get('google/callback')
  async googleLoginCallback(@Req() req: Request, @Response() res: Res) {
    const id = req.user && 'id' in req.user ? (req.user.id as number) : null;
    if (!id) throw new HttpException('User was not found', 404);
    const token = await this.authService.issueGoogleToken(id);

    return res
      .cookie('token', token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 60 * 24 * 10,
      })
      .redirect(`${process.env.FRONT_END_ORIGIN}/`);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  getProfile(@Req() req: Request) {
    return req.user;
  }

  @Post('signup')
  async signup(@Body() user: CreateUser) {
    return await this.authService.signup(user);
  }

  @Post('login')
  async login(@Response() res: Res, @Body() user: LoginUser) {
    const token = await this.authService.login(user);

    return res
      .cookie('token', token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 60 * 24 * 10,
      })
      .json({ message: ' You are loggened in' });
  }
}
