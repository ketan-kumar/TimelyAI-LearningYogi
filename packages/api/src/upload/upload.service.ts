import { Injectable, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { StorageService } from '../storage/storage.service';
import { UploadedFileMetadata } from '../storage/interfaces/uploaded-file-metadata.interface';
import { OcrJob, OcrJobDocument } from '../ocr/schemas/ocr-job.schema';
import { OcrPipelineService } from '../ocr/services/ocr-pipeline.service';
import { OcrStatus } from '../ocr/enums/ocr-status.enum';
import { UploadResponseDto } from './dto/upload-response.dto';

const SUPPORTED_MIME_TYPES = new Set([
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'image/png',
  'image/jpeg',
  'image/jpg',
  'image/webp',
  'image/heic',
]);

@Injectable()
export class UploadService {
  constructor(
    private readonly storageService: StorageService,
    private readonly ocrPipelineService: OcrPipelineService,
    @InjectModel(OcrJob.name) private readonly ocrJobModel: Model<OcrJobDocument>,
  ) {}

  async handleUpload(file?: Express.Multer.File, teacherId?: string): Promise<UploadResponseDto> {
    if (!file) {
      throw new BadRequestException('File is required');
    }

    if (!SUPPORTED_MIME_TYPES.has(file.mimetype)) {
      throw new BadRequestException('Unsupported file type');
    }

    const uploadedMetadata = await this.storageService.uploadFile(file);
    const job = await this.createJobRecord(file, uploadedMetadata);

    try {
      const pipelineResult = await this.ocrPipelineService.runPipeline({
        jobId: job._id.toString(),
        fileBuffer: file.buffer,
        fileMimeType: file.mimetype,
        fileName: file.originalname,
        teacherId,
      });

      return {
        jobId: job._id.toString(),
        fileName: job.fileName,
        fileType: job.fileType,
        fileSize: job.fileSize,
        s3Url: job.s3Url,
        status: OcrStatus.COMPLETED,
        providerUsed: pipelineResult.provider,
        providerScores: pipelineResult.providerScores,
        normalizedResult: pipelineResult.normalized,
        timetableDocId: pipelineResult.timetableDocId,
      };
    } catch (error) {
      await this.ocrJobModel.findByIdAndUpdate(job._id, {
        status: OcrStatus.FAILED,
        failureReason: (error as Error).message,
      });
      throw new InternalServerErrorException('Failed to process OCR pipeline');
    }
  }

  private async createJobRecord(
    file: Express.Multer.File,
    uploadedMetadata: UploadedFileMetadata,
  ): Promise<OcrJobDocument> {
    return this.ocrJobModel.create({
      fileName: file.originalname,
      fileType: file.mimetype,
      fileSize: file.size,
      s3Key: uploadedMetadata.key,
      s3Url: uploadedMetadata.url,
      status: OcrStatus.PENDING,
    });
  }
}

