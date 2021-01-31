import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';
import { TraceLoggerService } from '../trace-logger/trace-logger.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private readonly logger: TraceLoggerService) {}

  use(req: Request, res: Response, next: NextFunction) {
    this.logger.log({
      message: 'Request start',
      headers: req.headers,
      method: req.method,
      url: req.url,
    });
    next();
  }
}
