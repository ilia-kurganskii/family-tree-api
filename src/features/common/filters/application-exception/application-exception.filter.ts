import { mapCodeToStatus } from '@features/common/filters/application-exception/application-exception.util';
import { ApplicationException } from '@features/common/types/application-exception';
import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Response } from 'express';

@Catch(ApplicationException)
export class ApplicationExceptionFilter implements ExceptionFilter {
  catch(exception: ApplicationException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = mapCodeToStatus(exception.code);

    response.status(status).json({
      statusCode: exception.code,
      message: [exception.message],
      timestamp: new Date().toISOString(),
    });
  }
}
