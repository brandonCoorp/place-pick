import { Column, DataType, Model, Table, ForeignKey } from 'sequelize-typescript';
import { Property } from '../../property/models/property.model';
import { Owner } from '../../owner/models/owner.model';

@Table({
  tableName: 'property_owner',
  underscored: true,
  timestamps: true,
})
export class PropertyOwner extends Model {
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

  @ForeignKey(() => Owner)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  declare ownerId: string;

  @Column({
    type: DataType.STRING,
    defaultValue: 'active',
  })
  declare status: string;
}
