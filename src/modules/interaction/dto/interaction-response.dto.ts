import { Expose } from 'class-transformer';

export class InteractionResponseDto {
  @Expose()
  id: string;

  @Expose()
  customerId: string;

  @Expose()
  action: string;

  @Expose()
  description: string;

  @Expose()
  view: string;

  @Expose()
  status: string;

  @Expose()
  createdAt: Date;

  constructor(partial: Partial<InteractionResponseDto>) {
    Object.assign(this, partial);
  }
}
