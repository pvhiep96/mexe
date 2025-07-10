import { FlatCompat } from '@eslint/eslintrc';
import prettier from 'eslint-config-prettier';
import tsEslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import tailwindcss from 'eslint-plugin-tailwindcss';

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
});

export default [
  ...compat.config({
    extends: [
      'next/core-web-vitals',
      'plugin:@typescript-eslint/recommended',
      'plugin:react/recommended',
      'plugin:react-hooks/recommended',
      'plugin:tailwindcss/recommended',
      'prettier',
    ],
    settings: {
      next: {
        rootDir: './',
      },
      react: {
        version: 'detect',
      },
      tailwindcss: {
        // Explicitly specify the path to your Tailwind config
        config: './tailwind.config.ts',
        // Optionally disable rules that rely on resolveConfig
        callees: ['classNames', 'clsx', 'cn'],
        classRegex: '^(className|class)$',
      },
    },
  }),
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: './tsconfig.json',
        ecmaVersion: 2024,
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': tsEslint,
      react,
      'react-hooks': reactHooks,
      tailwindcss,
    },
    rules: {
      'prettier/prettier': ['error', { endOfLine: 'auto' }],
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/no-explicit-any': 'error',
      'react/prop-types': 'off',
      'react/react-in-jsx-scope': 'off',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      '@next/next/no-img-element': 'off',
      'tailwindcss/classnames-order': 'off', // Disable rule causing resolveConfig issue
      'tailwind(No such file or directorycss/no-custom-classname': 'warn',
      'tailwindcss/enforces-shorthand': 'warn',
    },
  },
];
