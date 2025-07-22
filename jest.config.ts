import type { JestConfigWithTsJest } from 'ts-jest';

const config: JestConfigWithTsJest = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/tests'],
  modulePathIgnorePatterns: ['<rootDir>/dist'],
  coveragePathIgnorePatterns: ['/node_modules/', '/dist/'],
};

export default config;
