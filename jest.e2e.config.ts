import type { JestConfigWithTsJest } from 'ts-jest';

const config: JestConfigWithTsJest = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/tests'],
  testMatch: ['**/*.e2e.spec.ts'],
  modulePathIgnorePatterns: ['<rootDir>/dist'],
};

export default config;
