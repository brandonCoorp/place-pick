import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Interaction } from '../models/interaction.model';
import { Transaction } from 'sequelize';

@Injectable()
export class InteractionRepository {
  constructor(
    @InjectModel(Interaction)
    private interactionModel: typeof Interaction,
  ) {}

  async create(data: any, transaction?: Transaction): Promise<Interaction> {
    return await this.interactionModel.create(data, { transaction });
  }

  async findAll(): Promise<Interaction[]> {
    return await this.interactionModel.findAll({
      order: [['createdAt', 'DESC']],
    });
  }

  async findById(id: string, transaction?: Transaction): Promise<Interaction | null> {
    return await this.interactionModel.findByPk(id, { transaction });
  }
}
