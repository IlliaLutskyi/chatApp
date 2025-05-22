import { Injectable } from '@nestjs/common';
import PrismaService from 'src/lib/database/prisma.service';
import { CreateUser } from './dto/createUser.dto';
import { UpdateUser } from './dto/updateUser.dto';
@Injectable()
export class UsersService {
  constructor(private PrismaService: PrismaService) {}
  async findById(id: number) {
    return await this.PrismaService.user.findUnique({
      where: { id },
    });
  }
  async findByEmail(email: string) {
    return await this.PrismaService.user.findUnique({
      where: { email },
    });
  }
  async createUser(user: CreateUser) {
    return await this.PrismaService.user.create({ data: user });
  }
  async updateUser(userId: number, edits: UpdateUser) {
    await this.PrismaService.user.update({
      where: { id: userId },
      data: edits,
    });
  }
}
