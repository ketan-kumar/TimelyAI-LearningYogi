export const TIME_SLOTS = [
  '08:00',
  '08:30',
  '09:00',
  '09:30',
  '10:00',
  '10:30',
  '11:00',
  '11:30',
  '12:00',
  '13:00',
  '13:30',
  '14:00',
  '14:30',
  '15:00',
];

export const DAYS_OF_WEEK = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

export function parseTime(time: string): number {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
}

export function formatTime(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
}

export function getTimeSlotIndex(time: string): number {
  return TIME_SLOTS.findIndex((slot) => slot === time);
}

export function getBlockDuration(startTime: string, endTime: string): number {
  const start = parseTime(startTime);
  const end = parseTime(endTime);
  return end - start;
}

export function getBlockPosition(startTime: string): number {
  const start = parseTime(startTime);
  const firstSlot = parseTime(TIME_SLOTS[0]);
  return start - firstSlot;
}

