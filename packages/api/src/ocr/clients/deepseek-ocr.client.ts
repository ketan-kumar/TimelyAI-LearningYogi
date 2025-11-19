import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';
import { OcrProvider } from '../enums/ocr-provider.enum';
import { OcrClientResult } from '../interfaces/ocr-client-result.interface';

@Injectable()
export class DeepseekOcrClient {
  private readonly client: OpenAI;
  private readonly model: string;

  constructor(private readonly configService: ConfigService) {
    this.client = new OpenAI({
      apiKey: this.configService.getOrThrow<string>('ocr.deepseek.apiKey'),
      baseURL: this.configService.get<string>('ocr.deepseek.baseUrl') ?? 'https://api.deepseek.com',
    });
    this.model = this.configService.get<string>('ocr.deepseek.model') ?? 'deepseek-chat';
  }

  // async extractText(fileBuffer: Buffer, mimeType: string): Promise<OcrClientResult> {
  //   try {
  //     const prompt = [
  //       'You are a highly accurate OCR engine specialized in school timetables.',
  //       'Return only the plain text you read in natural reading order, no commentary.',
  //     ].join(' ');

  //     const response = await this.client.responses.create({
  //       model: this.model,
  //       input: [
  //         {
  //           role: 'user',
  //           content: [
  //             { type: 'input_text', text: prompt },
  //             {
  //               type: 'input_image',
  //               image_url: `data:${mimeType};base64,${fileBuffer.toString('base64')}`,
  //               detail: 'auto',
  //             },
  //           ],
  //         },
  //       ],
  //     });

  //     const text = this.extractTextFromResponse(response);
  //     const confidence = text.length > 0 ? 0.92 : 0;

  //     return {
  //       provider: OcrProvider.DEEPSEEK,
  //       text,
  //       confidence,
  //       raw: response,
  //     };
  //   } catch (error) {
  //     console.log('deepseek ocr failed', error);
  //     throw new Error(`Deepseek OCR failed: ${(error as Error).message}`);
  //   }
  // }

  async extractText(fileBuffer: Buffer, mimeType: string): Promise<OcrClientResult> {
    try {
      const base64 = fileBuffer.toString("base64");
  
      const prompt = `
  You are an OCR engine. Extract ALL readable text from the image below.
  Return only plain text with no commentary.
  
  IMAGE (base64, mime=${mimeType}):
  ${base64}
  `;
  
      const response = await this.client.chat.completions.create({
        model: this.model, // deepseek-chat or deepseek-vision
        messages: [
          { role: "user", content: prompt },
        ]
      });
  
      const text = response.choices?.[0]?.message?.content?.trim() ?? "";
  
      return {
        provider: OcrProvider.DEEPSEEK,
        text,
        confidence: text ? 0.85 : 0,
        raw: response,
      };
    } catch (error) {
      console.error("DeepSeek OCR failed", error);
      throw new Error(`DeepSeek OCR failed: ${(error as Error).message}`);
    }
  }
  
  
  private extractTextFromResponse(response: any): string {
    if (!response) {
      return '';
    }

    if (Array.isArray(response.output_text) && response.output_text.length > 0) {
      return response.output_text.join('\n').trim();
    }

    const segments =
      response.output
        ?.flatMap((item: any) => item.content ?? [])
        ?.filter((content: any) => content?.type === 'output_text')
        ?.map((content: any) => content.text ?? '') ?? [];

    return segments.join('\n').trim();
  }
}

