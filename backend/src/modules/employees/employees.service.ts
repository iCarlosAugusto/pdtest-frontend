import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { EmployeesRepository } from 'src/repositories/employee.repository';
import { CreateEmployeeDto } from './dtos/create-employee.dto';
import { SquadRepository } from 'src/repositories/squad.repository';

@Injectable()
export class EmployeesService {

  constructor(
    private employeeRepository: EmployeesRepository,
    private squadRepository: SquadRepository
  ) {}

  async createEmployee(data: CreateEmployeeDto) {
    const squad = await this.squadRepository.findById(data.squadId);
    if(!squad){
      throw new HttpException('Nenhum squad encontrado para o squadId fornecido', HttpStatus.BAD_REQUEST);
    }
    return await this.employeeRepository.create(data);
  }

  getAll() {
    return this.employeeRepository.findAll();
  }
}