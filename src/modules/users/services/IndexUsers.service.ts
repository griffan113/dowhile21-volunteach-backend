import { User } from '.prisma/client';
import { Inject, Injectable } from '@nestjs/common';

import { IUserRepository } from '../repositories/IUserRepository';

@Injectable()
export default class IndexUsersService {
  constructor(
    @Inject('UserRepository')
    private userRepository: IUserRepository
  ) {}

  public async execute(): Promise<User[]> {
    const users = await this.userRepository.findAllUsers();

    users.forEach((user) => delete user.password);

    return users;
  }
}
