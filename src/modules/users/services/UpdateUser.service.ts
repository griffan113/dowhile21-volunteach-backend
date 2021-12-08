import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { User, UserType } from '.prisma/client';

import { IUserRepository } from '../repositories/IUserRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface IRequest {
  id: string;
  currentUser: User;
  name?: string;
  email?: string;
  password?: string;
  old_password?: string;
  telephone?: string;
  type?: UserType;
}

@Injectable()
export default class UpdateUserService {
  constructor(
    @Inject('UserRepository')
    private userRepository: IUserRepository,

    @Inject('HashProvider')
    private readonly hashProvider: IHashProvider
  ) {}

  public async execute({
    id,
    currentUser,
    email,
    name,
    password,
    old_password,
    telephone,
    type,
  }: IRequest): Promise<User> {
    const findUser = await this.userRepository.findById(id);

    if (!findUser) throw new NotFoundException('User not found');

    if (currentUser.id !== id) {
      throw new UnauthorizedException();
    }

    if (email) {
      const verifyEmailAvailability = await this.userRepository.findByEmail(
        email
      );

      if (verifyEmailAvailability && verifyEmailAvailability.id !== findUser.id)
        throw new BadRequestException('Email already used');

      findUser.email = email;
    }

    if (name) findUser.name = name;
    if (telephone) findUser.telephone = telephone;
    if (type) findUser.type = type;

    if (password && !old_password)
      throw new BadRequestException('Old password missing');

    if (password && old_password) {
      const checkOldPassword = await this.hashProvider.compareHash(
        old_password,
        findUser.password
      );

      if (!checkOldPassword)
        throw new BadRequestException('Old password does not match');

      findUser.password = await this.hashProvider.generateHash(password);
    }

    const updateUser = await this.userRepository.update(findUser);

    delete updateUser.password;

    return updateUser;
  }
}
