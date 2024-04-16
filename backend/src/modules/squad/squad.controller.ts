import { Controller, Get, Post, Body, Param, Delete, Query } from '@nestjs/common';
import { SquadService } from './squad.service';
import { CreateSquadDto } from './dto/create-squad.dto';


@Controller('squad')
export class SquadController {
  constructor(private readonly squadService: SquadService) {}

  @Post()
  create(@Body() createSquadDto: CreateSquadDto) {
    return this.squadService.create(createSquadDto);
  }

  @Get()
  findAll() {
    return this.squadService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.squadService.findById(id);
  }

  @Get(':id/totalEmployeeHours')
  findTotalEmployeeHours(
    @Param('id') id: string,
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string
  ) {
    return this.squadService.totalEmployeesHours(id, startDate, endDate);
  }

  @Get(':id/totalSquadHours')
  findTotalSquadHours(
    @Param('id') id: string,
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string
  ) {
    return this.squadService.totalSquadHours(id, startDate, endDate);
  }

  @Get(':id/mediaSquadHours')
  findMediaSquadHours(
    @Param('id') id: string,
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string
  ) {
    return this.squadService.mediaSquadHours(id, startDate, endDate);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.squadService.remove(+id);
  }
}
