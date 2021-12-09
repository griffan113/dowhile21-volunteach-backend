import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { School, User } from '.prisma/client';

import { IUserRepository } from '@modules/users/repositories/IUserRepository';
import { ISchoolRepository } from '../repositories/ISchoolRepository';

interface IRequest {
  id: string;
  name?: string;
  user_id?: string;
}

@Injectable()
export default class UpdateSchoolService {
  constructor(
    @Inject('UserRepository')
    private userRepository: IUserRepository,

    @Inject('SchoolRepository')
    private schoolRepository: ISchoolRepository
  ) {}

  public async execute(
    currentUser: User,
    { id, name, user_id }: IRequest
  ): Promise<School> {
    if (currentUser.id !== id) throw new NotFoundException('User not found');

    const findUser = await this.userRepository.findById(user_id);

    if (!findUser) throw new NotFoundException('User not found');

    const findSchool = await this.schoolRepository.findById(id);

    if (!findSchool) throw new NotFoundException('School not found');

    if (name) findSchool.name = name;
    if (user_id) findSchool.user_id = user_id;

    const updateSchool = await this.schoolRepository.update(findSchool);

    return updateSchool;
  }
}
