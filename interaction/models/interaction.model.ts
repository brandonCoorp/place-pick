import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({
  tableName: 'interactions',
  underscored: true,
  timestamps: true,
})
export class Interaction extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  declare id: string;

  @Column({
    type: DataType.STRING,
  })
  customerId: string;

  @Column({
    type: DataType.STRING,
  })
  action: string;

  @Column({
    type: DataType.TEXT,
  })
  description: string;

  @Column({
    type: DataType.STRING,
  })
  view: string;

  @Column({
    type: DataType.STRING,
    defaultValue: 'active',
  })
  status: string;
}
