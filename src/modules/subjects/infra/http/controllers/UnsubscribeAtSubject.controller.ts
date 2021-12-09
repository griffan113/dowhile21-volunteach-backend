import {
  Body,
  Controller,
  Inject,
  Param,
  ParseUUIDPipe,
  Put,
  ValidationPipe,
} from '@nestjs/common';
import { Subject } from '.prisma/client';

import { GetUser } from '@modules/users/infra/http/decorators/GetUser.decorator';
import { SetTeacherRoute } from '@modules/users/infra/http/decorators/SetTeacherRoute.decorator';
import { CompleteUser } from '@modules/users/types/CompleteUser';
import { SubscribeAtSubjectDTO } from '@modules/subjects/dtos/SubscribeAtSubjectDTO';
import UnsubscribeAtSubjectService from '@modules/subjects/services/UnsubscribeAtSubject.service';

@SetTeacherRoute()
@Controller('subjects/unsubscribe')
export default class UnsubscribeAtSubjectController {
  constructor(
    @Inject('UnsubscribeAtSubjectService')
    private unsubscribeAtSubjectService: UnsubscribeAtSubjectService
  ) {}

  @Put(':id')
  public async index(
    @GetUser() currentUser: CompleteUser,
    @Param('id', ParseUUIDPipe) id: string,
    @Body(ValidationPipe)
    subscribeAtSubjectDTO: SubscribeAtSubjectDTO
  ): Promise<Subject> {
    const subscribeAtSubject = await this.unsubscribeAtSubjectService.execute(
      currentUser,
      {
        id,
        ...subscribeAtSubjectDTO,
      }
    );

    return subscribeAtSubject;
  }
}
