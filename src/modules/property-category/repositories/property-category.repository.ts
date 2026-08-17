import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { PropertyCategory } from '../models/property-category.model';
import { Transaction } from 'sequelize';
import { CreatePropertyCategoryDto } from '../dto/create-property-category.dto';
import { UpdatePropertyCategoryDto } from '../dto/update-property-category.dto';

@Injectable()
export class PropertyCategoryRepository {
  constructor(
    @InjectModel(PropertyCategory)
    private readonly propertyCategoryModel: typeof PropertyCategory,
  ) {}

  async create(dto: CreatePropertyCategoryDto): Promise<PropertyCategory> {
    return this.propertyCategoryModel.create(dto);
  }

  async findAll(): Promise<PropertyCategory[]> {
    return this.propertyCategoryModel.findAll();
  }

  async findById(id: string): Promise<PropertyCategory | null> {
    return this.propertyCategoryModel.findByPk(id);
  }

  async update(id: string, dto: UpdatePropertyCategoryDto): Promise<PropertyCategory> {
    const propertyCategory = await this.propertyCategoryModel.findByPk(id);
    if (!propertyCategory) {
      throw new Error('Property category not found');
    }

    return propertyCategory.update(dto);
  }

  async delete(id: string): Promise<void> {
    await this.propertyCategoryModel.destroy({
      where: { id },
    });
  }

  async findOneByPropertyAndCategory(propertyId: string, categoryId: string): Promise<PropertyCategory | null> {
    return this.propertyCategoryModel.findOne({
      where: { propertyId, categoryId },
    });
  }

  async bulkCreate(data: any[], transaction?: Transaction): Promise<void> {
    await this.propertyCategoryModel.bulkCreate(data, { transaction });
  }

  async updateStatus(id: string, status: string, transaction?: Transaction): Promise<void> {
    await this.propertyCategoryModel.update({ status }, {
      where: { id },
      transaction,
    });
  }

  async deleteByPropertyId(propertyId: string, transaction?: Transaction): Promise<void> {
    await this.propertyCategoryModel.destroy({
      where: { propertyId },
      transaction,
    });
  }
}