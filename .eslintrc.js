module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: [
    'airbnb-typescript/base',
    'prettier',
    'prettier/@typescript-eslint',
  ],
  parserOptions: {
    project: './tsconfig.json',
  },
  "rules": {
    'eol-last': ["warn", "always"],
}
};
