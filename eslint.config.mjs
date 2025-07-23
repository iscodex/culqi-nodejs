import js from '@eslint/js';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import prettier from 'eslint-plugin-prettier';

export default [
  // Ignore patterns
  {
    ignores: ['dist/**', 'coverage/**', 'node_modules/**'],
  },

  // Base JS recommended rules
  js.configs.recommended,

  // TypeScript rules
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: './tsconfig.json',
      },
      globals: {
        // Let ESLint know fetch is available (Node >= 18)
        fetch: 'readonly',
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      prettier,
    },
    rules: {
      ...tsPlugin.configs.recommended.rules,
      'prettier/prettier': 'error',
      '@typescript-eslint/no-explicit-any': ['error', { ignoreRestArgs: false }],
    },
  },

  // Relax rules for generated DTOs and tests
  {
    files: ['src/types/**', 'tests/**'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
];
