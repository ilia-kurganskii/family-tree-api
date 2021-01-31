import { Injectable } from '@nestjs/common';
import { TraceLoggerService } from '../common/logger/trace-logger/trace-logger.service';

@Injectable()
export class AppService {
  constructor(private readonly logger: TraceLoggerService) {
    logger.setContext('AppService');
  }

  getHello(): string {
    this.logger.log('call getHello');
    return 'Hello World!';
  }

  getHelloName(name: string): string {
    return `Hello ${name}!`;
  }
}
