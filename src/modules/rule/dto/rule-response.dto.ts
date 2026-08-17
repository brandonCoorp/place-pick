import { Expose } from 'class-transformer';

export class RuleResponseDto {
  @Expose()
  id!: string;

  @Expose()
  name! : string;

  @Expose()
  code!: string;

  @Expose()
  description!: string;

  constructor(partial: Partial<RuleResponseDto>) {
    Object.assign(this, partial);
  }
}
