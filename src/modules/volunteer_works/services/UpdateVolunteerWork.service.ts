import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { School, User, VolunteerWork } from '.prisma/client';

import { IVolunteerWorkRepository } from '../repositories/IVolunteerWorkRepository';
import { ISchoolRepository } from '@modules/schools/repositories/ISchoolRepository';

interface IRequest {
  id: string;
  title?: string;
  description?: string;
  school_id?: string;
}

@Injectable()
export default class UpdateVolunteerWorkService {
  constructor(
    @Inject('SchoolRepository')
    private schoolRepository: ISchoolRepository,

    @Inject('VolunteerWorkRepository')
    private volunteerWorkRepository: IVolunteerWorkRepository
  ) {}

  public async execute(
    currentUser: User,
    { id, title, description, school_id }: IRequest
  ): Promise<VolunteerWork> {
    const findVolunteerWork = await this.volunteerWorkRepository.findById(id);

    if (!findVolunteerWork)
      throw new NotFoundException('Volunteer Work not found');

    let findSchool: School;

    if (school_id) {
      findSchool = await this.schoolRepository.findById(school_id);

      if (!findSchool) throw new NotFoundException('School not found');

      findVolunteerWork.school_id = school_id;
    }

    if (findSchool && findSchool.user_id !== currentUser.id)
      throw new NotFoundException('School not found');

    if (title) findVolunteerWork.title = title;
    if (description) findVolunteerWork.description = description;

    const updateVolunteerWork = await this.volunteerWorkRepository.update(
      findVolunteerWork
    );

    return updateVolunteerWork;
  }
}
