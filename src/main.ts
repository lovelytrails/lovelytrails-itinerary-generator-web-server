// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';
// import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
// import { AllExceptionsFilter } from './common/filters/http-exception.filter';
// import { ExpressAdapter } from '@nestjs/platform-express';
// import * as express from 'express';

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule, {
//     cors: {
//       origin: '*', // ✅ Allow all origins (or specify your frontend domain)
//       // origin: ['https://lovelytrails.com', 'https://app.lovelytrails.com']
//       credentials: true,
//     },
//   });
//   app.useGlobalInterceptors(new LoggingInterceptor());
//   app.useGlobalFilters(new AllExceptionsFilter());
//   await app.listen(3000);
// }
// bootstrap();

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
  console.log('Allowed CORS origins:', allowedOrigins);
  
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server), {
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

// ✅ Export the Express server for Vercel
export default server;
