import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { Sequelize } from 'sequelize-typescript';
import { PropertyRepository } from './repositories/property.repository';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { FindPropertyDto } from './dto/find-property.dto';
import { PaginationResponseDto } from 'src/common/dto/pagination-response.dto';
import { PropertySummaryResponseDto } from './dto/property-summary-response.dto';
import { PropertyCategoryService } from '../property-category/property-category.service';
import { PropertyRuleService } from '../property-rule/property-rule.service';
import { PropertyOwnerService } from '../property-owner/property-owner.service';
import { PropertyComfortService } from '../property-comfort/property-comfort.service';

@Injectable()
export class PropertyService {
  constructor(
    private readonly propertyRepository: PropertyRepository,
    private readonly propertyCategoryService: PropertyCategoryService,
    private readonly propertyRuleService: PropertyRuleService,
    private readonly propertyOwnerService: PropertyOwnerService,
    private readonly propertyComfortService: PropertyComfortService,
    private sequelize: Sequelize,
  ) { }

  async create(createPropertyDto: CreatePropertyDto) {
    const { 
      categoryIds, 
      ownerIds, 
      comfortIds, 
      ruleIds, 
      ...propertyData 
    } = createPropertyDto;

    return await this.sequelize.transaction(async (transaction) => {
      const property = await this.propertyRepository.create(propertyData, transaction);

      if (categoryIds?.length) {
        await this.propertyCategoryService.assignCategories(property.id, categoryIds, transaction);
      }

      if (ruleIds?.length) {
        await this.propertyRuleService.assignRules(property.id, ruleIds, transaction);
      }

      if (ownerIds?.length) {
        await this.propertyOwnerService.assignOwners(property.id, ownerIds, transaction);
      }

      if (comfortIds?.length) {
        await this.propertyComfortService.assignComforts(property.id, comfortIds, transaction);
      }

      return await this.propertyRepository.findById(property.id, transaction);
    });
  }

  async findAll(paginationDto: PaginationDto<FindPropertyDto>): Promise<PaginationResponseDto<PropertySummaryResponseDto>> {
    const { rows, count } = await this.propertyRepository.findAll(paginationDto);
    
    const data = rows.map(property => new PropertySummaryResponseDto(property.get({ plain: true })));
    
    const { page = 1, limit = 10 } = paginationDto;

    return new PaginationResponseDto(
      data,
      count,
      page,
      limit
    );
  }

  async findOne(id: string, transaction?: any) {
    const property = await this.propertyRepository.findById(id, transaction);

    if (!property) {
      throw new NotFoundException(`Property with ID ${id} not found`);
    }

    return property;
  }

  async update(id: string, updatePropertyDto: UpdatePropertyDto) {
    const { 
      categoryIds, 
      ownerIds, 
      comfortIds, 
      ruleIds, 
      ...propertyData 
    } = updatePropertyDto;

    // Verificamos que exista
    await this.findOne(id);

    return await this.sequelize.transaction(async (t) => {
      await this.propertyRepository.update(id, propertyData, t);

      // Actualizar Categorías
      if (categoryIds) {
        await this.propertyCategoryService.removeAllByPropertyId(id, t);
        if (categoryIds.length > 0) {
          await this.propertyCategoryService.assignCategories(id, categoryIds, t);
        }
      }

      // Actualizar Dueños
      if (ownerIds) {
        await this.propertyOwnerService.removeAllByPropertyId(id, t);
        if (ownerIds.length > 0) {
          await this.propertyOwnerService.assignOwners(id, ownerIds, t);
        }
      }

      // Actualizar Comodidades
      if (comfortIds) {
        await this.propertyComfortService.removeAllByPropertyId(id, t);
        if (comfortIds.length > 0) {
          await this.propertyComfortService.assignComforts(id, comfortIds, t);
        }
      }

      // Actualizar Reglas
      if (ruleIds) {
        await this.propertyRuleService.removeAllByPropertyId(id, t);
        if (ruleIds.length > 0) {
          await this.propertyRuleService.assignRules(id, ruleIds, t);
        }
      }

      return this.findOne(id, t);
    });
  }
}
