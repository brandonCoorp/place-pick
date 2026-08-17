import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Property } from '../models/property.model';
import { Category } from '../../category/models/category.model';
import { Transaction, Op, WhereOptions, Includeable, DataTypes, Sequelize } from 'sequelize';
import { FindPropertyDto } from '../dto/find-property.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { Zone } from 'src/modules/zone/models/zone.model';
import { Comfort } from 'src/modules/comfort/models/comfort.model';
import { Rule } from 'src/modules/rule/models/rule.model';
import { Owner } from 'src/modules/owner/models/owner.model';
import { Image } from 'src/modules/image/models/image.model';

@Injectable()
export class PropertyRepository {
  constructor(
    @InjectModel(Property)
    private propertyModel: typeof Property,
  ) { }

  async create(data: any, transaction?: Transaction): Promise<Property> {
    return await this.propertyModel.create(data, { transaction });
  }

  async findById(id: string, transaction?: Transaction): Promise<Property | null> {
    return await this.propertyModel.findByPk(id, {
      include: this.buildIncludeConditions(true), // Detalle incluye reglas
      transaction,
    });
  }

  async findAll(paginationDto: PaginationDto<FindPropertyDto>): Promise<{ rows: Property[], count: number }> {
    const { page = 1, limit = 10, orderBy = 'createdAt', orderDirection = 'DESC', query } = paginationDto;

    const where: WhereOptions = this.buildWhereConditions(query);

    // PASO 1: Obtener solo los IDs paginados (esto evita el error de GROUP BY y el límite incorrecto)
    const { rows: idRows, count } = await this.propertyModel.findAndCountAll({
      where,
      attributes: ['id'],
      limit,
      offset: (page - 1) * limit,
      order: [[orderBy as string, orderDirection]],
      distinct: true,
      subQuery: false,
    });

    const ids = idRows.map(row => row.id);

    if (ids.length === 0) {
      return { rows: [], count };
    }

    // PASO 2: Obtener los objetos completos solo para esos IDs
    const rows = await this.propertyModel.findAll({
      where: { id: { [Op.in]: ids } },
      include: this.buildIncludeConditions(false),
      order: [[orderBy as string, orderDirection]],
    });

    return { rows, count };
  }

  private buildWhereConditions(query?: FindPropertyDto): WhereOptions {
    const where: any = {};
    if (!query) return where;

    const { search, minPrice, maxPrice, status, zoneIds, categoryIds, comfortIds, ruleIds } = query;

    if (search) {
      where[Op.or] = [
        { title: { [Op.iLike]: `%${search}%` } },
        { description: { [Op.iLike]: `%${search}%` } },
        { address: { [Op.iLike]: `%${search}%` } },
      ];
    }

    if (status) {
      where.status = status;
    }

    if (zoneIds && zoneIds.length > 0) {
      where.zoneId = { [Op.in]: zoneIds };
    }

    // Filtros avanzados usando subconsultas EXISTS para evitar duplicados y errores de conteo
    if (categoryIds && categoryIds.length > 0) {
      const ids = categoryIds.map(id => `'${id}'`).join(',');
      where[Op.and] = where[Op.and] || [];
      where[Op.and].push(
        Sequelize.literal(`EXISTS (SELECT 1 FROM property_category WHERE property_id = "Property"."id" AND category_id IN (${ids}))`)
      );
    }

    if (comfortIds && comfortIds.length > 0) {
      const ids = comfortIds.map(id => `'${id}'`).join(',');
      where[Op.and] = where[Op.and] || [];
      where[Op.and].push(
        Sequelize.literal(`EXISTS (SELECT 1 FROM property_comfort WHERE property_id = "Property"."id" AND comfort_id IN (${ids}))`)
      );
    }

    if (ruleIds && ruleIds.length > 0) {
      const ids = ruleIds.map(id => `'${id}'`).join(',');
      where[Op.and] = where[Op.and] || [];
      where[Op.and].push(
        Sequelize.literal(`EXISTS (SELECT 1 FROM property_rule WHERE property_id = "Property"."id" AND rule_id IN (${ids}))`)
      );
    }

    if (minPrice !== undefined || maxPrice !== undefined) {
      where.price = {};
      if (minPrice !== undefined) where.price[Op.gte] = minPrice;
      if (maxPrice !== undefined) where.price[Op.lte] = maxPrice;
    }

    return where;
  }

  private buildIncludeConditions(includeRules: boolean = true): Includeable[] {
    const includes: any[] = [
      { model: Zone },
      { model: Category, through: { attributes: [], where: { status: 'active' } } },
      { model: Comfort, through: { attributes: [], where: { status: 'active' } } },
      { model: Owner, through: { attributes: [], where: { status: 'active' } } },
      { model: Image },
    ];

    if (includeRules) {
      includes.push({ model: Rule, through: { attributes: [], where: { status: 'active' } } });
    }

    return includes;
  }

  async update(id: string, data: any, transaction?: Transaction): Promise<void> {
    await this.propertyModel.update(data, {
      where: { id },
      transaction,
    });
  }
}
