import { Injectable, NotFoundException } from '@nestjs/common';
import { ContractTypePropertyRepository } from './repositories/contract-type-property.repository';
import { CreateContractTypePropertyDto } from './dto/create-contract-type-property.dto';
import { UpdateContractTypePropertyDto } from './dto/update-contract-type-property.dto';

@Injectable()
export class ContractTypePropertyService {
  constructor(
    private readonly contractTypePropertyRepository: ContractTypePropertyRepository,
  ) {}

  async create(dto: CreateContractTypePropertyDto) {
    return this.contractTypePropertyRepository.create(dto);
  }

  async findAll() {
    return this.contractTypePropertyRepository.findAll();
  }

  async findOne(id: string) {
    const contractTypeProperty = await this.contractTypePropertyRepository.findById(id);

    if (!contractTypeProperty) {
      throw new NotFoundException('contract type property not found');
    }

    return contractTypeProperty;
  }

  async update(id: string, dto: UpdateContractTypePropertyDto) {
   return await this.contractTypePropertyRepository.update(id, dto);
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.contractTypePropertyRepository.delete(id);
  }
}