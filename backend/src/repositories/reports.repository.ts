import { Injectable } from '@nestjs/common';
import { CreateReportDto } from 'src/modules/reports/dto/create-report.dto';
import { PrismaService } from 'utils/prisma.service';

@Injectable()
export class ReportsRepository {

  constructor(private prisma: PrismaService) {}

  create(data: CreateReportDto) {
    return this.prisma.report.create({data})
  }

  findAll() {
    return this.prisma.report.findMany();
  }

  findById(id: string) {
    return this.prisma.report.findUnique({where: {
      id
    }});
  }
}
