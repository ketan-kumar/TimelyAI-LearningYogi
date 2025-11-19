import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosError } from 'axios';
import { OcrProvider } from '../enums/ocr-provider.enum';
import { OcrClientResult } from '../interfaces/ocr-client-result.interface';

@Injectable()
export class GoogleVisionClient {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async extractText(fileBuffer: Buffer, mimeType: string): Promise<OcrClientResult> {
    try {
      const endpoint = this.configService.getOrThrow<string>('ocr.googleVision.endpoint');
      const apiKey = this.configService.getOrThrow<string>('ocr.googleVision.apiKey');
      const response = await this.httpService.axiosRef.post(
        `${endpoint}?key=${apiKey}`,
        {
          requests: [
            {
              image: {
                content: fileBuffer.toString('base64'),
              },
              features: [{ type: 'DOCUMENT_TEXT_DETECTION' }],
            },
          ],
        },
        { timeout: 90_000 },
      );

      const annotation = response.data?.responses?.[0]?.fullTextAnnotation;

      return {
        provider: OcrProvider.GOOGLE_VISION,
        text: annotation?.text ?? '',
        confidence: annotation?.confidence ?? 0,
        raw: response.data,
      };
    } catch (error) {
      const axiosError = error as AxiosError;
      throw new Error(
        `Google Vision OCR failed: ${axiosError.response?.status} ${axiosError.response?.statusText ?? axiosError.message}`,
      );
    }
  }
}

