import { VolunteerWork } from '.prisma/client';

import { CreateVolunteerWorkDTO } from '../dtos/CreateVolunteerWorkDTO';
import { SubscribeAtVolunteerWorkDTO } from '../dtos/SubscribeAtVolunteerWorkDTO';

export interface IVolunteerWorkRepository {
  findById: (id: string) => Promise<VolunteerWork | undefined>;
  subscribe: (
    volunteer_work_id: string,
    data: SubscribeAtVolunteerWorkDTO
  ) => Promise<VolunteerWork>;
  delete: (id: string) => Promise<VolunteerWork>;
  create: (data: CreateVolunteerWorkDTO) => Promise<VolunteerWork>;
  update: (volunteerWork: VolunteerWork) => Promise<VolunteerWork>;
}
