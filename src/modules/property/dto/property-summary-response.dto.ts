import { Expose } from 'class-transformer';

export class PropertySummaryResponseDto {
  @Expose()
  id: string;

  @Expose()
  title: string;

  @Expose()
  description: string;

  @Expose()
  price: number;

  @Expose()
  currency: string;

  @Expose()
  address: string;

  @Expose()
  status: string;

  @Expose()
  latitud: number;

  @Expose()
  longitud: number;

  @Expose()
  createdAt: Date;

  @Expose()
  zone: string;

  @Expose()
  categories: string[];

  @Expose()
  comforts: string[];

  @Expose()
  mainImage: string;

  constructor(partial: any) {
    this.id = partial.id;
    this.title = partial.title;
    this.description = partial.description;
    this.price = partial.price;
    this.currency = partial.currency;
    this.address = partial.address;
    this.status = partial.status;
    this.latitud = partial.latitud;
    this.longitud = partial.longitud;
    this.createdAt = partial.createdAt;

    // Transformaciones personalizadas
    if (partial.zone) {
      this.zone = partial.zone.title;
    }

    if (partial.categories) {
      this.categories = partial.categories.map((c: any) => c.name);
    }

    if (partial.comforts) {
      this.comforts = partial.comforts.map((c: any) => c.name);
    }

    if (partial.images && partial.images.length > 0) {
      const main = partial.images.find((img: any) => img.priority === 0) || partial.images[0];
      this.mainImage = main.url;
    } else {
      this.mainImage = '';
    }
  }
}
