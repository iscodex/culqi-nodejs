import type { JestConfigWithTsJest } from 'ts-jest';

const config: JestConfigWithTsJest = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  testMatch: ['**/*.spec.ts', '!**/*.e2e.spec.ts'],
  modulePathIgnorePatterns: ['<rootDir>/dist'],
  coveragePathIgnorePatterns: ['/node_modules/', '/dist/'],
};

export default config;
