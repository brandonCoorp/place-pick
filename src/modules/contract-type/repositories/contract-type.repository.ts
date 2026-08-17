import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ContractType } from '../models/contract-type.model';
import { CreateContractTypeDto } from '../dto/create-contract-type.dto';
import { UpdateContractTypeDto } from '../dto/update-contract-type.dto';

@Injectable()
export class ContractTypeRepository {
  constructor(
    @InjectModel(ContractType)
    private readonly contractTypeModel: typeof ContractType,
  ) {}

  async create(dto: CreateContractTypeDto): Promise<ContractType> {
    return this.contractTypeModel.create(dto);
  }

  async findAll(): Promise<ContractType[]> {
    return this.contractTypeModel.findAll();
  }

  async findById(id: string): Promise<ContractType | null> {
    return this.contractTypeModel.findByPk(id);
  }

  async update(id: string, dto: UpdateContractTypeDto): Promise<ContractType> {
    const contractType = await this.contractTypeModel.findByPk(id);
    if (!contractType) {
      throw new Error('Contract type not found');
    }

    return contractType.update(dto);
  }

  async delete(id: string): Promise<void> {
    await this.contractTypeModel.destroy({
      where: { id },
    });
  }
}