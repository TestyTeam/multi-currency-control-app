module.exports = {
  "env": {
    "browser": true,
    "es6": true
  },
  "extends": [
    "airbnb-typescript/base",
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "project": "tsconfig.json",
    "tsconfigRootDir": ".",
    "sourceType": 'module',
  },
  "plugins": ["@typescript-eslint"],
  "rules": {}
};