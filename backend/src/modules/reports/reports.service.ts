import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateReportDto } from './dto/create-report.dto';
import { ReportsRepository } from 'src/repositories/reports.repository';
import { EmployeesRepository } from 'src/repositories/employee.repository';

@Injectable()
export class ReportsService {

  constructor(
    private readonly reportsRepository: ReportsRepository,
    private readonly employeeRepository: EmployeesRepository
  ) {}

  async create(data: CreateReportDto) {
    const employee = await this.employeeRepository.findById(data.employeeId);
    if(!employee){
      throw new HttpException('Nenhum funcionário encontrado para o employeeId fornecido', HttpStatus.BAD_REQUEST);
    }
    return await this.reportsRepository.create(data);
  }

  findAll() {
    return this.reportsRepository.findAll();
  }

  findOne(id: number) {
    return `This action returns a #${id} report`;
  }

  remove(id: number) {
    return `This action removes a #${id} report`;
  }
}
