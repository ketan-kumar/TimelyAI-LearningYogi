import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { OcrJob, OcrJobSchema } from './schemas/ocr-job.schema';
import { TimetableDoc, TimetableDocSchema } from './schemas/timetable-doc.schema';
import { OcrPipelineService } from './services/ocr-pipeline.service';
import { DeepseekOcrClient } from './clients/deepseek-ocr.client';
import { PaddleOcrClient } from './clients/paddle-ocr.client';
import { GoogleVisionClient } from './clients/google-vision.client';
import { LlmReasoningClient } from './clients/llm-reasoning.client';

@Module({
  imports: [
    ConfigModule,
    HttpModule.register({
      timeout: 120_000,
      maxRedirects: 5,
    }),
    MongooseModule.forFeature([
      { name: OcrJob.name, schema: OcrJobSchema },
      { name: TimetableDoc.name, schema: TimetableDocSchema },
    ]),
  ],
  providers: [OcrPipelineService, DeepseekOcrClient, PaddleOcrClient, GoogleVisionClient, LlmReasoningClient],
  exports: [OcrPipelineService, MongooseModule],
})
export class OcrModule {}

