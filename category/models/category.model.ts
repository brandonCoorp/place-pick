import { Column, DataType, Model, Table, BelongsToMany } from 'sequelize-typescript';
import { Property } from '../../property/models/property.model';
import { PropertyCategory } from 'src/modules/property-category/models/property-category.model';
import { CategoryAttributes, CategoryCreationAttributes } from './category.types';

@Table({
  tableName: 'category',
  underscored: true,
  timestamps: true,
})
export class Category extends Model<
  CategoryAttributes,
  CategoryCreationAttributes
> implements CategoryAttributes {

  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  declare id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  declare code: string;

  @Column({
    type: DataType.STRING,
  })
  declare description?: string;

  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;

  @BelongsToMany(() => Property, () => PropertyCategory, 'propertyId', 'categoryId',)
  declare properties: Property[];

}