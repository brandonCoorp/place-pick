export interface StorageUploadResponse {
  url: string;
  publicId: string;
}

export interface IStorageProvider {
  uploadFile(file: Express.Multer.File): Promise<StorageUploadResponse>;
  deleteFile(publicId: string): Promise<void>;
}
