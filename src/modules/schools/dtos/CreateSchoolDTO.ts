import { IsString, IsUUID, MaxLength } from 'class-validator';

export abstract class CreateSchoolDTO {
  @IsString()
  @MaxLength(50)
  name: string;

  @IsUUID()
  user_id: string;
}
