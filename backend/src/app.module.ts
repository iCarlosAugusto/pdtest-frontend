import { Module } from '@nestjs/common';
import { EmployeesModule } from './modules/employees/employees.module';
import { ReportsModule } from './modules/reports/reports.module';
import { SquadModule } from './modules/squad/squad.module';
import { EmployeesRepository } from './repositories/employee.repository';
import { SquadRepository } from './repositories/squad.repository';
import { ReportsRepository } from './repositories/reports.repository';
import { PrismaService } from 'utils/prisma.service';

@Module({
  imports: [EmployeesModule, ReportsModule, SquadModule],
  controllers: [],
  providers: [EmployeesRepository, SquadRepository, ReportsRepository, PrismaService],
})
export class AppModule {}
