import { Injectable, BadRequestException } from '@nestjs/common';

import { PrismaWriterService } from 'src/connections/prisma/writer/prisma-writer.service';
import { HashPasswordTransform } from 'src/shared/transformers/crypto-transform';
import { User } from 'src/shared/types/user.type';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaWriterService,
    private hash: HashPasswordTransform,
  ) {}

  async createUser(data: CreateUserInput): Promise<string> {
    try {
      const exists = await this.prisma.user.findUnique({
        where: {
          email: data.email,
        },
      });

      if (exists) throw new BadRequestException('User already exists');

      await this.prisma.user.create({
        data: {
          name: data.name,
          email: data.email,
          password: this.hash.to(data.password),
        },
      });

      return 'User created';
    } catch (error) {
      return error;
    }
  }

  async getUser(email: string): Promise<User> {
    try {
      return this.prisma.user.findUniqueOrThrow({
        where: {
          email,
        },
      });
    } catch (error) {
      return error;
    }
  }

  async updateUser(data: UpdateUserInput): Promise<User> {
    try {
      await this.getUser(data.email);
      return this.prisma.user.update({
        where: {
          id: data.email,
        },
        data: {
          name: data.name,
          email: data.email,
          password: data.password,
        },
      });
    } catch (error) {
      return error;
    }
  }

  async deleteUser(email: string): Promise<User> {
    try {
      await this.getUser(email);
      return this.prisma.user.delete({
        where: {
          email,
        },
      });
    } catch (error) {
      return error;
    }
  }
}
