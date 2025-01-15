import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as process from 'process';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // adding cors
  app.enableCors({
    origin: 'http://localhost:3000', // Allow only localhost:3000
    methods: 'GET, POST, PUT, DELETE', // Specify allowed methods
    allowedHeaders: 'Content-Type, Accept', // Specify allowed headers
  });
  await app.listen(process.env.PORT || 8000);
}
bootstrap();
