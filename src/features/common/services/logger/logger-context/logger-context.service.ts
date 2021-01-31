import { Injectable, Scope, Request, Inject } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { REQUEST } from '@nestjs/core';

@Injectable({
  scope: Scope.REQUEST,
})
export class LoggerContextService {
  private readonly traceId = '';

  public constructor(@Inject(REQUEST) request: Request) {
    this.traceId = request.headers['x-request-id'] ?? uuid();
  }

  public getTraceId(): string {
    return this.traceId;
  }
}
