import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  name: string;

  @IsNotEmpty()
  estimatedHours: string;
}