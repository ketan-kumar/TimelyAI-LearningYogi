import * as Joi from 'joi';

export const validationSchema = Joi.object({
  NODE_ENV: Joi.string().valid('development', 'production', 'test').default('development'),
  PORT: Joi.number().default(3000),
  MONGODB_URI: Joi.string().uri({ scheme: ['mongodb', 'mongodb+srv'] }).required(),
  AWS_REGION: Joi.string().required(),
  AWS_S3_BUCKET: Joi.string().required(),
  AWS_ACCESS_KEY_ID: Joi.string().required(),
  AWS_SECRET_ACCESS_KEY: Joi.string().required(),
  OCR_CONFIDENCE_THRESHOLD: Joi.number().min(0).max(1).default(0.85),
  DEEPSEEK_OCR_BASE_URL: Joi.string().uri().default('https://api.deepseek.com/v1'),
  DEEPSEEK_OCR_MODEL: Joi.string().default('deepseek-chat'),
  DEEPSEEK_OCR_API_KEY: Joi.string().required(),
  PADDLE_OCR_URL: Joi.string().uri(),
  GOOGLE_VISION_URL: Joi.string().uri().required(),
  GOOGLE_VISION_API_KEY: Joi.string().required(),
  LLM_REASONING_URL: Joi.string().uri(),
  LLM_REASONING_MODEL: Joi.string(),
}).unknown(true);

export function validate(config: Record<string, unknown>) {
  const { error, value } = validationSchema.validate(config, {
    abortEarly: false,
    allowUnknown: true,
  });

  if (error) {
    throw new Error(`Config validation error: ${error.message}`);
  }

  return value;
}

