import { UserType } from '.prisma/client';
import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';

export abstract class UpdateUserDTO {
  @IsOptional()
  @IsString()
  old_password?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  password?: string;

  @IsOptional()
  @IsString()
  @IsPhoneNumber()
  telephone?: string;

  @IsOptional()
  @IsEnum(UserType)
  type?: UserType;
}
