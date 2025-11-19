import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import configuration from './config/configuration';
import { validate } from './config/validation';
import { UploadModule } from './upload/upload.module';
import { OcrModule } from './ocr/ocr.module';
import { StorageModule } from './storage/storage.module';
import { TimetableModule } from './timetable/timetable.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      validate,
      cache: true,
      envFilePath: ['.env'],
    }),
    MongooseModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        uri: configService.getOrThrow<string>('database.uri'),
      }),
      inject: [ConfigService],
    }),
    StorageModule,
    OcrModule,
    UploadModule,
    TimetableModule,
  ],
})
export class AppModule {}

