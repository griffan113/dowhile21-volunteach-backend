import { CreateVolunteerWorkDTO } from '@modules/volunteer_works/dtos/CreateVolunteerWorkDTO';
import { SubscribeAtVolunteerWorkDTO } from '@modules/volunteer_works/dtos/SubscribeAtVolunteerWorkDTO';
import { IVolunteerWorkRepository } from '@modules/volunteer_works/repositories/IVolunteerWorkRepository';
import { Inject, Injectable } from '@nestjs/common';
import { PrismaClient, Subject, VolunteerWork } from '@prisma/client';

import { PrismaService } from '@shared/infra/prisma/Prisma.service';

@Injectable()
export default class VolunteerWorkRepository
  implements IVolunteerWorkRepository
{
  constructor(
    @Inject(PrismaService)
    private ormRepository: PrismaClient
  ) {}

  public async findById(id: string): Promise<
    | (VolunteerWork & {
        match_subject: Subject;
      })
    | undefined
  > {
    const volunteerWork = await this.ormRepository.volunteerWork.findUnique({
      where: { id },
      include: { match_subject: true },
    });

    return volunteerWork;
  }

  public async subscribe(
    volunteer_work_id: string,
    subscribeAtVolunteerWorkDTO: SubscribeAtVolunteerWorkDTO
  ): Promise<VolunteerWork> {
    const { user_id } = subscribeAtVolunteerWorkDTO;

    const volunteerWork = await this.ormRepository.volunteerWork.update({
      data: {
        subscribed_teachers: { connect: { id: user_id } },
      },
      where: { id: volunteer_work_id },
    });

    return volunteerWork;
  }

  public async unsubscribe(
    volunteer_work_id: string,
    subscribeAtVolunteerWorkDTO: SubscribeAtVolunteerWorkDTO
  ): Promise<VolunteerWork> {
    const { user_id } = subscribeAtVolunteerWorkDTO;

    const volunteerWork = await this.ormRepository.volunteerWork.update({
      data: {
        subscribed_teachers: { disconnect: { id: user_id } },
      },
      where: { id: volunteer_work_id },
    });

    return volunteerWork;
  }

  public async delete(id: string): Promise<VolunteerWork> {
    const VolunteerWork = await this.ormRepository.volunteerWork.delete({
      where: { id },
    });

    return VolunteerWork;
  }

  public async create(
    volunteerWorkData: CreateVolunteerWorkDTO
  ): Promise<VolunteerWork> {
    const { title, description, school_id, subject_id } = volunteerWorkData;

    const volunteerWork = await this.ormRepository.volunteerWork.create({
      data: {
        title,
        description,
        sponsor_school: { connect: { id: school_id } },
        match_subject: { connect: { id: subject_id } },
      },
    });

    return volunteerWork;
  }

  public async update(volunteerWork: VolunteerWork): Promise<VolunteerWork> {
    const { id, title, description, school_id } = volunteerWork;

    const VolunteerWork = await this.ormRepository.volunteerWork.update({
      data: {
        title,
        description,
        sponsor_school: { connect: { id: school_id } },
      },
      where: { id },
    });

    return VolunteerWork;
  }
}
