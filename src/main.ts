import { NestFactory } from '@nestjs/core';
import {
  NestFastifyApplication,
  FastifyAdapter,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ClusterService } from './cluster.service';
import cors from '@fastify/cors';
import compression from '@fastify/compress';
import * as dotenv from 'dotenv';
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    { logger: false },
  );

  await app.register(cors, {
    credentials: false,
    origin: '*',
  });

  await app.register(compression, { encodings: ['gzip', 'deflate'] });

  app.useGlobalPipes(
    new ValidationPipe({
      disableErrorMessages: true,
      forbidNonWhitelisted: false,
      whitelist: true,
    }),
  );

  await app.listen(3000, '0.0.0.0');
  console.log(`NestJS (${process.pid}) is running on:`, 3000);
}

ClusterService.start(bootstrap);
