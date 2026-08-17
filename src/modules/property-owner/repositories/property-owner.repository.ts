import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { PropertyOwner } from '../models/property-owner.model';
import { Transaction } from 'sequelize';

@Injectable()
export class PropertyOwnerRepository {
  constructor(
    @InjectModel(PropertyOwner)
    private readonly propertyOwnerModel: typeof PropertyOwner,
  ) {}

  async findOneByPropertyAndOwner(propertyId: string, ownerId: string): Promise<PropertyOwner | null> {
    return this.propertyOwnerModel.findOne({
      where: { propertyId, ownerId },
    });
  }

  async create(data: any, transaction?: Transaction): Promise<PropertyOwner> {
    return this.propertyOwnerModel.create(data, { transaction });
  }

  async updateStatus(id: string, status: string, transaction?: Transaction): Promise<void> {
    await this.propertyOwnerModel.update({ status }, {
      where: { id },
      transaction,
    });
  }

  async bulkCreate(data: any[], transaction?: Transaction): Promise<void> {
    await this.propertyOwnerModel.bulkCreate(data, { transaction });
  }

  async deleteByPropertyId(propertyId: string, transaction?: Transaction): Promise<void> {
    await this.propertyOwnerModel.destroy({
      where: { propertyId },
      transaction,
    });
  }
}
