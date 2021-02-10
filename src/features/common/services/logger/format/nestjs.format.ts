import winston from 'winston';

export const nestjsFormat = winston.format.printf(
  ({ context, level, timestamp, message, traceId, ...meta }) => {
    return (
      `${level}\t` +
      `${new Date(timestamp).toLocaleString()}\t ` +
      ('undefined' !== typeof context ? `${'[' + context + ']\t'} ` : '') +
      ('undefined' !== typeof traceId ? `${'[' + traceId + ']\t'} ` : '') +
      `${message}` +
      `${
        Object.keys(meta).length > 0
          ? ` - ${JSON.stringify(meta, null, 2)}`
          : ''
      }`
    );
  }
);
