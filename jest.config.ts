module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    globals: {
      'ts-jest': {
        tsconfig: 'frontend/tsconfig.json', // Adjust this path
      },
    },
    moduleNameMapper: {
      '^@components/(.*)$': '<rootDir>/frontend/src/components/$1', // If you use path aliases
    },
    roots: ['<rootDir>/frontend/src'],
  };
  