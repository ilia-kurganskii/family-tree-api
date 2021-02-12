import type { Config } from '@jest/types';

import baseConfig from './jest.config';

const config: Config.InitialOptions = {
  ...baseConfig,
  coverageDirectory: './coverage/e2e',
  testRegex: '.e2e-spec.ts$',
};

export default config;
