import { School } from '.prisma/client';

import { CreateSchoolDTO } from '../dtos/CreateSchoolDTO';

export interface ISchoolRepository {
  findById: (id: string) => Promise<School | undefined>;
  delete: (id: string) => Promise<School>;
  create: (data: CreateSchoolDTO) => Promise<School>;
  update: (School: School) => Promise<School>;
}
