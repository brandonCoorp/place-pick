import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOwnerDto } from './dto/create-owner.dto';
import { UpdateOwnerDto } from './dto/update-owner.dto';
import { OwnerRepository } from './repositories/owner.repository';

@Injectable()
export class OwnerService {
  constructor(
    private readonly ownerRepository: OwnerRepository,
  ) { }

  async create(createOwnerDto: CreateOwnerDto) {
    return await this.ownerRepository.create(createOwnerDto);
  }

  async findAll() {
    return await this.ownerRepository.findAll();
  }

  async findOne(id: string) {
    const owner = await this.ownerRepository.findById(id);
    if (!owner) {
      throw new NotFoundException(`Owner with ID ${id} not found`);
    }
    return owner;
  }

  async update(id: string, updateOwnerDto: UpdateOwnerDto) {
    await this.findOne(id);
    await this.ownerRepository.update(id, updateOwnerDto);
    return this.findOne(id);
  }
}
