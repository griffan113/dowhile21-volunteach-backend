import { Inject, Injectable, NotFoundException } from '@nestjs/common';

import { VolunteerWork, User } from '.prisma/client';
import { IVolunteerWorkRepository } from '../repositories/IVolunteerWorkRepository';
import { ISchoolRepository } from '../../schools/repositories/ISchoolRepository';

interface IRequest {
  id: string;
  user_id: string;
}

@Injectable()
export default class SubscribeAtSchoolVolunteerWorkService {
  constructor(
    @Inject('SchoolRepository')
    private schoolRepository: ISchoolRepository,

    @Inject('VolunteerWorkRepository')
    private volunteerWorkRepository: IVolunteerWorkRepository
  ) {}

  public async execute(
    currentUser: User,
    { id, user_id }: IRequest
  ): Promise<VolunteerWork> {
    if (user_id !== currentUser.id)
      throw new NotFoundException('User not found');

    const findVolunteerWork = await this.volunteerWorkRepository.findById(id);

    if (!findVolunteerWork)
      throw new NotFoundException('Volunteer Work not found');

    const createVolunteerWork = await this.volunteerWorkRepository.subscribe(
      id,
      {
        user_id,
      }
    );

    return createVolunteerWork;
  }
}
