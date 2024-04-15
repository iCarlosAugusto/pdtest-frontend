import { Injectable } from '@nestjs/common';
import { CreateSquadDto } from 'src/modules/squad/dto/create-squad.dto';
import { PrismaService } from 'utils/prisma.service';

@Injectable()
export class SquadRepository {

  constructor(private prisma: PrismaService) {}

  create(data: CreateSquadDto) {
    return this.prisma.squad.create({data});
  }

  findAll() {
    return this.prisma.squad.findMany();
  }

  findById(id: string) {
    return this.prisma.squad.findUnique({where: {
      id
    }});
  }
}
