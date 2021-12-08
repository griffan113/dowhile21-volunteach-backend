import { IsEmail, IsString } from 'class-validator';

export abstract class CreateSessionDTO {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
