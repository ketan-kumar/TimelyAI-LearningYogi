import { OcrProvider } from '../enums/ocr-provider.enum';

export interface OcrClientResult {
  provider: OcrProvider;
  text: string;
  confidence: number;
  raw: unknown;
}

