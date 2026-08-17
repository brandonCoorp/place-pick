import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { PropertyService } from './property.service';
import { PropertyController } from './property.controller';
import { Property } from './models/property.model';
import { Category } from '../category/models/category.model';
import { PropertyRepository } from './repositories/property.repository';
import { Zone } from '../zone/models/zone.model';
import { Comfort } from '../comfort/models/comfort.model';
import { Rule } from '../rule/models/rule.model';
import { Image } from '../image/models/image.model';
import { PropertyCategoryModule } from '../property-category/property-category.module';
import { PropertyRuleModule } from '../property-rule/property-rule.module';
import { PropertyOwnerModule } from '../property-owner/property-owner.module';
import { PropertyComfortModule } from '../property-comfort/property-comfort.module';
import { ComfortModule } from '../comfort/comfort.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Property, Category, Zone, Comfort, Rule, Image]),
    PropertyCategoryModule,
    PropertyRuleModule,
    PropertyOwnerModule,
    PropertyComfortModule,
    ComfortModule,
  ],
  controllers: [PropertyController],
  providers: [PropertyService, PropertyRepository],
  exports: [SequelizeModule, PropertyRepository],
})
export class PropertyModule { }
