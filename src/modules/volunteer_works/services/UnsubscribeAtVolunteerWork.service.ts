import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { VolunteerWork } from '.prisma/client';

import { IVolunteerWorkRepository } from '../repositories/IVolunteerWorkRepository';
import { CompleteUser } from '@modules/users/types/CompleteUser';

interface IRequest {
  id: string;
  user_id: string;
}

@Injectable()
export default class UnsubscribeAtSchoolVolunteerWorkService {
  constructor(
    @Inject('VolunteerWorkRepository')
    private volunteerWorkRepository: IVolunteerWorkRepository
  ) {}

  public async execute(
    currentUser: CompleteUser,
    { id, user_id }: IRequest
  ): Promise<VolunteerWork> {
    if (user_id !== currentUser.id)
      throw new NotFoundException('User not found');

    const findVolunteerWork = await this.volunteerWorkRepository.findById(id);

    if (!findVolunteerWork)
      throw new NotFoundException('Volunteer Work not found');

    const isUserSubscribedInVolunteerWork =
      currentUser.subscribed_volunteer_works.some(
        (volunteerWork) => volunteerWork.id === id
      );

    if (!isUserSubscribedInVolunteerWork)
      throw new BadRequestException(
        "You're not subscribed in this volunteer work"
      );

    const createVolunteerWork = await this.volunteerWorkRepository.unsubscribe(
      id,
      {
        user_id,
      }
    );

    return createVolunteerWork;
  }
}
