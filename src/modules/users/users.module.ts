import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import auth from '@config/auth';
import { EnsureTeacherGuard } from './infra/http/guards/EnsureTeacher.guard';
import { PrismaService } from '@shared/infra/prisma/Prisma.service';
import UserRepository from './infra/prisma/repositories/UserRepository';
import JwtStrategyProvider from './providers/JwtProvider/implementations/JwtStrategyProvider';
import BCryptHashProvider from './providers/HashProvider/implementations/BCryptHashProvider';
import SessionsController from './infra/http/controllers/Sessions.controller';
import UsersController from './infra/http/controllers/Users.controller';
import IndexUsersService from './services/IndexUsers.service';
import CreateUserService from './services/CreateUser.service';
import UpdateUserService from './services/UpdateUser.service';
import AuthenticateUserService from './services/AuthenticateUser.service';
import DeleteUserService from './services/DeleteUser.service';
import ShowUserService from './services/ShowUser.service';

@Module({
  imports: [
    PassportModule.register({ session: true, defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.SECRET,
      signOptions: {
        expiresIn: auth.jwt.expiresIn,
      },
    }),
  ],
  providers: [
    PrismaService,
    JwtStrategyProvider,
    EnsureTeacherGuard,
    { provide: 'UserRepository', useClass: UserRepository },
    { provide: 'IndexUsersService', useClass: IndexUsersService },
    { provide: 'CreateUserService', useClass: CreateUserService },
    { provide: 'UpdateUserService', useClass: UpdateUserService },
    { provide: 'AuthenticateUserService', useClass: AuthenticateUserService },
    { provide: 'DeleteUserService', useClass: DeleteUserService },
    { provide: 'ShowUserService', useClass: ShowUserService },
    { provide: 'HashProvider', useClass: BCryptHashProvider },
  ],
  controllers: [UsersController, SessionsController],
  exports: [PassportModule, JwtStrategyProvider],
})
export class UsersModule {}
