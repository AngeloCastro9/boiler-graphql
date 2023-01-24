import { Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class CurrentUser {
  getCurrentUser(
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      const ctx = GqlExecutionContext.create(args[2]).getContext();
      const user = ctx.req.user;
      return originalMethod.apply(this, [user, ...args]);
    };
  }
}
