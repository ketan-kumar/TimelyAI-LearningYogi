import { OcrStatus } from '../../ocr/enums/ocr-status.enum';
import { OcrProvider } from '../../ocr/enums/ocr-provider.enum';
import { NormalizedTimetable } from '../../ocr/interfaces/normalized-timetable.interface';

export class UploadResponseDto {
  jobId!: string;
  fileName!: string;
  fileType!: string;
  fileSize!: number;
  s3Url!: string;
  status!: OcrStatus;
  providerUsed?: OcrProvider;
  providerScores?: Record<string, number>;
  normalizedResult?: NormalizedTimetable;
  timetableDocId?: string;
}

