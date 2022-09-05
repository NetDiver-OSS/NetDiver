module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
    ecmaVersion: 'latest',
    ecmaFeatures: {
      jsx: true
    }
  },
  plugins: [
    '@typescript-eslint/eslint-plugin',
    'react'
  ],
  extends: [
    'eslint:recommended',
    'standard-with-typescript',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  root: true,
  env: {
    browser: true,
    es2021: true
  },
  ignorePatterns: ['.eslintrc.cjs'],
  rules: {},
  overrides: [
    {
      files: '*',
      rules: {
        'max-len': ['warn', {'code': 120}],
      }
    }
  ],
  settings: {
    react: {
      version: "detect"
    }
  }
}