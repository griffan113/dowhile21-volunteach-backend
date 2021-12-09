import {
  Body,
  Controller,
  Inject,
  Param,
  ParseUUIDPipe,
  Put,
  ValidationPipe,
} from '@nestjs/common';
import { VolunteerWork, User } from '.prisma/client';

import { GetUser } from '@modules/users/infra/http/decorators/GetUser.decorator';
import { SetTeacherRoute } from '@modules/users/infra/http/decorators/SetTeacherRoute.decorator';
import { SubscribeAtVolunteerWorkDTO } from '@modules/volunteer_works/dtos/SubscribeAtVolunteerWorkDTO';
import SubscribeAtSchoolVolunteerWorkService from '@modules/volunteer_works/services/SubscribeAtVolunteerWork.service';

@SetTeacherRoute()
@Controller('voluteer_works')
export default class SubscribeAtVolunteerWorkController {
  constructor(
    @Inject('SubscribeAtSchoolVolunteerWorkService')
    private subscribeAtSchoolVolunteerWorkService: SubscribeAtSchoolVolunteerWorkService
  ) {}

  @Put('subscribe/:id')
  public async index(
    @GetUser() currentUser: User,
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
