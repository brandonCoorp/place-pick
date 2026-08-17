import { Column, DataType, Model, Table, BelongsToMany } from 'sequelize-typescript';
import { Property } from '../../property/models/property.model';
import { PropertyComfort } from 'src/modules/property-comfort/models/property-comfort.model';

@Table({
  tableName: 'comfort',
  underscored: true,
  timestamps: true,
})
export class Comfort extends Model {
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
  declare description: string;

  @BelongsToMany(() => Property, () => PropertyComfort)
  declare properties: Property[];
}
