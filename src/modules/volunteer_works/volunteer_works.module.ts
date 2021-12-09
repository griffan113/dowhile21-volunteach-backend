import { Module } from '@nestjs/common';
import { PrismaService } from '@shared/infra/prisma/Prisma.service';

import SchoolRepository from '@modules/schools/infra/prisma/repositories/SchoolRepository';
import VolunteerWorkRepository from '@modules/volunteer_works/infra/prisma/repositories/VolunteerWorkRepository';
import CreateSchoolVolunteerWorkService from '@modules/volunteer_works/services/CreateSchoolVolunteerWork.service';
import UserRepository from '@modules/users/infra/prisma/repositories/UserRepository';
import VolunteerWorksController from '@modules/volunteer_works/infra/http/controllers/VolunteerWorks.controller';
import SubscribeAtVolunteerWorkController from './infra/http/controllers/SubscribeAtVolunteerWork.controller';
import SubscribeAtSchoolVolunteerWorkService from './services/SubscribeAtVolunteerWork.service';
import UpdateVolunteerWorkService from './services/UpdateVolunteerWork.service';
import SubjectRepository from '@modules/subjects/infra/prisma/repositories/SubjectRepository';
import UnsubscribeAtVolunteerWorkController from './infra/http/controllers/UnsubscribeAtVolunteerWork.controller';
import UnsubscribeAtSchoolVolunteerWorkService from './services/UnsubscribeAtVolunteerWork.service';

@Module({
  providers: [
    PrismaService,
    { provide: 'SchoolRepository', useClass: SchoolRepository },
    { provide: 'VolunteerWorkRepository', useClass: VolunteerWorkRepository },
    { provide: 'UserRepository', useClass: UserRepository },
    { provide: 'SubjectRepository', useClass: SubjectRepository },
    {
      provide: 'CreateSchoolVolunteerWorkService',
      useClass: CreateSchoolVolunteerWorkService,
    },
    {
      provide: 'UpdateVolunteerWorkService',
      useClass: UpdateVolunteerWorkService,
    },
    {
      provide: 'SubscribeAtSchoolVolunteerWorkService',
      useClass: SubscribeAtSchoolVolunteerWorkService,
    },
    {
      provide: 'UnsubscribeAtSchoolVolunteerWorkService',
      useClass: UnsubscribeAtSchoolVolunteerWorkService,
    },
  ],
  controllers: [
    VolunteerWorksController,
    SubscribeAtVolunteerWorkController,
    UnsubscribeAtVolunteerWorkController,
  ],
})
export class VolunteerWorksModule {}
