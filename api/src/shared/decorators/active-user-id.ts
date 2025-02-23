import { createParamDecorator, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';

export const ActiveUserId = createParamDecorator<undefined>((_, context) => {
  const request = context.switchToHttp().getRequest<Request>();
  const userId = request.user.sub;

  if (!userId) {
    throw new UnauthorizedException();
  }

  return userId;
});
