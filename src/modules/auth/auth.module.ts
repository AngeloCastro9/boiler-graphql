import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { UserService } from 'src/modules/users/user.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { PrismaWriterModule } from 'src/connections/prisma/writer/prisma-writer.module';
import { HashPasswordTransform } from 'src/shared/transformers/crypto-transform';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.AUTH_SECRET,
        signOptions: {
          expiresIn: '30s',
        },
      }),
    }),
    PrismaWriterModule,
  ],
  providers: [
    AuthService,
    AuthResolver,
    UserService,
    JwtStrategy,
    HashPasswordTransform,
  ],
  exports: [AuthService, AuthResolver],
})
export class AuthModule {}
