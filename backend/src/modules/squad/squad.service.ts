import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateSquadDto } from './dto/create-squad.dto';
import { SquadRepository } from 'src/repositories/squad.repository';
import { EmployeesRepository } from 'src/repositories/employee.repository';

@Injectable()
export class SquadService {

  constructor(
    private squadRepository: SquadRepository,
    private employeeRepository: EmployeesRepository 
  ) {}

  create(createSquadDto: CreateSquadDto) {
    return this.squadRepository.create(createSquadDto);
  }

  findAll() {
    return this.squadRepository.findAll();
  }

  findById(id: string) {
    return this.squadRepository.findById(id);
  }

  remove(id: number) {
    return `This action removes a #${id} squad`;
  }

  async totalEmployeesHours(squadId: string, startDate: string, endData: string) {
    const squad = await this.findById(squadId);
    if(!squad){
      throw new HttpException('Nenhum squad encontrado para o id fornecido', HttpStatus.NOT_FOUND);
    }
    const squadData = await this.employeeRepository.findTotalEmployeeHours(squadId, startDate, endData);


    return squadData.employees.map((el, index )=> {
      return {
        "employeeId": el.id,
        "employeeName": el.name,
        "description": el.reports?.pop()?.description ?? null,
        "spentHours": el.reports.reduce((total, item) => total + item.spentHours, 0),
        "createdAt": el.reports?.pop()?.createdAt ?? null,
      };
    });
  }

  async totalSquadHours(squadId: string, startDate: string, endData: string){
    const squad = await this.findById(squadId);
    if(!squad){
      throw new HttpException('Nenhum squad encontrado para o id fornecido', HttpStatus.NOT_FOUND);
    }
    const squadData = await this.employeeRepository.findTotalSquadHours(squadId, startDate, endData);

    let totalHours = 0;
    squadData.employees.forEach(employee => {
        employee.reports.forEach(report => {
            totalHours += report.spentHours;
        });
    });
    return {
      "squadId": squadData.id,
      "totalHours": totalHours
    };
  }

  async mediaSquadHours(squadId: string, startDate: string, endData: string){
    const squad = await this.findById(squadId);
    if(!squad){
      throw new HttpException('Nenhum squad encontrado para o id fornecido', HttpStatus.NOT_FOUND);
    }
    const squadData = await this.employeeRepository.findTotalSquadHours(squadId, startDate, endData);
    let totalHours = 0;
    let totalReports = 0;

    squadData.employees.forEach(employee => {
      employee.reports.forEach(report => {
        totalHours += report.spentHours;
        totalReports++;
      });
    });

    const mediaHours = totalReports > 0 ? totalHours / totalReports : 0;
    return mediaHours;
  }
}
