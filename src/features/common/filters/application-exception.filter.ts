import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { ApplicationException } from '@features/common/types/application-exception';
import { APPLICATION_ERROR_CODES } from '@features/common/consts/error-codes';
import { Response } from 'express';

@Catch(ApplicationException)
export class ApplicationExceptionFilter implements ExceptionFilter {
  catch(exception: ApplicationException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = ApplicationExceptionFilter.mapCodeToStatus(exception.code);

    response.status(status).json({
      statusCode: exception.code,
      message: [exception.message],
      timestamp: new Date().toISOString(),
      error: exception.name,
    });
  }

  private static mapCodeToStatus(code: number): HttpStatus {
    switch (code) {
      case APPLICATION_ERROR_CODES.USER_ALREADY_EXISTS:
      case APPLICATION_ERROR_CODES.AUTH_LOGIN_INCORRECT:
      case APPLICATION_ERROR_CODES.AUTH_PASSWORD_INCORRECT:
      case APPLICATION_ERROR_CODES.USER_PASSWORD_DOES_NOT_MATCH:
        return HttpStatus.BAD_REQUEST;
      case APPLICATION_ERROR_CODES.AUTH_TOKEN_INVALID:
        return HttpStatus.UNAUTHORIZED;
    }
    return HttpStatus.INTERNAL_SERVER_ERROR;
  }
}
