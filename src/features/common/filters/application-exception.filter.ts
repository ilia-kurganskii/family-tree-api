import { ApplicationErrorCode } from '@features/common/consts/error-codes';
import { ApplicationException } from '@features/common/types/application-exception';
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
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
    });
  }

  private static mapCodeToStatus(code: ApplicationErrorCode): HttpStatus {
    switch (code) {
      case ApplicationErrorCode.NODE_NOT_FOUND:
      case ApplicationErrorCode.NODE_IN_DIFF_TREE_EXCEPTION:
        return HttpStatus.NOT_FOUND;
      case ApplicationErrorCode.USER_ALREADY_EXISTS:
      case ApplicationErrorCode.AUTH_LOGIN_INCORRECT:
      case ApplicationErrorCode.AUTH_PASSWORD_INCORRECT:
      case ApplicationErrorCode.USER_PASSWORD_DOES_NOT_MATCH:
        return HttpStatus.BAD_REQUEST;
      case ApplicationErrorCode.AUTH_TOKEN_INVALID:
        return HttpStatus.UNAUTHORIZED;
    }
    return HttpStatus.INTERNAL_SERVER_ERROR;
  }
}
