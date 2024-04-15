import { Injectable } from '@nestjs/common';
import { CreateSquadDto } from './dto/create-squad.dto';
import { SquadRepository } from 'src/repositories/squad.repository';

@Injectable()
export class SquadService {

  constructor(private squadRepository: SquadRepository) {}

  create(createSquadDto: CreateSquadDto) {
    return this.squadRepository.create(createSquadDto);
  }

  findAll() {
    return this.squadRepository.findAll();
  }

  findOne(id: number) {
    return `This action returns a #${id} squad`;
  }

  remove(id: number) {
    return `This action removes a #${id} squad`;
  }
}
