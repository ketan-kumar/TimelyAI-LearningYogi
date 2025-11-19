export interface TimetableBlock {
  startTime: string;
  endTime: string;
  subject: string;
  notes?: string;
  room?: string;
  source?: {
    provider: string;
    cellId?: string;
    confidence?: number;
  };
}

export interface TimetableDay {
  day: string;
  blocks: TimetableBlock[];
}

export interface TimetableDoc {
  _id: string;
  teacherId: string;
  weekLabel?: string;
  days: TimetableDay[];
  sourceUploadId: string;
  createdAt: string;
  updatedAt: string;
}

