import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OcrProvider } from '../enums/ocr-provider.enum';
import { OcrStatus } from '../enums/ocr-status.enum';
import { OcrJob, OcrJobDocument } from '../schemas/ocr-job.schema';
import { TimetableDoc, TimetableDocDocument } from '../schemas/timetable-doc.schema';
import { OcrPipelineParams } from '../interfaces/ocr-pipeline-params.interface';
import { OcrClientResult } from '../interfaces/ocr-client-result.interface';
import { NormalizedTimetable } from '../interfaces/normalized-timetable.interface';
import { DeepseekOcrClient } from '../clients/deepseek-ocr.client';
import { PaddleOcrClient } from '../clients/paddle-ocr.client';
import { GoogleVisionClient } from '../clients/google-vision.client';
import { LlmReasoningClient, TimetableDocData } from '../clients/llm-reasoning.client';

interface PipelineResult {
  normalized: NormalizedTimetable;
  timetableDocId: string;
  provider: OcrProvider;
  providerScores: Record<string, number>;
  rawOcrResult: unknown;
}

@Injectable()
export class OcrPipelineService {
  private readonly logger = new Logger(OcrPipelineService.name);
  private readonly threshold: number;

  constructor(
    private readonly configService: ConfigService,
    @InjectModel(OcrJob.name) private readonly ocrJobModel: Model<OcrJobDocument>,
    @InjectModel(TimetableDoc.name) private readonly timetableDocModel: Model<TimetableDocDocument>,
    private readonly deepseekClient: DeepseekOcrClient,
    private readonly paddleClient: PaddleOcrClient,
    private readonly googleVisionClient: GoogleVisionClient,
    private readonly llmClient: LlmReasoningClient,
  ) {
    this.threshold = this.configService.get<number>('ocr.threshold', 0.85);
  }

  async runPipeline(params: OcrPipelineParams): Promise<PipelineResult> {
    await this.setJobStatus(params.jobId, OcrStatus.PROCESSING);
    const providerScores: Record<string, number> = {};

    const steps: Array<() => Promise<OcrClientResult>> = [
      () => this.deepseekClient.extractText(params.fileBuffer, params.fileMimeType),
      () => this.paddleClient.extractText(params.fileBuffer, params.fileMimeType),
      () => this.googleVisionClient.extractText(params.fileBuffer, params.fileMimeType),
    ];

    let winningResult: OcrClientResult | null = null;

    for (const step of steps) {
      try {
        const result = await step();
        providerScores[result.provider] = result.confidence;
        this.logger.log(`Provider ${result.provider} returned score ${result.confidence}`);

        if (!winningResult && result.confidence >= this.threshold && result.text.trim().length > 0) {
          winningResult = result;
          break;
        }
      } catch (error) {
        this.logger.warn(`OCR provider failed: ${(error as Error).message}`);
        continue;
      }
    }

    if (!winningResult) {
      await this.failJob(params.jobId, 'All OCR providers scored below threshold');
      throw new Error('All OCR providers scored below threshold');
    }

    const timetableData = await this.llmClient.normalizeTimetable(winningResult.text);

    // Transform TimetableDocData to NormalizedTimetable for backward compatibility
    const normalized: NormalizedTimetable = {
      timetableDateRange: timetableData.weekLabel,
      days: timetableData.days.map((d) => ({
        day: d.day,
        entries: d.blocks.map((b) => ({
          subject: b.subject,
          startTime: b.startTime,
          endTime: b.endTime,
          location: b.room,
          notes: b.notes,
        })),
      })),
    };

    // Save to TimetableDoc collection
    const timetableDoc = await this.timetableDocModel.create({
      teacherId: params.teacherId ?? 'default', // TODO: Get from auth context
      weekLabel: timetableData.weekLabel,
      days: timetableData.days.map((d) => ({
        day: d.day,
        blocks: d.blocks.map((b) => ({
          startTime: b.startTime,
          endTime: b.endTime,
          subject: b.subject,
          notes: b.notes,
          room: b.room,
          source: {
            provider: winningResult.provider,
            confidence: winningResult.confidence,
          },
        })),
      })),
      sourceUploadId: params.jobId,
    });

    await this.ocrJobModel.findByIdAndUpdate(params.jobId, {
      status: OcrStatus.COMPLETED,
      providerUsed: winningResult.provider,
      providerScores,
      rawOcrResult: winningResult.raw,
      normalizedResult: normalized,
    });

    return {
      normalized,
      timetableDocId: timetableDoc._id.toString(),
      provider: winningResult.provider,
      providerScores,
      rawOcrResult: winningResult.raw,
    };
  }

  private async setJobStatus(jobId: string, status: OcrStatus) {
    await this.ocrJobModel.findByIdAndUpdate(jobId, { status });
  }

  private async failJob(jobId: string, reason: string) {
    await this.ocrJobModel.findByIdAndUpdate(jobId, {
      status: OcrStatus.FAILED,
      failureReason: reason,
    });
  }
}

