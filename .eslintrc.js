module.exports = {
  env: {
    es2020: true,
    node: true,
    browser: true,
  },
  extends: [
    'eslint:recommended',
    'next',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  plugins: ['react', '@typescript-eslint'],
  rules: {
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_|^req|^next' }],
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/explicit-function-return-type': 0,
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'react-hooks/exhaustive-deps': 0,
    'react/prop-types': 0,
    'no-empty-function': 'off',
    'no-empty-pattern': 0,
    'no-console': 1,
  },
};
