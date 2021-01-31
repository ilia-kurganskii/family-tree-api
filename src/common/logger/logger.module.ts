import { Module } from '@nestjs/common';
import { TraceLoggerService } from './trace-logger/trace-logger.service';
import { LoggerContextService } from './logger-context/logger-context.service';
import winston from 'winston';
import { WINSTON_LOGGER } from './logger.const';
import { WinstonLoggerService } from './winston-logger/winston-logger.service';

@Module({
  imports: [],
  providers: [
    TraceLoggerService,
    {
      provide: WINSTON_LOGGER,
      useValue: winston.createLogger({
        level: 'info',
        format: winston.format.json(),
        defaultMeta: { service: 'presentify-api' },
        transports: [new winston.transports.Console()],
      }),
    },
    WinstonLoggerService,
    LoggerContextService,
  ],
  exports: [
    TraceLoggerService,
    WinstonLoggerService,
    WINSTON_LOGGER,
    LoggerContextService,
  ],
})
export class LoggerModule {}
