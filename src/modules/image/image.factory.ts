import { Injectable } from '@nestjs/common';
import { CloudinaryProvider } from './providers/cloudinary.provider';
import { IStorageProvider } from './providers/storage-provider.interface';

@Injectable()
export class StorageFactory {
  constructor(
    private readonly cloudinaryProvider: CloudinaryProvider,
    // Aquí puedes inyectar otros proveedores: private readonly s3Provider: S3Provider
  ) { }

  /**
   * Retorna un proveedor basado en un tipo específico.
   * Esto permite cambiar de proveedor en tiempo de ejecución (Runtime).
   */
  getProvider(type: string = 'cloudinary'): IStorageProvider {
    switch (type.toLowerCase()) {
      case 'cloudinary':
        return this.cloudinaryProvider;
      // case 's3':
      //   return this.s3Provider;
      default:
        // Por defecto devolvemos Cloudinary o podrías lanzar un error
        return this.cloudinaryProvider;
    }
  }
}
