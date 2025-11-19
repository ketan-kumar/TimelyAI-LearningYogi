import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NormalizedTimetable } from '../interfaces/normalized-timetable.interface';

export interface TimetableDocData {
  weekLabel?: string;
  days: Array<{
    day: string;
    blocks: Array<{
      startTime: string;
      endTime: string;
      subject: string;
      notes?: string;
      room?: string;
    }>;
  }>;
}

@Injectable()
export class LlmReasoningClient {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async normalizeTimetable(rawText: string): Promise<TimetableDocData> {
    const endpoint = this.configService.getOrThrow<string>('ocr.llm.endpoint');
    const model = this.configService.getOrThrow<string>('ocr.llm.model');

    const prompt = [
      'You are a meticulous assistant that extracts structured timetable information from OCR text.',
      'Return a compact JSON object matching this schema:',
      '{ "weekLabel": string, "days": [ { "day": string (e.g., "Monday"), "blocks": [ { "startTime": "HH:MM", "endTime": "HH:MM", "subject": string, "notes": string, "room": string } ] } ] }',
      'Ensure times are 24h format (e.g., "09:00", "14:30"). Extract weekLabel from headers if present (e.g., "Oct 2025 < Autumn 1 | Week 4 >").',
      'Map day names to full names (Mon -> Monday, Tues -> Tuesday, etc.).',
      'If data is missing use null or omit fields. Only output JSON, no markdown.',
      `OCR Text:\n${rawText}`,
    ].join('\n\n');

    const response = await this.httpService.axiosRef.post(
      endpoint,
      {
        model,
        prompt,
        stream: false,
      },
      { timeout: 120_000 },
    );

    const jsonPayload = this.extractJson(response.data?.response ?? response.data);
    return JSON.parse(jsonPayload) as TimetableDocData;
  }

  private extractJson(candidate: unknown): string {
    if (typeof candidate === 'string') {
      const firstBrace = candidate.indexOf('{');
      const lastBrace = candidate.lastIndexOf('}');
      if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
        return candidate.slice(firstBrace, lastBrace + 1);
      }
      return candidate;
    }
    return JSON.stringify(candidate);
  }
}

