// jest.config.js
module.exports = {
  // Allow transforming axios module to support ESM
  transformIgnorePatterns: [
    "node_modules/(?!(axios)/)"
  ],
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.js"],
  testEnvironment: "jsdom"
};
