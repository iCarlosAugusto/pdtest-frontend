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

  findById(id: string) {
    return this.prisma.employee.findUnique({where: {
      id
    }});
  }

  findTotalEmployeeHours(squadId: string, startDate: string, endData: string) {
    return this.prisma.squad.findUnique({
      where: {
        id: squadId,
      },
      include: {
        employees: {
          include: {
            reports: {
              where: {
                createdAt: {
                  gte: startDate, //data inicial 2024-04-11T02:57:24.384Z
                  lte: endData //data final
                }
              }
            }
          }
        }
      }
    })
  }

  findTotalSquadHours(squadId: string, startDate: string, endData: string){
    return this.prisma.squad.findFirst({
      where: {
        id: squadId
      },
      include: {
        employees: {
          include: {
            reports: {
              where: {
                createdAt: {
                  gte: startDate, //data inicial 2024-04-11T02:57:24.384Z
                  lte: endData //data final
                }
              }
            }
          }
        }
      }
    })
  }
}
