import { Injectable, NotFoundException } from '@nestjs/common';
import { PropertyCategoryRepository } from './repositories/property-category.repository';
import { Transaction } from 'sequelize';
import { CreatePropertyCategoryDto } from './dto/create-property-category.dto';
import { UpdatePropertyCategoryDto } from './dto/update-property-category.dto';

@Injectable()
export class PropertyCategoryService {
  constructor(
    private readonly propertyCategoryRepository: PropertyCategoryRepository,
  ) {}

  async create(dto: CreatePropertyCategoryDto) {
    return this.propertyCategoryRepository.create(dto);
  }

  async findAll() {
    return this.propertyCategoryRepository.findAll();
  }

  async findOne(id: string) {
    const propertyCategory = await this.propertyCategoryRepository.findById(id);

    if (!propertyCategory) {
      throw new NotFoundException('property category not found');
    }

    return propertyCategory;
  }

  async update(id: string, dto: UpdatePropertyCategoryDto) {
   return await this.propertyCategoryRepository.update(id, dto);
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.propertyCategoryRepository.delete(id);
  }

  async assignCategories(propertyId: string, categoryIds: string[], transaction?: Transaction) {
    const data = categoryIds.map((categoryId) => ({
      propertyId,
      categoryId,
    }));
    await this.propertyCategoryRepository.bulkCreate(data, transaction);
  }

  async assignSingleCategory(propertyId: string, categoryId: string, transaction?: Transaction) {
    const existing = await this.propertyCategoryRepository.findOneByPropertyAndCategory(propertyId, categoryId);

    if (existing) {
      if (existing.status !== 'active') {
        await this.propertyCategoryRepository.updateStatus(existing.id, 'active', transaction);
      }
      existing.status = 'active';
      return existing;
    }

    return await this.propertyCategoryRepository.create({
      propertyId,
      categoryId,
    });
  }

  async removeSingleCategory(propertyId: string, categoryId: string, transaction?: Transaction) {
    const existing = await this.propertyCategoryRepository.findOneByPropertyAndCategory(propertyId, categoryId);

    if (!existing) {
      throw new NotFoundException('Relationship not found');
    }

    await this.propertyCategoryRepository.updateStatus(existing.id, 'inactive', transaction);
    existing.status = 'inactive';
    return existing;
  }

  async removeAllByPropertyId(propertyId: string, transaction?: Transaction) {
    await this.propertyCategoryRepository.deleteByPropertyId(propertyId, transaction);
  }
}