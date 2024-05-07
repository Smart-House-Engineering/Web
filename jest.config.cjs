// jest.config.cjs or jest.config.js
module.exports = {
  testEnvironment: "jsdom",
  testMatch: ["**/tests/**/*.js?(x)", "**/?(*.)+(spec|test).js?(x)"],
  transform: {
    "^.+\\.jsx?$": "babel-jest",
  },
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
  },
};
