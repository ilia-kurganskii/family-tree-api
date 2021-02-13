import winston from 'winston';

export const productionFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.json()
);
