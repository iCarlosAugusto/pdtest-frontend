import { Module } from '@nestjs/common';
import { EmployeesModule } from './modules/employees/employees.module';
import { ReportsModule } from './modules/reports/reports.module';
import { SquadModule } from './modules/squad/squad.module';

@Module({
  imports: [EmployeesModule, ReportsModule, SquadModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
