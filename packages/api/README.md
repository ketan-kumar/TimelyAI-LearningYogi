## LearningYogi Timetable OCR API

NestJS service that accepts timetable files (PDF, DOC, images), stores them on S3, and runs a multi-stage OCR pipeline (DeepSeek → PaddleOCR → Google Vision with DeepSeek-R1 reasoning) to output a normalized timetable schema.

### Prerequisites
- Node.js 18+
- npm 9+
- MongoDB instance
- AWS S3 bucket + IAM credentials
- DeepSeek OCR API key, Google Vision key, optional PaddleOCR endpoint, Ollama (or compatible) DeepSeek-R1 model

### Environment Variables
Create an `.env` file using the following template:
```
NODE_ENV=development
PORT=3000
MONGODB_URI=mongodb://localhost:27017/learningyogi
AWS_REGION=us-east-1
AWS_S3_BUCKET=learningyogi-timetables
AWS_ACCESS_KEY_ID=your-key
AWS_SECRET_ACCESS_KEY=your-secret
OCR_CONFIDENCE_THRESHOLD=0.85
DEEPSEEK_OCR_BASE_URL=https://api.deepseek.com/v1
DEEPSEEK_OCR_MODEL=deepseek-chat
DEEPSEEK_OCR_API_KEY=deepseek-key
PADDLE_OCR_URL=http://localhost:9999/ocr
GOOGLE_VISION_URL=https://vision.googleapis.com/v1/images:annotate
GOOGLE_VISION_API_KEY=google-key
LLM_REASONING_URL=http://localhost:11434/api/generate
LLM_REASONING_MODEL=deepseek-r1
```

### Install & Run
```bash
npm install
npm run start:dev
```

### Testing
```bash
npm test        # unit tests
npm run lint    # type-check
```

### Upload Endpoint
- `POST /api/upload`
- multipart/form-data with `file` (pdf/doc/docx/png/jpg/webp/heic)
- Response returns job metadata, provider, confidence scores, normalized timetable JSON.

