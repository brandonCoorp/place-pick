import { Optional } from 'sequelize';

export interface PropertyCategoryAttributes {
  id: string;
  propertyId: string;
  categoryId: string;
  status?: string;
  createdAt: Date;
  updatedAt: Date;
}

export type PropertyCategoryCreationAttributes = Optional<
  PropertyCategoryAttributes,
  'id' | 'status' | 'createdAt' | 'updatedAt'
>;