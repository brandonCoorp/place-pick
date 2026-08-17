import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { PropertyCategory } from './models/property-category.model';
import { PropertyCategoryController } from './property-category.controller';
import { PropertyCategoryService } from './property-category.service';
import { PropertyCategoryRepository } from './repositories/property-category.repository';

@Module({
  imports: [SequelizeModule.forFeature([PropertyCategory])],
  controllers: [PropertyCategoryController],
  providers: [PropertyCategoryService, PropertyCategoryRepository],
  exports: [PropertyCategoryService],
})
export class PropertyCategoryModule {}
