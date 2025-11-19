import { useState, useEffect } from 'react';
import { timetableApi } from '../services/api';
import type { TimetableDoc } from '../types/timetable';

export function useTimetable(id?: string) {
  const [timetable, setTimetable] = useState<TimetableDoc | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    const fetchTimetable = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await timetableApi.getById(id);
        setTimetable(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load timetable');
      } finally {
        setLoading(false);
      }
    };

    fetchTimetable();
  }, [id]);

  return { timetable, loading, error };
}

export function useTimetables(teacherId?: string) {
  const [timetables, setTimetables] = useState<TimetableDoc[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTimetables = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await timetableApi.getAll(teacherId);
      setTimetables(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load timetables');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTimetables();
  }, [teacherId]);

  return { timetables, loading, error, refetch: fetchTimetables };
}

