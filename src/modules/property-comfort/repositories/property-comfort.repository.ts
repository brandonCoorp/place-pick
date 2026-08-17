import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { PropertyComfort } from '../models/property-comfort.model';
import { Transaction } from 'sequelize';

@Injectable()
export class PropertyComfortRepository {
  constructor(
    @InjectModel(PropertyComfort)
    private readonly propertyComfortModel: typeof PropertyComfort,
  ) {}

  async findOneByPropertyAndComfort(propertyId: string, comfortId: string): Promise<PropertyComfort | null> {
    return this.propertyComfortModel.findOne({
      where: { propertyId, comfortId },
    });
  }

  async create(data: any, transaction?: Transaction): Promise<PropertyComfort> {
    return this.propertyComfortModel.create(data, { transaction });
  }

  async updateStatus(id: string, status: string, transaction?: Transaction): Promise<void> {
    await this.propertyComfortModel.update({ status }, {
      where: { id },
      transaction,
    });
  }

  async bulkCreate(data: any[], transaction?: Transaction): Promise<void> {
    await this.propertyComfortModel.bulkCreate(data, { transaction });
  }

  async deleteByPropertyId(propertyId: string, transaction?: Transaction): Promise<void> {
    await this.propertyComfortModel.destroy({
      where: { propertyId },
      transaction,
    });
  }

  async removeSingle(propertyId: string, comfortId: string, transaction?: Transaction): Promise<void> {
    await this.propertyComfortModel.update({ status: 'inactive' }, {
      where: { propertyId, comfortId },
      transaction,
    });
  }
}
