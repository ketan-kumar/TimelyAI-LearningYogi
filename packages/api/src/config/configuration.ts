export default () => ({
  app: {
    port: parseInt(process.env.PORT ?? '3000', 10),
  },
  database: {
    uri: process.env.MONGODB_URI ?? 'mongodb://localhost:27017/learningyogi',
  },
  aws: {
    region: process.env.AWS_REGION,
    bucket: process.env.AWS_S3_BUCKET,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
  ocr: {
    threshold: parseFloat(process.env.OCR_CONFIDENCE_THRESHOLD ?? '0.85'),
    deepseek: {
      baseUrl: process.env.DEEPSEEK_OCR_BASE_URL ?? 'https://api.deepseek.com/v1',
      apiKey: process.env.DEEPSEEK_OCR_API_KEY,
      model: process.env.DEEPSEEK_OCR_MODEL ?? 'deepseek-chat',
    },
    paddle: {
      endpoint: process.env.PADDLE_OCR_URL ?? 'http://localhost:9999/ocr',
    },
    googleVision: {
      endpoint: process.env.GOOGLE_VISION_URL,
      apiKey: process.env.GOOGLE_VISION_API_KEY,
    },
    llm: {
      endpoint: process.env.LLM_REASONING_URL ?? 'http://localhost:11434/api/generate',
      model: process.env.LLM_REASONING_MODEL ?? 'deepseek-r1',
    },
  },
});

