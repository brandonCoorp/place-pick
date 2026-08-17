import { Table, Column, Model, DataType, CreatedAt, UpdatedAt, Default, BelongsTo, ForeignKey } from 'sequelize-typescript';
import { Category } from 'src/modules/category/models/category.model';
import { PropertyCategoryAttributes, PropertyCategoryCreationAttributes } from './property-category.types';

@Table({
  tableName: 'property_category',
  underscored: true,
  timestamps: true,
})
export class PropertyCategory extends Model<
  PropertyCategoryAttributes,
  PropertyCategoryCreationAttributes
> implements PropertyCategoryAttributes {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  declare id: string;

  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  declare propertyId: string;

  @ForeignKey(() => Category)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  declare categoryId: string;

  @Column({
    type: DataType.STRING,
    defaultValue: 'active',
  })
  declare status?: string;

  @CreatedAt
  @Column({
    type: DataType.DATE,
  })
  declare createdAt: Date;

  @UpdatedAt
  @Column({
    type: DataType.DATE,
  })
  declare updatedAt: Date;

  @BelongsTo(() => Category)
  declare category?: Category;
}