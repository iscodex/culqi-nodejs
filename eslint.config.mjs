import js from '@eslint/js';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import jePlugin from 'eslint-plugin-jest';
import tsParser from '@typescript-eslint/parser';
import prettier from 'eslint-plugin-prettier';

export default [
  /* ignore */
  {
    ignores: ['dist/**', 'coverage/**', 'node_modules/**', 'jest.config.ts', 'jest.e2e.config.ts'],
  },
  /* JS base */
  js.configs.recommended,
  /* TS files */
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: tsParser,
      parserOptions: { project: './tsconfig.json' },
      // // Let ESLint know fetch is available (Node >= 18)
      globals: { fetch: 'readonly', console: 'readonly' },
    },
    plugins: { '@typescript-eslint': tsPlugin, prettier },
    rules: {
      ...tsPlugin.configs.recommended.rules,
      'prettier/prettier': 'error',
      '@typescript-eslint/no-explicit-any': ['error', { ignoreRestArgs: false }],
    },
  },
  /* Relax rules only for test files and generated types */
  {
    files: ['src/types/**', '**/*.spec.ts', '**/*.e2e.spec.ts'],
    languageOptions: {
      parserOptions: { project: './tsconfig.json' },
      globals: jePlugin.environments.globals.globals,
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
];
