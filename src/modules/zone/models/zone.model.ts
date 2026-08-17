import { Column, DataType, Model, Table, HasMany } from 'sequelize-typescript';
import { Property } from '../../property/models/property.model';

@Table({
  tableName: 'zone',
  underscored: true,
  timestamps: true,
})
export class Zone extends Model {
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
  declare title: string;

  @Column({
    type: DataType.TEXT,
  })
  declare description: string;

  @Column({
    type: DataType.DECIMAL(10, 8),
  })
  declare latitud: number;

  @Column({
    type: DataType.DECIMAL(11, 8),
  })
  declare longitud: number;

  @Column({
    type: DataType.INTEGER,
  })
  declare radiusInMeters: number;

  @Column({
    type: DataType.STRING,
    defaultValue: 'active',
  })
  declare status: string;

  @HasMany(() => Property)
  declare properties: Property[];
}
