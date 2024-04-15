import { Module } from '@nestjs/common';
import { SquadService } from './squad.service';
import { SquadController } from './squad.controller';
import { SquadRepository } from 'src/repositories/squad.repository';
import { PrismaService } from 'utils/prisma.service';

@Module({
  controllers: [SquadController],
  providers: [SquadService, SquadRepository, PrismaService],
})
export class SquadModule {}
