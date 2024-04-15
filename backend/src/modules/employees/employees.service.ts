import { Injectable } from '@nestjs/common';
import { PrismaService } from 'utils/prisma.service';

@Injectable()
export class EmployeesService {

  constructor(private prisma: PrismaService) {}

  createEmployee() {
    return this.prisma.squad.create({
      data: {
        name: "Squad teste"
      }
    })
  }
}
