// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import { AllExceptionsFilter } from './common/filters/http-exception.filter';

async function bootstrap() {
  const allowedOrigins = process.env.CORS_ORIGIN?.split(',') || ['*'];
  console.log('Allowed CORS origins:', allowedOrigins);
  
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: allowedOrigins,
      credentials: true,
    },
  });

  app.useGlobalInterceptors(new LoggingInterceptor());
  app.useGlobalFilters(new AllExceptionsFilter());
  await app.init(); // ✅ Don't call listen() — Vercel handles that

  if (process.env.NODE_ENV !== 'production') {
    app.listen(3000);
  }
}

bootstrap();
