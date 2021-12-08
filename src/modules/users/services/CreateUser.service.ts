import { User } from '.prisma/client';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';

import { CreateUserDTO } from '../dtos/CreateUserDTO';
import { IUserRepository } from '../repositories/IUserRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

@Injectable()
export default class CreateUserService {
  constructor(
    @Inject('UserRepository')
    private userRepository: IUserRepository,

    @Inject('HashProvider')
    private readonly hashProvider: IHashProvider
  ) {}

  public async execute(createUserDto: CreateUserDTO): Promise<User> {
    const { email, name, password, telephone, type } = createUserDto;

    const verifyEmailAvailability = await this.userRepository.findByEmail(
      email
    );

    const hashedPassword = await this.hashProvider.generateHash(password);

    if (verifyEmailAvailability)
      throw new BadRequestException('This email is already used');

    const createUser = await this.userRepository.create({
      email,
      name,
      password: hashedPassword,
      telephone,
      type,
    });

    delete createUser.password;

    return createUser;
  }
}
