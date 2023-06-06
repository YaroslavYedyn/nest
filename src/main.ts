import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import * as session from 'express-session';
import * as passport from 'passport';
import { AppModule } from './app.module';

import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // const configService = app.get(ConfigService);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  // session
  app.use(
    session({
      secret: process.env.JWT_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: Number(process.env.COOKIE_SESSION_EXPIRATION_TIME),
        httpOnly: true,
        sameSite: true,
        secure: process.env.NODE_ENV === 'production',
      },
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());

  const config = new DocumentBuilder()
    .setTitle('Median')
    .setDescription('The Median API description')
    .setVersion('0.1')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}

bootstrap();
