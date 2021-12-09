import { CompleteUser } from '@modules/users/types/CompleteUser';
import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Subject } from '@prisma/client';
import { ISubjectRepository } from '../repositories/ISubjectsRepository';

interface IRequest {
  id: string;
  user_id: string;
}

@Injectable()
export default class UnsubscribeAtSubjectService {
  constructor(
    @Inject('SubjectRepository')
    private subjectRepository: ISubjectRepository
  ) {}

  public async execute(
    currentUser: CompleteUser,
    { id, user_id }: IRequest
  ): Promise<Subject> {
    if (user_id !== currentUser.id)
      throw new NotFoundException('User not found');

    const findSubject = await this.subjectRepository.findById(id);

    if (!findSubject) throw new NotFoundException('Subject not found');

    const isUserSubscribedInSubject = currentUser.taught_subjects.some(
      (subject) => {
        return id === subject.id;
      }
    );

    if (!isUserSubscribedInSubject)
      throw new BadRequestException("You're not subscribed in this subject");

    const subscribeSubject = await this.subjectRepository.unsubscribe(
      id,
      user_id
    );

    return subscribeSubject;
  }
}
