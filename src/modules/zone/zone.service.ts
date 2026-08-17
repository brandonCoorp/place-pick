import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateZoneDto } from './dto/create-zone.dto';
import { UpdateZoneDto } from './dto/update-zone.dto';
import { ZoneRepository } from './repositories/zone.repository';

@Injectable()
export class ZoneService {
  constructor(private readonly zoneRepository: ZoneRepository) { }

  async create(createZoneDto: CreateZoneDto) {
    return await this.zoneRepository.create(createZoneDto);
  }

  async findAll() {
    return await this.zoneRepository.findAll();
  }

  async findOne(id: string) {
    const zone = await this.zoneRepository.findById(id);
    if (!zone) {
      throw new NotFoundException(`Zone with ID ${id} not found`);
    }
    return zone;
  }

  async update(id: string, updateZoneDto: UpdateZoneDto) {
    await this.findOne(id);
    await this.zoneRepository.update(id, updateZoneDto);
    return this.findOne(id);
  }
}
