/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */

export default {
  bail: false,
  testTimeout: 50000,
  clearMocks: true,
  collectCoverage: true,
  // coverageReporters: ['html'], // not collect de data
  coverageProvider: 'v8',
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['./**/__tests__/**.test.ts'],
  verbose: true,
};
