// Dummy data to mimic the way how we're going to store the timetable information
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { Model } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';
import { TimetableDoc, TimetableDocDocument } from '../ocr/schemas/timetable-doc.schema';

async function seed() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const timetableModel = app.get<Model<TimetableDocDocument>>(getModelToken(TimetableDoc.name));

  const dummyTimetable: Partial<TimetableDoc> = {
    teacherId: 'teacher-123',
    weekLabel: 'Oct 2025 < Autumn 1 | Week 4 >',
    days: [
      {
        day: 'Monday',
        blocks: [
          {
            startTime: '08:30',
            endTime: '09:00',
            subject: 'Registration and Early Morning Work',
            notes: '15 min',
          },
          {
            startTime: '09:00',
            endTime: '09:30',
            subject: 'RWI',
            notes: '30 min',
            source: {
              provider: 'deepseek',
              confidence: 0.92,
            },
          },
          {
            startTime: '09:30',
            endTime: '10:00',
            subject: 'Maths',
            notes: '3 timestable',
            source: {
              provider: 'deepseek',
              confidence: 0.91,
            },
          },
          {
            startTime: '10:00',
            endTime: '10:30',
            subject: 'Assembly',
            source: {
              provider: 'deepseek',
              confidence: 0.89,
            },
          },
          {
            startTime: '10:30',
            endTime: '10:45',
            subject: 'Tea Break',
            notes: '15 min',
          },
          {
            startTime: '11:00',
            endTime: '12:00',
            subject: 'English',
            notes: 'Ye Olde English',
            source: {
              provider: 'deepseek',
              confidence: 0.93,
            },
          },
          {
            startTime: '12:00',
            endTime: '13:00',
            subject: 'Lunch',
            notes: '1 hr',
          },
          {
            startTime: '13:00',
            endTime: '13:30',
            subject: 'Handwriting',
          },
          {
            startTime: '13:30',
            endTime: '14:30',
            subject: 'Computing',
            notes: 'Saving files',
            source: {
              provider: 'deepseek',
              confidence: 0.88,
            },
          },
          {
            startTime: '14:30',
            endTime: '15:15',
            subject: 'Art',
            notes: 'Primary Colours',
            source: {
              provider: 'deepseek',
              confidence: 0.90,
            },
          },
        ],
      },
      {
        day: 'Tuesday',
        blocks: [
          {
            startTime: '08:30',
            endTime: '09:00',
            subject: 'Registration and Early Morning Work',
            notes: '15 min',
          },
          {
            startTime: '09:00',
            endTime: '09:30',
            subject: 'RWI',
            notes: '30 min',
            source: {
              provider: 'deepseek',
              confidence: 0.92,
            },
          },
          {
            startTime: '09:30',
            endTime: '10:20',
            subject: 'Science',
            notes: 'Lifecycle of a butterfly',
            source: {
              provider: 'deepseek',
              confidence: 0.91,
            },
          },
          {
            startTime: '10:30',
            endTime: '11:25',
            subject: 'Music',
            source: {
              provider: 'deepseek',
              confidence: 0.87,
            },
          },
          {
            startTime: '11:30',
            endTime: '12:00',
            subject: 'PHSE',
            source: {
              provider: 'deepseek',
              confidence: 0.89,
            },
          },
          {
            startTime: '12:00',
            endTime: '13:00',
            subject: 'Lunch',
            notes: '1 hr',
          },
          {
            startTime: '13:00',
            endTime: '13:30',
            subject: 'Handwriting',
          },
          {
            startTime: '13:30',
            endTime: '14:45',
            subject: 'Maths',
            notes: 'Area of a rectangle',
            source: {
              provider: 'deepseek',
              confidence: 0.92,
            },
          },
          {
            startTime: '14:45',
            endTime: '15:15',
            subject: 'English',
            notes: 'Pronouns',
            source: {
              provider: 'deepseek',
              confidence: 0.90,
            },
          },
        ],
      },
      {
        day: 'Wednesday',
        blocks: [
          {
            startTime: '08:30',
            endTime: '09:00',
            subject: 'Registration and Early Morning Work',
            notes: '15 min',
          },
          {
            startTime: '09:00',
            endTime: '09:30',
            subject: 'RWI',
            notes: '30 min',
            source: {
              provider: 'deepseek',
              confidence: 0.92,
            },
          },
          {
            startTime: '09:30',
            endTime: '10:00',
            subject: 'Maths',
            notes: 'Basic shapes',
            source: {
              provider: 'deepseek',
              confidence: 0.91,
            },
          },
          {
            startTime: '10:00',
            endTime: '10:30',
            subject: 'Class Assembly',
            source: {
              provider: 'deepseek',
              confidence: 0.88,
            },
          },
          {
            startTime: '10:30',
            endTime: '11:55',
            subject: 'English Comprehension',
            notes: 'Contextual reading Jack and Jill',
            source: {
              provider: 'deepseek',
              confidence: 0.93,
            },
          },
          {
            startTime: '12:00',
            endTime: '13:00',
            subject: 'Lunch',
            notes: '1 hr',
          },
          {
            startTime: '13:00',
            endTime: '13:30',
            subject: 'Handwriting',
          },
          {
            startTime: '13:30',
            endTime: '14:45',
            subject: 'Maths',
            notes: 'Algebra',
            source: {
              provider: 'deepseek',
              confidence: 0.92,
            },
          },
          {
            startTime: '14:45',
            endTime: '15:15',
            subject: 'RE',
            notes: 'David and Goliath',
            source: {
              provider: 'deepseek',
              confidence: 0.89,
            },
          },
        ],
      },
      {
        day: 'Thursday',
        blocks: [
          {
            startTime: '08:30',
            endTime: '09:00',
            subject: 'Registration and Early Morning Work',
            notes: '15 min',
          },
          {
            startTime: '09:00',
            endTime: '09:30',
            subject: 'RWI',
            notes: '30 min',
            source: {
              provider: 'deepseek',
              confidence: 0.92,
            },
          },
          {
            startTime: '09:30',
            endTime: '10:00',
            subject: 'PE',
            source: {
              provider: 'deepseek',
              confidence: 0.90,
            },
          },
          {
            startTime: '10:00',
            endTime: '10:30',
            subject: 'Singing Assembly',
            source: {
              provider: 'deepseek',
              confidence: 0.87,
            },
          },
          {
            startTime: '10:30',
            endTime: '11:55',
            subject: 'PE',
            source: {
              provider: 'deepseek',
              confidence: 0.90,
            },
          },
          {
            startTime: '12:00',
            endTime: '13:00',
            subject: 'Lunch',
            notes: '1 hr',
          },
          {
            startTime: '13:00',
            endTime: '13:30',
            subject: 'Maths Meet',
            source: {
              provider: 'deepseek',
              confidence: 0.88,
            },
          },
          {
            startTime: '13:30',
            endTime: '14:00',
            subject: 'Maths',
            notes: 'Geometry',
            source: {
              provider: 'deepseek',
              confidence: 0.91,
            },
          },
          {
            startTime: '14:00',
            endTime: '15:00',
            subject: 'English',
            notes: 'Proper sentence structure',
            source: {
              provider: 'deepseek',
              confidence: 0.93,
            },
          },
        ],
      },
      {
        day: 'Friday',
        blocks: [
          {
            startTime: '08:30',
            endTime: '09:00',
            subject: 'Registration and Early Morning Work',
            notes: '15 min',
          },
          {
            startTime: '09:00',
            endTime: '09:45',
            subject: 'Celebration Assembly',
            source: {
              provider: 'deepseek',
              confidence: 0.89,
            },
          },
          {
            startTime: '09:45',
            endTime: '10:20',
            subject: 'RWI & Comp',
            source: {
              provider: 'deepseek',
              confidence: 0.91,
            },
          },
          {
            startTime: '10:30',
            endTime: '11:55',
            subject: 'History',
            notes: 'The Boer Wars',
            source: {
              provider: 'deepseek',
              confidence: 0.92,
            },
          },
          {
            startTime: '12:00',
            endTime: '13:00',
            subject: 'Lunch',
            notes: '1 hr',
          },
          {
            startTime: '13:00',
            endTime: '13:45',
            subject: 'English',
            notes: 'Communication skills',
            source: {
              provider: 'deepseek',
              confidence: 0.90,
            },
          },
          {
            startTime: '13:45',
            endTime: '14:15',
            subject: 'Catch Up',
            source: {
              provider: 'deepseek',
              confidence: 0.87,
            },
          },
          {
            startTime: '14:15',
            endTime: '14:45',
            subject: 'Times Tables Rockstar',
            source: {
              provider: 'deepseek',
              confidence: 0.91,
            },
          },
        ],
      },
    ],
    sourceUploadId: 'dummy-ocr-job-id',
  };

  try {
    const result = await timetableModel.create(dummyTimetable);
    console.log('✅ Dummy timetable data inserted successfully!');
    console.log('📄 Document ID:', result._id.toString());
    console.log('👤 Teacher ID:', result.teacherId);
    console.log('📅 Week Label:', result.weekLabel);
    console.log('📊 Total Days:', result.days.length);
    console.log('📝 Total Blocks:', result.days.reduce((sum, day) => sum + day.blocks.length, 0));
    console.log('\n📋 Sample Day (Monday):');
    console.log(JSON.stringify(result.days[0], null, 2));
  } catch (error) {
    console.error('❌ Error inserting dummy data:', error);
  } finally {
    await app.close();
  }
}

seed().catch(console.error);

