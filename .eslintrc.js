module.exports = {
  env: {
    browser: false,
    es2021: true,
    mocha: true,
    node: true,
  },
  plugins: ["@typescript-eslint"],
  extends: [
    "standard",
    "plugin:prettier/recommended",
    "plugin:node/recommended",
    // "plugin:import/typescript",
  ],
  settings: {
    "import/resolver": {
      node: {
        paths: ["src"],
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      },
    },
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    "node/no-unsupported-features/es-syntax": [
      "error",
      { ignores: ["modules"] },
    ],
    "no-process-exit": "off",
    "node/no-missing-import": [
      "error",
      {
        tryExtensions: [".js", ".json", ".node", ".ts"],
      },
    ],
  },
};
