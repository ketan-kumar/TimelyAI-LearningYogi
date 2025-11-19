export interface TimetableEntry {
  subject: string;
  startTime: string;
  endTime: string;
  instructor?: string;
  location?: string;
  notes?: string;
}

export interface TimetableDay {
  day: string;
  entries: TimetableEntry[];
}

export interface NormalizedTimetable {
  institution?: string;
  timezone?: string;
  timetableDateRange?: string;
  notes?: string;
  days: TimetableDay[];
}

