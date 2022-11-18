import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SentryService } from '@ntegral/nestjs-sentry';

import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  app.useLogger(SentryService.SentryServiceInstance());
  await app.listen(3000);
}

bootstrap();
