import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as process from 'process';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // adding cors
  const allowedOrigins =
    process.env.NODE_ENV === 'production'
      ? ['https://kfrontend-production.up.railway.app/']
      : ['http://localhost:3000'];

  app.enableCors({
    origin: allowedOrigins,
    methods: 'GET, POST, PUT, DELETE',
    allowedHeaders: 'Content-Type, Accept',
    credentials: true,
  });
  await app.listen(process.env.PORT || 8000);
}
bootstrap();
