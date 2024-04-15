import { Module } from '@nestjs/common';
import { SquadService } from './squad.service';
import { SquadController } from './squad.controller';
import { SquadRepository } from 'src/repositories/squad.repository';
import { PrismaService } from 'utils/prisma.service';
import { EmployeesRepository } from 'src/repositories/employee.repository';

@Module({
  controllers: [SquadController],
  providers: [SquadService, SquadRepository, EmployeesRepository ,PrismaService],
})
export class SquadModule {}
