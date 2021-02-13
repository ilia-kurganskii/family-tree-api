import { nestjsFormat } from '@features/common/services/logger/format/nestjs.format';
import winston from 'winston';

export const devFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.colorize({
    all: true,
  }),
  nestjsFormat
);
