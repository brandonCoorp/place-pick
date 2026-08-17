import { Column, DataType, Model, Table, BelongsToMany } from 'sequelize-typescript';
import { Property } from '../../property/models/property.model';
import { PropertyRule } from './property-rule.model';
import { RuleAttributes, RuleCreationAttributes } from './rule.types';

@Table({
  tableName: 'rule',
  underscored: true,
  timestamps: true,
})
export class Rule extends Model<
  RuleAttributes,
  RuleCreationAttributes
> implements RuleAttributes {
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

  @Column({
    type: DataType.DATE,
  })
  declare created_at: Date;

  @Column({
    type: DataType.DATE,
  })
  declare updated_at: Date;

  @BelongsToMany(() => Property,() => PropertyRule,'ruleId', 'propertyId', )
  declare properties: Property[];
}
