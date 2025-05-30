import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

interface IRequest {
  headers: Record<string, string>;
  query: Record<string, string>;
  body: Record<string, string>;
  params: Record<string, string>;
}

@Catch()
export class AllExceptionFillter implements ExceptionFilter {
  private readonly logger = new Logger();
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}
  catch(exception: unknown, host: ArgumentsHost) {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();
    const request: IRequest = ctx.getRequest();
    const response = ctx.getResponse();

    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INSUFFICIENT_STORAGE;

    const msg: unknown = exception['response'] || 'Internal Server Error';

    const responseBody = {
      headers: request.headers,
      query: request.query,
      body: request.body,
      params: request.params,
      timeStamp: new Date().toISOString(),
      // ip: requestIp.getClientIp(request),
      exception: exception['name'],
      error: msg,
    };

    this.logger.error('[NEST_DEMO]', responseBody);
    httpAdapter.reply(response, responseBody, httpStatus);
  }
}
