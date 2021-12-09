import { Module } from '@nestjs/common';
import { PrismaService } from '@shared/infra/prisma/Prisma.service';

import UserRepository from '@modules/users/infra/prisma/repositories/UserRepository';
import SchoolRepository from './infra/prisma/repositories/SchoolRepository';
import CreateSchoolService from './services/CreateSchool.service';
import DeleteSchoolService from './services/DeleteSchool.service';
import SchoolsController from './infra/http/controllers/Schools.controller';
import ShowSchoolService from './services/ShowSchool.service';
import VolunteerWorkRepository from '../volunteer_works/infra/prisma/repositories/VolunteerWorkRepository';
import UpdateSchoolService from './services/UpdateSchool.service';

@Module({
  providers: [
    PrismaService,
    { provide: 'SchoolRepository', useClass: SchoolRepository },
    { provide: 'VolunteerWorkRepository', useClass: VolunteerWorkRepository },
    { provide: 'UserRepository', useClass: UserRepository },
    { provide: 'CreateSchoolService', useClass: CreateSchoolService },
    { provide: 'DeleteSchoolService', useClass: DeleteSchoolService },
    { provide: 'ShowSchoolService', useClass: ShowSchoolService },
    { provide: 'UpdateSchoolService', useClass: UpdateSchoolService },
  ],
  controllers: [SchoolsController],
})
export class SchoolsModule {}
