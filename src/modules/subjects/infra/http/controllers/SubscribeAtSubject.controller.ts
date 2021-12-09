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
import SubscribeAtSubjectService from '@modules/subjects/services/SubscribeAtSubject.service';

@SetTeacherRoute()
@Controller('subjects/subscribe')
export default class SubscribeAtSubjectController {
  constructor(
    @Inject('SubscribeAtSubjectService')
    private subscribeAtSubjectService: SubscribeAtSubjectService
  ) {}

  @Put(':id')
  public async index(
    @GetUser() currentUser: CompleteUser,
    @Param('id', ParseUUIDPipe) id: string,
    @Body(ValidationPipe)
    subscribeAtSubjectDTO: SubscribeAtSubjectDTO
  ): Promise<Subject> {
    const subscribeAtSubject = await this.subscribeAtSubjectService.execute(
      currentUser,
      {
        id,
        ...subscribeAtSubjectDTO,
      }
    );

    return subscribeAtSubject;
  }
}
