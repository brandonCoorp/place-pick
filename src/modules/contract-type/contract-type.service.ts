import { Injectable, NotFoundException } from '@nestjs/common';
import { ContractTypeRepository } from './repositories/contract-type.repository';
import { CreateContractTypeDto } from './dto/create-contract-type.dto';
import { UpdateContractTypeDto } from './dto/update-contract-type.dto';

@Injectable()
export class ContractTypeService {
  constructor(
    private readonly contractTypeRepository: ContractTypeRepository,
  ) {}

  async create(dto: CreateContractTypeDto) {
    return this.contractTypeRepository.create(dto);
  }

  async findAll() {
    return this.contractTypeRepository.findAll();
  }

  async findOne(id: string) {
    const contractType = await this.contractTypeRepository.findById(id);

    if (!contractType) {
      throw new NotFoundException('contract type not found');
    }

    return contractType;
  }

  async update(id: string, dto: UpdateContractTypeDto) {
   return await this.contractTypeRepository.update(id, dto);
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.contractTypeRepository.delete(id);
  }
}