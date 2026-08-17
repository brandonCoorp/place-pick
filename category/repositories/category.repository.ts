import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Category } from '../models/category.model';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { UpdateCategoryDto } from '../dto/update-category.dto';

@Injectable()
export class CategoryRepository {
  constructor(
    @InjectModel(Category)
    private readonly categoryModel: typeof Category,
  ) {}

  async create(dto: CreateCategoryDto): Promise<Category> {
    return this.categoryModel.create(dto);
  }

  async findAll(): Promise<Category[]> {
    return this.categoryModel.findAll();
  }

  async findById(id: string): Promise<Category | null> {
    return this.categoryModel.findByPk(id);
  }

  async update(id: string, dto: UpdateCategoryDto): Promise<Category> {
    const category = await this.categoryModel.findByPk(id);
    if (!category) {
      throw new Error('Category not found'); 
    }

    return category.update(dto);
  }

  async delete(id: string): Promise<void> {
    await this.categoryModel.destroy({
      where: { id },
    });
  }
}
