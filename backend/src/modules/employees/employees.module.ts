import { Module } from '@nestjs/common';
import { EmployeesController } from './employees.controller';
import { EmployeesService } from './employees.service';
import { PrismaService } from 'utils/prisma.service';
import { EmployeesRepository } from 'src/repositories/employee.repository';

@Module({
  imports: [],
  controllers: [EmployeesController],
  providers: [EmployeesService, EmployeesRepository, PrismaService],
})
export class EmployeesModule {}
