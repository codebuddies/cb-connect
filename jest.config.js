module.exports = {
  // Jest configuration to set up Enzyme Adapter
  setupFilesAfterEnv: ['./specs/configs/test_setup.js'],
  modulePaths: ['<rootDir>/node_modules/', '<rootDir>/node_modules/jest-meteor-stubs/lib/'],
  moduleNameMapper: {
    '^(.*):(.*)$': '$1_$2',
  },
  unmockedModulePathPatterns: ['/^imports\\/.*\\.jsx?$/', '/^node_modules/'],
};
