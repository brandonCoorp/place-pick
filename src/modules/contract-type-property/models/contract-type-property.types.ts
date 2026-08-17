import { Optional } from 'sequelize';

export interface ContractTypePropertyAttributes {
  id: string;
  property_id: string;
  contract_type_id: string;
  status?: string;
  created_at: Date;
  updated_at: Date;
}

export type ContractTypePropertyCreationAttributes = Optional<
  ContractTypePropertyAttributes,
  'id' | 'status' | 'created_at' | 'updated_at'
>;