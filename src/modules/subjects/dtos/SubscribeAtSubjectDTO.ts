import { IsUUID } from 'class-validator';

export abstract class SubscribeAtSubjectDTO {
  @IsUUID()
  user_id: string;
}
