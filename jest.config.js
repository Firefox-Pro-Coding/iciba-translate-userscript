const path = require('path')

module.exports = {
  preset: 'ts-jest/presets/js-with-ts',
  globals: {
    'ts-jest': {
      tsconfig: path.join(__dirname, 'tsconfig.test.json'),
    },
  },
  moduleNameMapper: {
    '\\.(svg)$': '<rootDir>/test/__mocks__/svg.ts',
    '~/(.*)': '<rootDir>/src/$1',
  },
  testEnvironment: 'jsdom',
  setupFiles: [
    // './test/setup.ts',
  ],
  coverageReporters: ['html', 'lcov', 'text'],
  collectCoverageFrom: [
    './src/**/*',
  ],
  coverageProvider: 'v8',
}
