import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from '../modules/users/user.module';
import { PrismaReaderModule } from 'src/connections/prisma/reader/prisma-reader.module';
import { PrismaWriterModule } from 'src/connections/prisma/writer/prisma-writer.module';
import { AuthModule } from '../modules/auth/auth.module';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), './schema.gql'),
      context: ({ req }) => ({ req }),
    }),
    ThrottlerModule.forRoot({
      ttl: Number(process.env.TTL) || 60,
      limit: Number(process.env.LIMIT) || 10,
    }),
    UserModule,
    AuthModule,
    PrismaReaderModule,
    PrismaWriterModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
