import {
  Body,
  Controller,
  HttpException,
  Patch,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';
import { UpdateUser } from './dto/updateUser.dto';
import { Request } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import CloudinaryService from 'src/lib/cloudinary/cloudinary.service';

@Controller('users')
export class UsersController {
  constructor(
    private usersService: UsersService,
    private cloudinaryService: CloudinaryService,
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @Patch('/updateProfile')
  @UseInterceptors(FileInterceptor('file', { dest: './uploads' }))
  async updateProfile(
    @Req() req: Request,
    @UploadedFile() file: Express.Multer.File,
    @Body() edits: UpdateUser,
  ) {
    const userId =
      req.user && 'id' in req.user ? (req.user.id as number) : null;
    let imageUrl = '';
    if (!userId) throw new HttpException('User was not found', 404);
    if (file) {
      const { url } = await this.cloudinaryService.upload(file, {
        folder: 'profileImages',
        public_id: userId.toString(),
      });
      imageUrl = url;
    }

    await this.usersService.updateUser(userId, {
      ...edits,
      image: imageUrl ? imageUrl : null,
    });
    return { message: 'Profile updated successfully' };
  }
}
