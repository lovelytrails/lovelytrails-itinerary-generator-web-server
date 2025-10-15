// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import { AllExceptionsFilter } from './common/filters/http-exception.filter';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';

const server = express();

async function bootstrap() {
  const allowedOrigins = process.env.CORS_ORIGIN?.split(',') || ['*'];

  const app = await NestFactory.create(AppModule, new ExpressAdapter(server), {
    cors: {
      origin: allowedOrigins,
      credentials: true,
    },
  });

  app.useGlobalInterceptors(new LoggingInterceptor());
  app.useGlobalFilters(new AllExceptionsFilter());

  if (process.env.NODE_ENV !== 'production') {
    await app.listen(3000);
  } else {
    await app.init(); // ✅ Required for serverless
  }
}

bootstrap();

// ✅ Export for Vercel
export default server;
