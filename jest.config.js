/**  type {import('ts-jest').JestConfigWithTsJest} */
// eslint-disable-next-line no-undef
module.exports = {
  preset: 'ts-jest',
  coveragePathIgnorePatterns: ['node_modules', 'tests'],
  transform: {
    '^.+\\.ts?$': 'ts-jest'
  },
  moduleNameMapper: {
    ' redux': '<rootDir>/src/config/redux',
    ' common/(.*)': '<rootDir>/src/common/$1',
    ' config/(.*)': '<rootDir>/src/config/$1',
    ' pages/(.*)': '<rootDir>/src/app/pages/$1',
    ' domain/(.*)': '<rootDir>/src/domain/$1',
    ' styles/(.*)': '<rootDir>/src/styles/$1',
    ' utils/(.*)': '<rootDir>/src/utils/$1',
    'src/(.*)': '<rootDir>/src/$1'
  }
}
