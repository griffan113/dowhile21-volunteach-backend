import { IsOptional, IsUUID, MaxLength } from 'class-validator';

export abstract class UpdateVolunteerWorkDTO {
  @IsOptional()
  @MaxLength(50)
  title: string;

  @IsOptional()
  @MaxLength(150)
  description: string;

  @IsOptional()
  @IsUUID()
  school_id: string;
}
