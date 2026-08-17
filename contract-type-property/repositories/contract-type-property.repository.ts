import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ContractTypeProperty } from '../models/contract-type-property.model';
import { CreateContractTypePropertyDto } from '../dto/create-contract-type-property.dto';
import { UpdateContractTypePropertyDto } from '../dto/update-contract-type-property.dto';

@Injectable()
export class ContractTypePropertyRepository {
  constructor(
    @InjectModel(ContractTypeProperty)
    private readonly contractTypePropertyModel: typeof ContractTypeProperty,
  ) {}

  async create(dto: CreateContractTypePropertyDto): Promise<ContractTypeProperty> {
    return this.contractTypePropertyModel.create(dto);
  }

  async findAll(): Promise<ContractTypeProperty[]> {
    return this.contractTypePropertyModel.findAll();
  }

  async findById(id: string): Promise<ContractTypeProperty | null> {
    return this.contractTypePropertyModel.findByPk(id);
  }

  async update(id: string, dto: UpdateContractTypePropertyDto): Promise<ContractTypeProperty> {
    const contractTypeProperty = await this.contractTypePropertyModel.findByPk(id);
    if (!contractTypeProperty) {
      throw new Error('Contract type property not found');
    }

    return contractTypeProperty.update(dto);
  }

  async delete(id: string): Promise<void> {
    await this.contractTypePropertyModel.destroy({
      where: { id },
    });
  }
}