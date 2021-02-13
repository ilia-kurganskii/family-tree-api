import type { Config } from '@jest/types';

import baseConfig from './jest.config';

const config: Config.InitialOptions = {
  ...baseConfig,
  maxConcurrency: 0,
  coverageDirectory: './coverage/e2e',
  coverageReporters: ['lcov', 'html', 'text'],
  coverageThreshold: {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    './src/**/*.controller.ts': {
      statements: 100,
    },
  },
  testRegex: '.e2e-spec.ts$',
};

export default config;
