import { IsUUID } from 'class-validator';

export abstract class SubscribeAtVolunteerWorkDTO {
  @IsUUID()
  user_id: string;
}
