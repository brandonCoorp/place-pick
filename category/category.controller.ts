import { Controller, Get, Param, Body, Post, Put, Delete, HttpStatus, NotFoundException } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryResponseDto } from './dto/category-response.dto';
import { Serialize } from 'src/common/interceptors/serialize.interceptor';

@Controller('category')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) { }

    @Get('findAll')
    @Serialize(CategoryResponseDto)
    async findAll() {
        return await this.categoryService.findAll();
    }

    @Get(':id')
    @Serialize(CategoryResponseDto)
    async findOne(@Param('id') id: string) {
        const category = await this.categoryService.findOne(id);
        return category;
    }

    @Post('create')
    @Serialize(CategoryResponseDto)
    async create(@Body() createCategoryDto: CreateCategoryDto) {
        return await this.categoryService.create(createCategoryDto);
    }

    @Put('update/:id')
    @Serialize(CategoryResponseDto)
    async update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
        return await this.categoryService.update(id, updateCategoryDto);
    }
}
