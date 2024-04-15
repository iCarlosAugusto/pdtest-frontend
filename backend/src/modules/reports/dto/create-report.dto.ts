import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateReportDto {

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  employeeId: string;

  @IsNotEmpty()
  @IsNumber()
  spentHours: number;

}