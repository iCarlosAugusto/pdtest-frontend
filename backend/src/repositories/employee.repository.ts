import { Injectable } from '@nestjs/common';
import { CreateEmployeeDto } from 'src/modules/employees/dtos/create-employee.dto';
import { PrismaService } from 'utils/prisma.service';

@Injectable()
export class EmployeesRepository {

  constructor(private prisma: PrismaService) {}

  create(data: CreateEmployeeDto) {
    return this.prisma.employee.create({data: data})
  }

  findAll() {
    return this.prisma.employee.findMany();
  }
}
