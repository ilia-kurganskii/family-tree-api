import { MAX_APPLICATION_ERROR_ID } from '@features/common/consts/error-codes';
import { mapCodeToStatus } from '@features/common/filters/application-exception/application-exception.util';
import each from 'jest-each';

describe('ApplicationExceptionUtil', () => {
  each(Array.from({ length: MAX_APPLICATION_ERROR_ID }, (_, i) => i + 1)).it(
    'should handled error code: %i',
    (code) => {
      expect(mapCodeToStatus(code)).not.toBe(500);
    }
  );
});
