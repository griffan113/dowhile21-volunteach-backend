import {
  Body,
  Controller,
  Inject,
  Param,
  ParseUUIDPipe,
  Put,
  ValidationPipe,
} from '@nestjs/common';
import { VolunteerWork } from '.prisma/client';

import { GetUser } from '@modules/users/infra/http/decorators/GetUser.decorator';
import { SetTeacherRoute } from '@modules/users/infra/http/decorators/SetTeacherRoute.decorator';
import { SubscribeAtVolunteerWorkDTO } from '@modules/volunteer_works/dtos/SubscribeAtVolunteerWorkDTO';
import { CompleteUser } from '@modules/users/types/CompleteUser';
import SubscribeAtSchoolVolunteerWorkService from '@modules/volunteer_works/services/SubscribeAtVolunteerWork.service';

@SetTeacherRoute()
@Controller('voluteer_works/subscribe')
export default class SubscribeAtVolunteerWorkController {
  constructor(
    @Inject('SubscribeAtSchoolVolunteerWorkService')
    private subscribeAtSchoolVolunteerWorkService: SubscribeAtSchoolVolunteerWorkService
  ) {}

  @Put(':id')
  public async index(
    @GetUser() currentUser: CompleteUser,
    @Param('id', ParseUUIDPipe) id: string,
    @Body(ValidationPipe)
    subscribeAtVolunteerWorkDTO: SubscribeAtVolunteerWorkDTO
  ): Promise<VolunteerWork> {
    const createVolunteerWork =
      await this.subscribeAtSchoolVolunteerWorkService.execute(currentUser, {
        id,
        ...subscribeAtVolunteerWorkDTO,
      });

    return createVolunteerWork;
  }
}
