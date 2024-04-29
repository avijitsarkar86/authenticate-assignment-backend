import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export interface ICurrentUser {
  userId: number;
  numberId: number;
}

export const CurrentUser = createParamDecorator(
  (data: never, context: ExecutionContext): ICurrentUser => {
    const request = context.switchToHttp().getRequest();
    console.log('request.user: ', request.user);
    return {
      userId: request.user.id,
      numberId: request.user.number.id
    };
  },
);
