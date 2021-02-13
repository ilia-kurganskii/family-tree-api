import type { Config } from '@jest/types';

// Sync object
const config: Config.InitialOptions = {
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json',
    },
  },
  moduleNameMapper: {
    '@features/(.*)': '<rootDir>/src/features/$1',
    '@config/(.*)': '<rootDir>/src/config/$1',
  },
  moduleFileExtensions: ['js', 'json', 'ts'],
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: [
    '**/*.ts',
    '!**/*.spec.ts',
    '!**/*.mock.ts',
    '!**/*.e2e-spec.ts',
    '!**/node_modules/**',
    '!**/vendor/**',
    '!app/src/main.ts',
  ],
  coveragePathIgnorePatterns: ['<rootDir>/node_modules'],
  coverageDirectory: './coverage',
  testEnvironment: 'node',
};
export default config;
