import { User } from '.prisma/client';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';

import { IUserRepository } from '../repositories/IUserRepository';

interface IRequest {
  id: string;
}

@Injectable()
export default class ShowUserService {
  constructor(
    @Inject('UserRepository')
    private userRepository: IUserRepository
  ) {}

  public async execute({ id }: IRequest): Promise<User> {
    const findUser = await this.userRepository.findById(id);

    if (!findUser) throw new NotFoundException('User not found');

    delete findUser.password;

    return findUser;
  }
}
