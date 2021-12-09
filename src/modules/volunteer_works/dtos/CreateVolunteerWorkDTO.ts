import { IsString, IsUUID, MaxLength } from 'class-validator';

export abstract class CreateVolunteerWorkDTO {
  @IsString()
  @MaxLength(50)
  title: string;

  @IsString()
  @MaxLength(150)
  description: string;

  @IsUUID()
  school_id: string;
}
