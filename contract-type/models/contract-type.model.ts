import { Table, Column, Model, DataType, CreatedAt, UpdatedAt, Default, HasMany } from 'sequelize-typescript';
import { ContractTypeProperty } from 'src/modules/contract-type-property/models/contract-type-property.model';
import { ContractTypeAttributes, ContractTypeCreationAttributes } from './contract-type.types';

@Table({
  tableName: 'contract_type',
  underscored: true,
  timestamps: true,
})
export class ContractType extends Model<
  ContractTypeAttributes,
  ContractTypeCreationAttributes
> implements ContractTypeAttributes {
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
  declare description?: string;

  @Column({
    type: DataType.DATE,
  })
  declare created_at: Date;

  @Column({
    type: DataType.DATE,
  })
  declare updated_at: Date;

  @HasMany(() => ContractTypeProperty)
  declare contractTypeProperties?: ContractTypeProperty[];
}