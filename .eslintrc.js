module.exports = {
  "env": {
    "browser": true,
    "es6": true
  },
  "extends": [
    "airbnb-base",
    "airbnb-typescript/base",
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "project": "tsconfig.json",
    "tsconfigRootDir": ".",
    "sourceType": 'module',
  },
  "plugins": ["@typescript-eslint"],
  "rules": {
    "linebreak-style": 0,
    "consistent-return": 0,
    "@typescript-eslint/no-unused-vars": 0,
    "no-debugger": 0,
    "no-param-reassign": 0,
    "function-paren-newline": 0,
    "no-return-assign": 0,
    "arrow-body-style": 0
  }
};