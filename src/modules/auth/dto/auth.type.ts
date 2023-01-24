import { Field, ObjectType } from '@nestjs/graphql';
import { User } from 'src/shared/types/user.type';

@ObjectType()
export class AuthType {
  @Field()
  user: User;
  token: string;
}
