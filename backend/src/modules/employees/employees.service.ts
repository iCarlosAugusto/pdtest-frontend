import { Injectable } from '@nestjs/common';
import { EmployeesRepository } from 'src/repositories/employee.repository';
import { CreateEmployeeDto } from './dtos/create-employee.dto';

@Injectable()
export class EmployeesService {

  constructor(private employeeRepository: EmployeesRepository) {}

  createEmployee(data: CreateEmployeeDto) {
    return this.employeeRepository.create(data);
  }

  getAll() {
    return this.employeeRepository.findAll();
  }
}
