/** @type {import('jest').Config} */
const config = {

  // Indicates which provider should be used to instrument code for coverage
  coverageProvider: "v8",

  // A map from regular expressions to paths to transformers
  transform: {
    "^.+.tsx?$": ["ts-jest",{}],
  },
};

module.exports = config;
