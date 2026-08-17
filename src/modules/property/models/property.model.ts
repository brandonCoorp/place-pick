import { Column, DataType, Model, Table, BelongsToMany, ForeignKey, BelongsTo, HasMany } from 'sequelize-typescript';
import { Category } from '../../category/models/category.model';
import { PropertyCategory } from 'src/modules/property-category/models/property-category.model';
import { Zone } from '../../zone/models/zone.model';
import { Owner } from 'src/modules/owner/models/owner.model';
import { PropertyOwner } from 'src/modules/property-owner/models/property-owner.model';
import { Comfort } from 'src/modules/comfort/models/comfort.model';
import { PropertyComfort } from 'src/modules/property-comfort/models/property-comfort.model';
import { Rule } from 'src/modules/rule/models/rule.model';
import { PropertyRule } from 'src/modules/property-rule/models/property-rule.model';
import { Image } from '../../image/models/image.model';

@Table({
  tableName: 'property',
  underscored: true,
  timestamps: true,
})
export class Property extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  declare id: string;

  @ForeignKey(() => Zone)
  @Column({
    type: DataType.UUID,
  })
  declare zoneId: string;

  @BelongsTo(() => Zone)
  declare zone: Zone;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare title: string;

  @Column({
    type: DataType.TEXT,
  })
  declare description: string;

  @Column({
    type: DataType.DECIMAL(20, 2),
  })
  declare price: number;

  @Column({
    type: DataType.STRING,
    defaultValue: 'USD',
  })
  declare currency: string;

  @Column({
    type: DataType.STRING,
  })
  declare address: string;

  @Column({
    type: DataType.STRING,
    defaultValue: 'available',
  })
  declare status: string;

  @Column({
    type: DataType.DECIMAL(10, 8) as any,
  })
  declare latitud: number;

  @Column({
    type: DataType.DECIMAL(11, 8) as any,
  })
  declare longitud: number;

  @BelongsToMany(() => Category, () => PropertyCategory, 'propertyId', 'categoryId',)
  declare categories: Category[];

  @BelongsToMany(() => Owner, () => PropertyOwner, 'propertyId', 'ownerId')
  declare owners: Owner[];

  @BelongsToMany(() => Comfort, () => PropertyComfort, 'propertyId', 'comfortId')
  declare comforts: Comfort[];


  @BelongsToMany(() => Rule, () => PropertyRule, 'propertyId', 'ruleId')
  declare rules: Rule[];

  @HasMany(() => Image)
  declare images: Image[];

}
