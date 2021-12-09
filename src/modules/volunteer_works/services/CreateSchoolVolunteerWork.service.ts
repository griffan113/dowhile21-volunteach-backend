import { Inject, Injectable, NotFoundException } from '@nestjs/common';

import { VolunteerWork, User } from '.prisma/client';
import { IVolunteerWorkRepository } from '../repositories/IVolunteerWorkRepository';
import { CreateVolunteerWorkDTO } from '../dtos/CreateVolunteerWorkDTO';
import { ISchoolRepository } from '../../schools/repositories/ISchoolRepository';
import { ISubjectRepository } from '@modules/subjects/repositories/ISubjectsRepository';

@Injectable()
export default class CreateSchoolVolunteerWorkService {
  constructor(
    @Inject('SchoolRepository')
    private schoolRepository: ISchoolRepository,

    @Inject('VolunteerWorkRepository')
    private volunteerWorkRepository: IVolunteerWorkRepository,

    @Inject('SubjectRepository')
    private subjectRepository: ISubjectRepository
  ) {}

  public async execute(
    currentUser: User,
    { title, description, school_id, subject_id }: CreateVolunteerWorkDTO
  ): Promise<VolunteerWork> {
    const findSchool = await this.schoolRepository.findById(school_id);
    const findSubject = await this.subjectRepository.findById(subject_id);

    if (!findSubject) throw new NotFoundException('Subject not found');

    if (!findSchool) throw new NotFoundException('School not found');

    if (findSchool.user_id !== currentUser.id)
      throw new NotFoundException('School not found');

    const createVolunteerWork = await this.volunteerWorkRepository.create({
      title,
      description,
      school_id,
      subject_id,
    });

    return createVolunteerWork;
  }
}
