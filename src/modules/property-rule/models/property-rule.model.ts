import { Table, Column, Model, DataType, CreatedAt, UpdatedAt, Default, BelongsTo, ForeignKey } from 'sequelize-typescript';
import { Rule } from 'src/modules/rule/models/rule.model';
import { PropertyRuleAttributes, PropertyRuleCreationAttributes } from './property-rule.types';

@Table({
  tableName: 'property_rule',
  underscored: true,
  timestamps: true,
})
export class PropertyRule extends Model<
  PropertyRuleAttributes,
  PropertyRuleCreationAttributes
> implements PropertyRuleAttributes {
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

  @ForeignKey(() => Rule)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  declare ruleId: string;

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

  @BelongsTo(() => Rule)
  declare rule?: Rule;
}