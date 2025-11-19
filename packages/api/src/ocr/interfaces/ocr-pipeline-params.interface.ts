export interface OcrPipelineParams {
  jobId: string;
  fileBuffer: Buffer;
  fileMimeType: string;
  fileName: string;
  teacherId?: string;
}

