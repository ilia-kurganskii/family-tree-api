import { Module } from '@nestjs/common';
import winston from 'winston';
import { CLS_NAMESPACE, WINSTON_LOGGER } from './logger.const';
import { WinstonLoggerService } from './winston-logger/winston-logger.service';
import cls from 'cls-hooked';

@Module({
  imports: [],
  providers: [
    {
      provide: CLS_NAMESPACE,
      useValue: cls.createNamespace('app'),
    },
    {
      provide: WINSTON_LOGGER,
      useValue: winston.createLogger({
        level: 'info',
        format: winston.format.combine(
          winston.format.timestamp(),
          winston.format.json()
        ),
        defaultMeta: { service: 'family-tree-api' },
        transports: [new winston.transports.Console()],
      }),
    },
    WinstonLoggerService,
  ],
  exports: [WinstonLoggerService, WINSTON_LOGGER, CLS_NAMESPACE],
})
export class LoggerModule {}
