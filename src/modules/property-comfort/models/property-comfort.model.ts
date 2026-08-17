import { Column, DataType, Model, Table, ForeignKey } from 'sequelize-typescript';
import { Property } from '../../property/models/property.model';
import { Comfort } from '../../comfort/models/comfort.model';

@Table({
  tableName: 'property_comfort',
  underscored: true,
  timestamps: true,
})
export class PropertyComfort extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  declare id: string;

  @ForeignKey(() => Property)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  declare propertyId: string;

  @ForeignKey(() => Comfort)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  declare comfortId: string;

  @Column({
    type: DataType.STRING,
    defaultValue: 'active',
  })
  declare status: string;
}
