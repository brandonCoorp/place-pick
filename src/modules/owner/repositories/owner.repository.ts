import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Owner } from '../models/owner.model';
import { Transaction } from 'sequelize';

@Injectable()
export class OwnerRepository {
  constructor(
    @InjectModel(Owner)
    private ownerModel: typeof Owner,
  ) { }

  async create(data: any, transaction?: Transaction): Promise<Owner> {
    return await this.ownerModel.create(data, { transaction });
  }

  async findById(id: string, transaction?: Transaction): Promise<Owner | null> {
    return await this.ownerModel.findByPk(id, { transaction });
  }

  async findAll(): Promise<Owner[]> {
    return await this.ownerModel.findAll();
  }

  async update(id: string, data: any, transaction?: Transaction): Promise<void> {
    await this.ownerModel.update(data, {
      where: { id },
      transaction,
    });
  }
}
