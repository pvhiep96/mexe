import { FlatCompat } from '@eslint/eslintrc';
import prettier from 'eslint-plugin-prettier'; // Import eslint-plugin-prettier
import prettierConfig from 'eslint-config-prettier';
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
      'prettier', // Ensure prettier is last to override conflicting rules
    ],
    settings: {
      next: {
        rootDir: './',
      },
      react: {
        version: 'detect',
      },
      tailwindcss: {
        config: './tailwind.config.ts', // Point to Tailwind config
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
      prettier, // Add prettier plugin explicitly
    },
    rules: {
      'prettier/prettier': ['error', { endOfLine: 'auto' }], // Enable prettier rule
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/no-explicit-any': 'error',
      'react/prop-types': 'off',
      'react/react-in-jsx-scope': 'off',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      '@next/next/no-img-element': 'off',
      'tailwindcss/classnames-order': 'off', // Disabled due to resolveConfig issue
      'tailwindcss/no-custom-classname': 'warn',
      'tailwindcss/enforces-shorthand': 'warn',
    },
  },
];
