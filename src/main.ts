import { MainModule } from './main.module';
import { NestFactory } from '@nestjs/core';
import 'dotenv/config';
import { ValidationPipe } from '@nestjs/common';
import * as helmet from 'helmet';
import * as rateLimit from 'express-rate-limit';

const config = process.env;

async function bootstrap() {
  const app = await NestFactory.create(MainModule);
  app.useGlobalPipes(new ValidationPipe());
  app.use(helmet());
  app.enableCors();
  // Set the maximum JSON capacity to 10mb
  const bodyParser = require('body-parser');
  app.use(bodyParser.json({ extended: true, limit: '10mb' }));
  app.use(
    rateLimit({
      windowMs: 1 * 60 * 1000, // 1 minutes
      max: 1000, // limit each IP to 1000 requests per windowMs
    }),
  );

  await app.listen(config.PORT);
}
bootstrap();
