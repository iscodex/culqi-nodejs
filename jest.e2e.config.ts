import type { JestConfigWithTsJest } from 'ts-jest';

const config: JestConfigWithTsJest = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/tests'],
  testMatch: ['**/*.e2e.spec.ts'],
  modulePathIgnorePatterns: ['<rootDir>/dist'],
  testTimeout: 20000,
};

export default config;
