import { Injectable, NotFoundException } from '@nestjs/common';
import { PropertyOwnerRepository } from './repositories/property-owner.repository';
import { Transaction } from 'sequelize';

@Injectable()
export class PropertyOwnerService {
  constructor(
    private readonly propertyOwnerRepository: PropertyOwnerRepository,
  ) {}

  async assignOwners(propertyId: string, ownerIds: string[], transaction?: Transaction) {
    const data = ownerIds.map((ownerId) => ({
      propertyId,
      ownerId,
    }));
    await this.propertyOwnerRepository.bulkCreate(data, transaction);
  }

  async assignSingleOwner(propertyId: string, ownerId: string, transaction?: Transaction) {
    const existing = await this.propertyOwnerRepository.findOneByPropertyAndOwner(propertyId, ownerId);

    if (existing) {
      if (existing.status !== 'active') {
        await this.propertyOwnerRepository.updateStatus(existing.id, 'active', transaction);
      }
      existing.status = 'active';
      return existing;
    }

    return await this.propertyOwnerRepository.create({
      propertyId,
      ownerId,
    }, transaction);
  }

  async removeSingleOwner(propertyId: string, ownerId: string, transaction?: Transaction) {
    const existing = await this.propertyOwnerRepository.findOneByPropertyAndOwner(propertyId, ownerId);

    if (!existing) {
      throw new NotFoundException('Relationship not found');
    }

    await this.propertyOwnerRepository.updateStatus(existing.id, 'inactive', transaction);
    existing.status = 'inactive';
    return existing;
  }

  async removeAllByPropertyId(propertyId: string, transaction?: Transaction) {
    await this.propertyOwnerRepository.deleteByPropertyId(propertyId, transaction);
  }
}
