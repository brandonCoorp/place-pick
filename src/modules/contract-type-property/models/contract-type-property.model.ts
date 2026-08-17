import { Table, Column, Model, DataType, CreatedAt, UpdatedAt, Default, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { ContractType } from 'src/modules/contract-type/models/contract-type.model';
import { ContractTypePropertyAttributes, ContractTypePropertyCreationAttributes } from './contract-type-property.types';

@Table({
  tableName: 'contract_type_property',
  underscored: true,
  timestamps: true,
})
export class ContractTypeProperty extends Model<
  ContractTypePropertyAttributes,
  ContractTypePropertyCreationAttributes
> implements ContractTypePropertyAttributes {
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
  declare property_id: string;

  @ForeignKey(() => ContractType)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  declare contract_type_id: string;

  @Column({
    type: DataType.STRING,
    defaultValue: 'active',
  })
  declare status?: string;

  @Column({
    type: DataType.DATE,
  })
  declare created_at: Date;

  @Column({
    type: DataType.DATE,
  })
  declare updated_at: Date;

  @BelongsTo(() => ContractType)
  declare contractType?: ContractType;
}