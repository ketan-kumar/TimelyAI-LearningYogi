import { TimetableBlock, TimetableDay } from '../../ocr/schemas/timetable-doc.schema';

export class TimetableDocDto {
  _id!: string;
  teacherId!: string;
  weekLabel?: string;
  days!: TimetableDay[];
  sourceUploadId!: string;
  createdAt!: Date;
  updatedAt!: Date;
}

export class TimetableDayDto {
  day!: string;
  blocks!: TimetableBlockDto[];
}

export class TimetableBlockDto {
  startTime!: string;
  endTime!: string;
  subject!: string;
  notes?: string;
  room?: string;
  source?: {
    provider: string;
    cellId?: string;
    confidence?: number;
  };
}

