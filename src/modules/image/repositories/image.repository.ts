import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Image } from '../models/image.model';
import { Transaction } from 'sequelize';

@Injectable()
export class ImageRepository {
  constructor(
    @InjectModel(Image)
    private imageModel: typeof Image,
  ) { }

  async create(data: any, transaction?: Transaction): Promise<Image> {
    return await this.imageModel.create(data, { transaction });
  }

  async findById(id: string, transaction?: Transaction): Promise<Image | null> {
    return await this.imageModel.findByPk(id, { transaction });
  }

  async findByPropertyId(propertyId: string): Promise<Image[]> {
    return await this.imageModel.findAll({ where: { propertyId } });
  }

  async update(id: string, data: any, transaction?: Transaction): Promise<void> {
    await this.imageModel.update(data, {
      where: { id },
      transaction,
    });
  }

  async delete(id: string, transaction?: Transaction): Promise<void> {
    await this.imageModel.destroy({
      where: { id },
      transaction,
    });
  }
}
