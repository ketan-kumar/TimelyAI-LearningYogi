import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { OcrProvider } from '../enums/ocr-provider.enum';
import { OcrStatus } from '../enums/ocr-status.enum';
import { NormalizedTimetable } from '../interfaces/normalized-timetable.interface';

@Schema({ timestamps: true })
export class OcrJob {
  @Prop({ required: true })
  fileName!: string;

  @Prop({ required: true })
  fileType!: string;

  @Prop({ required: true })
  fileSize!: number;

  @Prop({ required: true })
  s3Key!: string;

  @Prop({ required: true })
  s3Url!: string;

  @Prop({
    type: String,
    enum: OcrStatus,
    default: OcrStatus.PENDING,
  })
  status!: OcrStatus;

  @Prop({
    type: String,
    enum: OcrProvider,
    required: false,
  })
  providerUsed?: OcrProvider;

  @Prop({ type: Map, of: Number, default: {} })
  providerScores!: Record<string, number>;

  @Prop({ type: Object })
  rawOcrResult?: unknown;

  @Prop({ type: Object })
  normalizedResult?: NormalizedTimetable;

  @Prop()
  failureReason?: string;
}

export type OcrJobDocument = OcrJob & Document;

export const OcrJobSchema = SchemaFactory.createForClass(OcrJob);

