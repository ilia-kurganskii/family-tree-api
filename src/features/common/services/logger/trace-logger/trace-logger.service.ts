import { Logger } from 'winston';
import { Inject, Injectable, LoggerService } from '@nestjs/common';
import { LoggerContextService } from '../logger-context/logger-context.service';
import { WINSTON_LOGGER } from '../logger.const';

@Injectable()
export class TraceLoggerService implements LoggerService {
  private context?: string;

  constructor(
    @Inject(WINSTON_LOGGER) private logger: Logger,
    private readonly loggerContext: LoggerContextService
  ) {}

  public setContext(context: string) {
    this.context = context;
  }

  public log(message: any, context?: string): any {
    context = context || this.context;

    if ('object' === typeof message) {
      const { message: msg, ...meta } = message;

      return this.logger.info(msg as string, {
        context,
        traceId: this.loggerContext.getTraceId(),
        ...meta,
      });
    }

    return this.logger.info(message, {
      context,
      traceId: this.loggerContext.getTraceId(),
    });
  }

  public error(message: any, trace?: string, context?: string): any {
    context = context || this.context;

    if (message instanceof Error) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { message: msg, name, stack, ...meta } = message;

      return this.logger.error(msg, {
        context,
        traceId: this.loggerContext.getTraceId(),
        stack: [trace || message.stack],
        ...meta,
      });
    }

    if ('object' === typeof message) {
      const { message: msg, ...meta } = message;

      return this.logger.error(msg as string, {
        context,
        traceId: this.loggerContext.getTraceId(),
        stack: [trace],
        ...meta,
      });
    }

    return this.logger.error(message, { context, stack: [trace] });
  }

  public warn(message: any, context?: string): any {
    context = context || this.context;

    if ('object' === typeof message) {
      const { message: msg, ...meta } = message;

      return this.logger.warn(msg as string, {
        context,
        traceId: this.loggerContext.getTraceId(),
        ...meta,
      });
    }

    return this.logger.warn(message, {
      context,
      traceId: this.loggerContext.getTraceId(),
    });
  }

  public debug?(message: any, context?: string): any {
    context = context || this.context;

    if ('object' === typeof message) {
      const { message: msg, ...meta } = message;

      return this.logger.debug(msg as string, {
        context,
        traceId: this.loggerContext.getTraceId(),
        ...meta,
      });
    }

    return this.logger.debug(message, {
      context,
      traceId: this.loggerContext.getTraceId(),
    });
  }

  public verbose?(message: any, context?: string): any {
    context = context || this.context;

    if ('object' === typeof message) {
      const { message: msg, ...meta } = message;

      return this.logger.verbose(msg as string, {
        context,
        traceId: this.loggerContext.getTraceId(),
        ...meta,
      });
    }

    return this.logger.verbose(message, {
      context,
      traceId: this.loggerContext.getTraceId(),
    });
  }
}
