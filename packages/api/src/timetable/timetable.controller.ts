import { Controller, Get, Delete, Query, Param } from '@nestjs/common';
import { TimetableService } from './timetable.service';
import { TimetableDocDto } from './dto/timetable-doc.dto';

@Controller('timetables')
export class TimetableController {
  constructor(private readonly timetableService: TimetableService) {}

  @Get()
  getTimetables(@Query('teacherId') teacherId?: string): Promise<TimetableDocDto[]> {
    return this.timetableService.getTimetablesByTeacher(teacherId);
  }

  @Get(':id')
  getTimetable(@Param('id') id: string): Promise<TimetableDocDto> {
    return this.timetableService.getTimetableById(id);
  }

  @Delete(':id')
  deleteTimetable(@Param('id') id: string): Promise<void> {
    return this.timetableService.deleteTimetable(id);
  }
}

