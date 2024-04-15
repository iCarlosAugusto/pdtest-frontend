import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateEmployeeDto {
  @IsString()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  estimatedHours: number;

  @IsString()
  @IsNotEmpty()
  squadId: string;
}