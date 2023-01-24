import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { PrismaWriterModule } from 'src/connections/prisma/writer/prisma-writer.module';
import { HashPasswordTransform } from 'src/shared/transformers/crypto-transform';

@Module({
  imports: [PrismaWriterModule],
  providers: [UserService, UserResolver, HashPasswordTransform],
  exports: [UserService, UserResolver],
})
export class UserModule {}
