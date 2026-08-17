import { Column, DataType, Model, Table, ForeignKey, BelongsToMany } from 'sequelize-typescript';
import { Property } from '../../property/models/property.model';
import { Rule } from './rule.model';

@Table({
  tableName: 'property_rule',
  underscored: true,
  timestamps: true,
})
export class PropertyRule extends Model {
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
    field : 'property_id'
  })
  declare propertyId: string;

  @ForeignKey(() => Rule)
  @Column({
    type: DataType.UUID,
    allowNull: false,
    field : 'rule_id'
  })
  declare ruleId: string;

  @Column({
    type: DataType.STRING,
    defaultValue: 'active',
  })
  declare status: string;
 
}
