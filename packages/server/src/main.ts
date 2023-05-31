import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

// Save refresh tokens to the database

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Validation
  app.useGlobalPipes(new ValidationPipe());

  // Cookies
  app.use(cookieParser(process.env.COOKIE_SECRET));

  // Swagger
  const config = new DocumentBuilder()
    .setTitle('Клавиша')
    .setVersion('1.0')
    .addCookieAuth('accessToken', {
      in: 'cookie',
      type: 'apiKey',
      name: 'accessToken',
    })
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(process.env.PORT || 5000);
}
bootstrap();
