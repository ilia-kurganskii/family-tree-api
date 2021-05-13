import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';

import {
  ConfigurationVariables,
  CorsConfig,
  NestConfig,
  SwaggerConfig,
} from '@config/configuration.model';
import { WinstonLoggerService } from '@features/common/services/logger/winston-logger/winston-logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useLogger(app.get(WinstonLoggerService));

  // Validation
  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());
  const configService: ConfigService<ConfigurationVariables> = app.get(
    ConfigService
  );
  const nestConfig = configService.get<NestConfig>('nest');
  const corsConfig = configService.get<CorsConfig>('cors');
  const swaggerConfig = configService.get<SwaggerConfig>('swagger');

  // Swagger Api
  if (swaggerConfig.enabled) {
    const options = new DocumentBuilder()
      .setTitle(swaggerConfig.title)
      .setDescription(swaggerConfig.description)
      .setVersion(swaggerConfig.version)
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, options);

    SwaggerModule.setup(swaggerConfig.path, app, document);
  }

  // Cors
  if (corsConfig.enabled) {
    app.enableCors({
      credentials: true,
      origin: ['localhost', '127.0.0,1'],
    });
  }

  await app.listen(nestConfig.port);
}
bootstrap();
