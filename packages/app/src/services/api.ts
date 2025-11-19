import axios from 'axios';
import type { TimetableDoc } from '../types/timetable';

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const timetableApi = {
  getAll: async (teacherId?: string): Promise<TimetableDoc[]> => {
    const params = teacherId ? { teacherId } : {};
    const response = await apiClient.get<TimetableDoc[]>('/timetables', { params });
    return response.data;
  },

  getById: async (id: string): Promise<TimetableDoc> => {
    const response = await apiClient.get<TimetableDoc>(`/timetables/${id}`);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/timetables/${id}`);
  },
};

export default apiClient;

