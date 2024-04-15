import { Body, Controller, Get, Post } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { CreateEmployeeDto } from './dtos/create-employee.dto';

@Controller("employees")
export class EmployeesController {
  constructor(private readonly employeeService: EmployeesService) {}

  @Post()
  createEmployee(@Body() data: CreateEmployeeDto) {
    return this.employeeService.createEmployee(data);
  }

  @Get()
  getAll() {
    return this.employeeService.getAll();
  }
}
