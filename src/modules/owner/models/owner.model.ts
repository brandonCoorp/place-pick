import { Column, DataType, Model, Table, BelongsToMany } from 'sequelize-typescript';
import { Property } from '../../property/models/property.model';
import { PropertyOwner } from 'src/modules/property-owner/models/property-owner.model';

@Table({
  tableName: 'owner',
  underscored: true,
  timestamps: true,
})
export class Owner extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  declare id: string;

  @Column({
    type: DataType.STRING,
  })
  declare phone: string;

  @Column({
    type: DataType.STRING,
  })
  declare phoneCode: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare firstName: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare lastName: string;

  @Column({
    type: DataType.STRING,
    unique: true,
  })
  declare email: string;

  @Column({
    type: DataType.STRING,
    defaultValue: 'active',
  })
  declare status: string;

  @BelongsToMany(() => Property, () => PropertyOwner)
  declare properties: Property[];
}
