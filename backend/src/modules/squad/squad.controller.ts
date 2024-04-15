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
  findOne(@Param('id') id: string) {
    return this.squadService.findOne(+id);
  }

  @Get(':id/totalEmployeeHours')
  findTotalEmployeeHours(
    @Param('id') id: string,
    @Query('startDate') startDate: string,
    @Query('endData') endDate: string
  ) {
    return this.squadService.totalEmployeesHours(id, startDate, endDate);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.squadService.remove(+id);
  }
}
