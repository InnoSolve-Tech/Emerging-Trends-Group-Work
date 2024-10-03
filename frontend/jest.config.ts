module.exports = {
  preset: 'ts-jest', // Use ts-jest for TypeScript
  testEnvironment: 'jsdom', // Use jsdom for React component testing
  transform: {
    '^.+\\.tsx?$': 'ts-jest', // Transform TypeScript files
  },
  transformIgnorePatterns: [
    '/node_modules/(?!axios)', // Transform axios to handle ES module imports
  ],
  moduleNameMapper: {
    '\\.(css|less|scss)$': 'identity-obj-proxy', // Mock CSS modules
  },
};
