import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3Client } from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';
import { randomUUID } from 'crypto';
import { UploadedFileMetadata } from './interfaces/uploaded-file-metadata.interface';

@Injectable()
export class StorageService {
  private readonly s3Client: S3Client;
  private readonly bucket: string;

  constructor(private readonly configService: ConfigService) {
    this.bucket = this.configService.getOrThrow<string>('aws.bucket');
    this.s3Client = new S3Client({
      region: this.configService.getOrThrow<string>('aws.region'),
      credentials: {
        accessKeyId: this.configService.getOrThrow<string>('aws.accessKeyId'),
        secretAccessKey: this.configService.getOrThrow<string>('aws.secretAccessKey'),
      },
    });
  }

  async uploadFile(file: Express.Multer.File): Promise<UploadedFileMetadata> {
    const key = this.generateKey(file.originalname);
    const upload = new Upload({
      client: this.s3Client,
      params: {
        Bucket: this.bucket,
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype,
      },
    });

    await upload.done();

    return {
      key,
      bucket: this.bucket,
      url: `https://${this.bucket}.s3.${this.configService.get<string>('aws.region')}.amazonaws.com/${key}`,
      size: file.size,
      contentType: file.mimetype,
    };
  }

  private generateKey(originalName: string): string {
    const sanitized = originalName.replace(/\s+/g, '_').toLowerCase();
    return `uploads/${new Date().getFullYear()}/${new Date().getMonth() + 1}/${randomUUID()}-${sanitized}`;
  }
}

