import { Inject, Injectable, NotFoundException } from '@nestjs/common';

import { School, User } from '.prisma/client';
import { ISchoolRepository } from '../repositories/ISchoolRepository';
import { CreateSchoolDTO } from '../dtos/CreateSchoolDTO';
import { IUserRepository } from '@modules/users/repositories/IUserRepository';

@Injectable()
export default class CreateSchoolService {
  constructor(
    @Inject('SchoolRepository')
    private schoolRepository: ISchoolRepository,

    @Inject('UserRepository')
    private userRepository: IUserRepository
  ) {}

  public async execute(
    currentUser: User,
    { name, user_id }: CreateSchoolDTO
  ): Promise<School> {
    const verifyUserExists = await this.userRepository.findById(user_id);

    if (!verifyUserExists) throw new NotFoundException('User not found');

    if (user_id !== currentUser.id)
      throw new NotFoundException('User not found');

    const createSchool = await this.schoolRepository.create({
      name,
      user_id,
    });

    return createSchool;
  }
}
