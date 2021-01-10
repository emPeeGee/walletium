import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';

@Injectable()
export class HttpLoggerMiddleware implements NestMiddleware {
  logger = new Logger('HttpLogger');

  use(req: any, res: Response, next: NextFunction) {
    const { method, baseUrl } = req;

    this.logger.debug(`${method} request on ${baseUrl}`);
    next();
  }
}
