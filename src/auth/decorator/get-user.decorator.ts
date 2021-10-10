import { User } from './../user.entity';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetUser = createParamDecorator(
  (data, context: ExecutionContext): User => {
    return context.switchToHttp().getRequest().user;
  },
);
