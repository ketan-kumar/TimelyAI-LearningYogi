import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TimetableController } from './timetable.controller';
import { TimetableService } from './timetable.service';
import { TimetableDoc, TimetableDocSchema } from '../ocr/schemas/timetable-doc.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: TimetableDoc.name, schema: TimetableDocSchema }])],
  controllers: [TimetableController],
  providers: [TimetableService],
  exports: [TimetableService],
})
export class TimetableModule {}

