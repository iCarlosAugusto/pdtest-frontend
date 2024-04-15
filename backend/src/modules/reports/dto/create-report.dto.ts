import { IsNotEmpty, IsString } from 'class-validator';

export class CreateReportDto {

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  employeeId: string;

  @IsNotEmpty()
  @IsString()
  spentHours: string;

}