import { Inject, Injectable, NotFoundException } from '@nestjs/common';

import { VolunteerWork, User } from '.prisma/client';
import { IVolunteerWorkRepository } from '../repositories/IVolunteerWorkRepository';
import { CreateVolunteerWorkDTO } from '../dtos/CreateVolunteerWorkDTO';
import { ISchoolRepository } from '../../schools/repositories/ISchoolRepository';

@Injectable()
export default class CreateSchoolVolunteerWorkService {
  constructor(
    @Inject('SchoolRepository')
    private schoolRepository: ISchoolRepository,

    @Inject('VolunteerWorkRepository')
    private volunteerWorkRepository: IVolunteerWorkRepository
  ) {}

  public async execute(
    currentUser: User,
    { title, description, school_id }: CreateVolunteerWorkDTO
  ): Promise<VolunteerWork> {
    const findSchool = await this.schoolRepository.findById(school_id);

    if (!findSchool) throw new NotFoundException('School not found');

    if (findSchool.user_id !== currentUser.id)
      throw new NotFoundException('School not found');

    const createVolunteerWork = await this.volunteerWorkRepository.create({
      title,
      description,
      school_id,
    });

    return createVolunteerWork;
  }
}
