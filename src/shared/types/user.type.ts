import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field(type => String)
  id: string;

  @Field(type => String, { nullable: false })
  email: string;

  @Field(type => String, { nullable: false })
  name: string;

  @Field(type => String, { nullable: false })
  password: string;
}
