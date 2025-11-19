import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosError } from 'axios';
import { OcrProvider } from '../enums/ocr-provider.enum';
import { OcrClientResult } from '../interfaces/ocr-client-result.interface';

@Injectable()
export class PaddleOcrClient {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async extractText(fileBuffer: Buffer, mimeType: string): Promise<OcrClientResult> {
    const endpoint = this.configService.get<string>('ocr.paddle.endpoint');
    console.log('paddle ocr endpoint ------', endpoint);
    if (!endpoint) {
      throw new Error('Paddle OCR endpoint is not configured');
    }

    try {
      const response = await this.httpService.axiosRef.post(
        endpoint,
        {
          fileContentBase64: fileBuffer.toString('base64'),
          mimeType,
        },
        { timeout: 60_000 },
      );

      return {
        provider: OcrProvider.PADDLE,
        text: response.data?.text ?? '',
        confidence: response.data?.confidence ?? 0,
        raw: response.data,
      };
    } catch (error) {
      // console.log('paddle ocr failed', error);
      const axiosError = error as AxiosError;
      throw new Error(
        `Paddle OCR failed: ${axiosError.response?.status} ${axiosError.response?.statusText ?? axiosError.message}`,
      );
    }
  }
}

