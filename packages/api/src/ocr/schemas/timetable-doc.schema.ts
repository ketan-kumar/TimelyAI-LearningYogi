import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ _id: false })
export class TimetableBlock {
  @Prop({ required: true })
  startTime!: string; // "09:00"

  @Prop({ required: true })
  endTime!: string; // "09:40"

  @Prop({ required: true })
  subject!: string;

  @Prop()
  notes?: string;

  @Prop()
  room?: string;

  @Prop({ type: Object })
  source?: {
    provider: string;
    cellId?: string;
    confidence?: number;
  };
}

export const TimetableBlockSchema = SchemaFactory.createForClass(TimetableBlock);

@Schema({ _id: false })
export class TimetableDay {
  @Prop({ required: true })
  day!: string; // "Monday"

  @Prop({ type: [TimetableBlockSchema], default: [] })
  blocks!: TimetableBlock[];
}

export const TimetableDaySchema = SchemaFactory.createForClass(TimetableDay);

@Schema({ timestamps: true })
export class TimetableDoc {
  @Prop({ required: true, index: true })
  teacherId!: string;

  @Prop()
  weekLabel?: string;

  @Prop({ type: [TimetableDaySchema], default: [] })
  days!: TimetableDay[];

  @Prop({ required: true, index: true })
  sourceUploadId!: string; // References OcrJob._id

  @Prop({ type: Date, default: Date.now })
  createdAt!: Date;

  @Prop({ type: Date, default: Date.now })
  updatedAt!: Date;
}

export type TimetableDocDocument = TimetableDoc & Document;

export const TimetableDocSchema = SchemaFactory.createForClass(TimetableDoc);

