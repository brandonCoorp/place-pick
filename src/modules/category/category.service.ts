import { Injectable, NotFoundException } from '@nestjs/common';
import { CategoryRepository } from './repositories/category.repository';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    private readonly categoryRepository: CategoryRepository,
  ) {}

  async create(dto: CreateCategoryDto) {
    return this.categoryRepository.create(dto);
  }

  async findAll() {
    return this.categoryRepository.findAll();
  }

  async findOne(id: string) {
    const category = await this.categoryRepository.findById(id);

    if (!category) {
      throw new NotFoundException('category not found');
    }

    return category;
  }

  async update(id: string, dto: UpdateCategoryDto) {
   return await this.categoryRepository.update(id, dto);
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.categoryRepository.delete(id);
  }
}
