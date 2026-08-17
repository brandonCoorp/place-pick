import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v2 as cloudinary } from 'cloudinary';
import { IStorageProvider, StorageUploadResponse } from './storage-provider.interface';
import { Readable } from 'stream';

@Injectable()
export class CloudinaryProvider implements IStorageProvider {
  constructor(private configService: ConfigService) {
    cloudinary.config({
      cloud_name: this.configService.get<string>('CLOUDINARY_CLOUD_NAME'),
      api_key: this.configService.get<string>('CLOUDINARY_API_KEY'),
      api_secret: this.configService.get<string>('CLOUDINARY_API_SECRET'),
    });
  }

  async uploadFile(file: Express.Multer.File): Promise<StorageUploadResponse> {
    return new Promise((resolve, reject) => {
      const upload = cloudinary.uploader.upload_stream((error, result) => {
        if (error || !result) {
          return reject(error || new Error('Cloudinary upload failed: No result received'));
        }
        resolve({
          url: result.secure_url,
          publicId: result.public_id,
        });
      });

      Readable.from(file.buffer).pipe(upload);
    });
  }

  async deleteFile(publicId: string): Promise<void> {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.destroy(publicId, (error, result) => {
        if (error || !result) {
          return reject(error || new Error('Cloudinary delete failed: No result received'));
        }
        resolve();
      });
    });
  }
}
