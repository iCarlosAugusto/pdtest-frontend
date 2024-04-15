import { Module } from '@nestjs/common';
import { EmployeesController } from './employees.controller';
import { EmployeesService } from './employees.service';
import { PrismaService } from 'utils/prisma.service';
import { EmployeesRepository } from 'src/repositories/employee.repository';
import { SquadRepository } from 'src/repositories/squad.repository';

@Module({
  imports: [],
  controllers: [EmployeesController],
  providers: [EmployeesService, EmployeesRepository, SquadRepository, PrismaService],
})
export class EmployeesModule {}
