import { BadRequestException } from '@nestjs/common';
import { Model } from 'mongoose';
import { UploadService } from './upload.service';
import { StorageService } from '../storage/storage.service';
import { OcrPipelineService } from '../ocr/services/ocr-pipeline.service';
import { OcrJob, OcrJobDocument } from '../ocr/schemas/ocr-job.schema';

describe('UploadService', () => {
  const storageService = {
    uploadFile: jest.fn(),
  } as unknown as StorageService;

  const ocrPipelineService = {
    runPipeline: jest.fn(),
  } as unknown as OcrPipelineService;

  const ocrJobModel = {
    create: jest.fn(),
    findByIdAndUpdate: jest.fn(),
  } as unknown as Model<OcrJobDocument>;

  const service = new UploadService(storageService, ocrPipelineService, ocrJobModel);

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should throw when no file provided', async () => {
    await expect(service.handleUpload(undefined)).rejects.toBeInstanceOf(BadRequestException);
  });

  it('should reject unsupported mime types', async () => {
    const fakeFile = {
      originalname: 'schedule.txt',
      mimetype: 'text/plain',
    } as Express.Multer.File;

    await expect(service.handleUpload(fakeFile)).rejects.toBeInstanceOf(BadRequestException);
  });
});

