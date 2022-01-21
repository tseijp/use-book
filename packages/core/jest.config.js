const path = require('path');

module.exports = {
    rootDir: path.join(__dirname, '../..'),
    roots: ['<rootDir>/'],
    preset: 'ts-jest',
    globals: {'ts-jest': {diagnostics: true}},
    automock: false,
    clearMocks: true,
    transform: {'^.+\\.(js|jsx|ts|tsx)$': 'ts-jest'},
    testRegex: ['(/test/.*|\\.(test|spec))\\.(js|jsx|ts|tsx)$'],
    testPathIgnorePatterns: ['<rootDir>/node_modules/'],
    transformIgnorePatterns: ['<rootDir>/node_modules/(?!(xxxx.*?\\.js$))'],
    modulePaths: [],
    moduleNameMapper: {'src/(.*)$': '<rootDir>/src/$1'},
    moduleFileExtensions: ['ts','tsx','js','jsx','json','node'],
    /**
     * coverage config
     */
    coverageDirectory: '<rootDir>/coverage/',
    coverageReporters: ['json', 'html', 'lcov', 'text', 'text-summary', 'clover'],
    coverageThreshold: {global: {statements: 95, functions: 95, branches: 95, lines: 95}},
    collectCoverageFrom: ['<rootDir>/packages/core/src/**/*.ts', '!**/index.*'],
};
