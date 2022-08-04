module.exports = {
  name: 'nodejs-boilerplate',
  testEnvironment: 'node',
  verbose: true,
  coverageThreshold: {
    global: {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 90,
    },
  }
};
