import { Controller, Get, Post } from '@nestjs/common';
import { EmployeesService } from './employees.service';

@Controller("employees")
export class EmployeesController {
  constructor(private readonly employeeService: EmployeesService) {}


  @Post()
  createEmployee() {
    return this.employeeService.createEmployee();
  }
}
