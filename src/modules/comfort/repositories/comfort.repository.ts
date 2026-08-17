import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Comfort } from '../models/comfort.model';
import { Transaction } from 'sequelize';

@Injectable()
export class ComfortRepository {
  constructor(
    @InjectModel(Comfort)
    private comfortModel: typeof Comfort,
  ) { }

  async create(data: any, transaction?: Transaction): Promise<Comfort> {
    return await this.comfortModel.create(data, { transaction });
  }

  async findById(id: string, transaction?: Transaction): Promise<Comfort | null> {
    return await this.comfortModel.findByPk(id, { transaction, raw: true });
  }

  async findAll(): Promise<Comfort[]> {
    return await this.comfortModel.findAll({ raw: true });
  }

  async update(id: string, data: any, transaction?: Transaction): Promise<void> {
    await this.comfortModel.update(data, {
      where: { id },
      transaction,
    });
  }
}
