import { Injectable, UnauthorizedException } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class Roles {
  validate(roles: string[]) {
    return (
      target: any,
      propertyKey: string,
      descriptor: PropertyDescriptor,
    ) => {
      const originalMethod = descriptor.value;
      descriptor.value = async function (...args: any[]) {
        const ctx = GqlExecutionContext.create(args[2]).getContext();
        const user = ctx.req.user;
        if (!user.roles.some((r) => roles.includes(r))) {
          throw new UnauthorizedException(
            'You do not have the necessary role to access this resource',
          );
        }
        return originalMethod.apply(this, args);
      };
    };
  }
}
