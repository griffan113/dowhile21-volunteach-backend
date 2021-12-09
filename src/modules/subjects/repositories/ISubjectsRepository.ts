import { Subject } from '.prisma/client';

import { CreateSubjectDTO } from '../dtos/CreateSubjectDTO';

export interface ISubjectRepository {
  findById: (id: string) => Promise<Subject | undefined>;
  findMany: () => Promise<Subject[]>;
  subscribe: (id: string, teacher_id: string) => Promise<Subject>;
  unsubscribe: (id: string, teacher_id: string) => Promise<Subject>;
  delete: (id: string) => Promise<Subject>;
  create: (data: CreateSubjectDTO) => Promise<Subject>;
  update: (volunteerWork: Subject) => Promise<Subject>;
}
