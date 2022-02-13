import { devFormat } from '@features/common/services/logger/format/dev.format';
import { productionFormat } from '@features/common/services/logger/format/production.format';
import { LoggerMiddleware } from '@features/common/services/logger/logger-middleware/logger.middleware';
import {
  CLS_NAMESPACE,
  WINSTON_LOGGER,
} from '@features/common/services/logger/logger.const';
import { WinstonLoggerService } from '@features/common/services/logger/winston-logger/winston-logger.service';
import { Module } from '@nestjs/common';
import cls from 'cls-hooked';
import winston from 'winston';

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
        format:
          process.env.NODE_ENV === 'production' ? productionFormat : devFormat,
        transports: [new winston.transports.Console()],
      }),
    },
    LoggerMiddleware,
    WinstonLoggerService,
  ],
  exports: [WinstonLoggerService, LoggerMiddleware, CLS_NAMESPACE],
})
export class CommonModule {}
