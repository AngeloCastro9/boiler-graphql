import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { UserService } from './user.service';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/jwt-auth.guard';
import { User } from '../../shared/types/user.type';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(returns => String)
  async createUser(@Args('data') data: CreateUserInput): Promise<string> {
    return this.userService.createUser(data);
  }

  // @UseGuards(GqlAuthGuard)
  @Query(() => User)
  async user(@Args('email') email: string): Promise<User> {
    return this.userService.getUser(email);
  }

  @Mutation(() => User)
  async updateUser(
    @Args('email') email: string,
    @Args('data') data: UpdateUserInput,
  ): Promise<User> {
    return this.userService.updateUser({ email, ...data });
  }

  @Mutation(() => User)
  async deleteUser(@Args('email') email: string): Promise<true> {
    await this.userService.deleteUser(email);
    return true;
  }
}
