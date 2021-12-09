import { IsString, MaxLength } from 'class-validator';

export abstract class CreateSubjectDTO {
  @IsString()
  @MaxLength(50)
  name: string;
}
