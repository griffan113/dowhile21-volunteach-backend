import { UserType } from '.prisma/client';
import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class EnsureCommonUserGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    // Add your custom authentication logic here
    // for example, call super.logIn(request) to establish a session.
    return super.canActivate(context);
  }

  handleRequest(err, user) {
    // You can throw an exception based on either "info" or "err" arguments
    console.log(user);

    if (err || !user) {
      throw err || new UnauthorizedException();
    }

    if (user.type !== UserType.COMMON) {
      throw new UnauthorizedException('You must be a common user');
    }
    return user;
  }
}
