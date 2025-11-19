import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TimetableDoc, TimetableDocDocument } from '../ocr/schemas/timetable-doc.schema';
import { TimetableDocDto } from './dto/timetable-doc.dto';

@Injectable()
export class TimetableService {
  constructor(
    @InjectModel(TimetableDoc.name) private readonly timetableDocModel: Model<TimetableDocDocument>,
  ) {}

  async getTimetableById(id: string): Promise<TimetableDocDto> {
    const doc = await this.timetableDocModel.findById(id).lean();
    if (!doc) {
      throw new NotFoundException(`Timetable document with ID ${id} not found`);
    }
    return {
      ...doc,
      _id: doc._id.toString(),
    } as TimetableDocDto;
  }

  async getTimetablesByTeacher(teacherId?: string): Promise<TimetableDocDto[]> {
    const query = teacherId ? { teacherId } : {};
    const docs = await this.timetableDocModel.find(query).sort({ createdAt: -1 }).lean();
    return docs.map((doc) => ({
      ...doc,
      _id: doc._id.toString(),
    })) as TimetableDocDto[];
  }

  async deleteTimetable(id: string): Promise<void> {
    const result = await this.timetableDocModel.findByIdAndDelete(id);
    if (!result) {
      throw new NotFoundException(`Timetable document with ID ${id} not found`);
    }
  }
}

