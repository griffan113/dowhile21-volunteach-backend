import {
  BadRequestException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '.prisma/client';

import { IUserRepository } from '../repositories/IUserRepository';
import { CreateSessionDTO } from '../dtos/CreateSessionDTO';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import { ITokenPayload } from '../types/ITokenPayload';
import auth from '@config/auth';

export interface ICreateSessionResponse {
  user: User;
  token: string;
}

@Injectable()
export default class AuthenticateUserService {
  constructor(
    @Inject('UserRepository')
    private userRepository: IUserRepository,

    @Inject('HashProvider')
    private hashProvider: FakeHashProvider,

    private jwtService: JwtService
  ) {}

  public async execute({
    email,
    password,
  }: CreateSessionDTO): Promise<ICreateSessionResponse> {
    const findUser = await this.userRepository.findByEmail(email);

    if (!findUser)
      throw new BadRequestException('Incorrect email/password combination.');

    const validatePassword = await this.hashProvider.compareHash(
      password,
      findUser.password
    );

    if (!validatePassword)
      throw new UnauthorizedException('Incorrect email/password combination.');

    const payload: ITokenPayload = { sub: findUser.id };

    const token = this.jwtService.sign(payload, {
      secret: process.env.SECRET,
      expiresIn: auth.jwt.expiresIn,
    });

    return { user: findUser, token };
  }
}
