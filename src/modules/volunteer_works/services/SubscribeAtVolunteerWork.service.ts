import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { VolunteerWork } from '.prisma/client';

import { IVolunteerWorkRepository } from '../repositories/IVolunteerWorkRepository';
import { CompleteUser } from '@modules/users/types/CompleteUser';
import { IUserRepository } from '@modules/users/repositories/IUserRepository';

interface IRequest {
  id: string;
  user_id: string;
}

@Injectable()
export default class SubscribeAtSchoolVolunteerWorkService {
  constructor(
    @Inject('VolunteerWorkRepository')
    private volunteerWorkRepository: IVolunteerWorkRepository,

    @Inject('UserRepository')
    private userRepository: IUserRepository
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

    const findUser = await this.userRepository.findById(currentUser.id);

    const isUserSubscribedInSubject = findUser.taught_subjects.some(
      (subject) => {
        return findVolunteerWork.match_subject.id === subject.id;
      }
    );

    if (!isUserSubscribedInSubject)
      throw new NotFoundException("You don't have the required subject");

    const isUserSubscribedInVolunteerWork =
      currentUser.subscribed_volunteer_works.some(
        (volunteerWork) => volunteerWork.id === id
      );

    if (isUserSubscribedInVolunteerWork)
      throw new BadRequestException(
        "You're already subscribed in this volunteer work"
      );

    const createVolunteerWork = await this.volunteerWorkRepository.subscribe(
      id,
      {
        user_id,
      }
    );

    return createVolunteerWork;
  }
}
