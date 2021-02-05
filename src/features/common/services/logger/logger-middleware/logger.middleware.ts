import { Inject, Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { v4 as uuid } from 'uuid';
import { CLS_NAMESPACE } from '@features/common/services/logger/logger.const';
import { Namespace } from 'cls-hooked';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger(LoggerMiddleware.name);

  constructor(
    @Inject(CLS_NAMESPACE) private readonly clsNamespace: Namespace
  ) {}

  use(req: Request, res: Response, next: NextFunction) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    this.clsNamespace.bind(req);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    this.clsNamespace.bind(res);

    const traceID = req.headers['x-request-id'] ?? uuid();

    this.clsNamespace.run(() => {
      this.clsNamespace.set('traceID', traceID);
      this.logger.log({
        message: 'Request start',
        headers: req.headers,
        method: req.method,
        url: req.url,
      });
      next();
    });
  }
}
