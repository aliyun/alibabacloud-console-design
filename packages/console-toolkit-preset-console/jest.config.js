module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: [
    '**/?(*.)+(spec|test).ts?(x)',
  ],
  testPathIgnorePatterns: [
    '/node_modules/',
    '/tests/fixtures/',
  ],
  transformIgnorePatterns: [
    '/node_modules/',
    '/tests/',
  ]
};