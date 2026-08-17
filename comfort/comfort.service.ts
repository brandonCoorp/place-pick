import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateComfortDto } from './dto/create-comfort.dto';
import { UpdateComfortDto } from './dto/update-comfort.dto';
import { ComfortRepository } from './repositories/comfort.repository';

@Injectable()
export class ComfortService {
  constructor(
    private readonly comfortRepository: ComfortRepository,
  ) { }

  async create(createComfortDto: CreateComfortDto) {
    return await this.comfortRepository.create(createComfortDto);
  }

  async findAll() {
    return await this.comfortRepository.findAll();
  }

  async findOne(id: string) {
    const comfort = await this.comfortRepository.findById(id);
    if (!comfort) {
      throw new NotFoundException(`Comfort with ID ${id} not found`);
    }
    return comfort;
  }

  async update(id: string, updateComfortDto: UpdateComfortDto) {
    await this.findOne(id);
    await this.comfortRepository.update(id, updateComfortDto);
    return this.findOne(id);
  }
}
