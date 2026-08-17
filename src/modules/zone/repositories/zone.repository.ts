import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Zone } from '../models/zone.model';
import { Transaction } from 'sequelize';

@Injectable()
export class ZoneRepository {
  constructor(
    @InjectModel(Zone)
    private zoneModel: typeof Zone,
  ) { }

  async create(data: any, transaction?: Transaction): Promise<Zone> {
    return await this.zoneModel.create(data, { transaction });
  }

  async findById(id: string, transaction?: Transaction): Promise<Zone | null> {
    return await this.zoneModel.findByPk(id, { transaction, raw: true });
  }

  async findAll(): Promise<Zone[]> {
    return await this.zoneModel.findAll({ raw: true });
  }

  async update(id: string, data: any, transaction?: Transaction): Promise<void> {
    await this.zoneModel.update(data, {
      where: { id },
      transaction,
    });
  }
}
