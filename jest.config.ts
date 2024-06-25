import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testMatch: ['**/src/**/*.test.ts'],
  moduleFileExtensions: ['ts', 'js'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
    '^.+\\.jsx?$': 'babel-jest',
  },
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
  setupFiles: ['<rootDir>/jest.setup.js'],
};

export default config;
