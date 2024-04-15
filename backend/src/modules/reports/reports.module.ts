import { Module } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { ReportsController } from './reports.controller';
import { ReportsRepository } from 'src/repositories/reports.repository';
import { PrismaService } from 'utils/prisma.service';
import { EmployeesRepository } from 'src/repositories/employee.repository';

@Module({
  controllers: [ReportsController],
  providers: [ReportsService, ReportsRepository, EmployeesRepository, PrismaService],
})
export class ReportsModule {}
