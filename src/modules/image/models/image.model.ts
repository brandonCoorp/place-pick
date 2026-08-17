import { Column, DataType, Model, Table, BelongsTo, ForeignKey } from 'sequelize-typescript';
import { Property } from '../../property/models/property.model';

@Table({
  tableName: 'image',
  underscored: true,
  timestamps: true,
})
export class Image extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  declare id: string;

  @ForeignKey(() => Property)
  @Column({
    type: DataType.UUID,
  })
  declare propertyId: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  declare url: string;

  @Column({
    type: DataType.INTEGER,
    defaultValue: 0,
  })
  declare priority: number;

  @Column({
    type: DataType.STRING,
    defaultValue: 'active',
  })
  declare status: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  declare publicId: string;

  @BelongsTo(() => Property)
  declare property: Property;
}
