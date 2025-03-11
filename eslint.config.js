import eslint from '@eslint/js';
import prettierConfig from 'eslint-config-prettier';

export default [
  eslint.configs.recommended,
  prettierConfig,
  {
    plugins: {
      // Prettier plugin is included via rules
    },
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    ignores: [
      'node_modules/**',
      'dist/**',
      'build/**',
      'coverage/**',
      '.env',
      '.env.*',
      '*.log',
      'public/**',
    ],
    rules: {
      'no-unused-vars': 'warn',
      'no-console': 'off',
      'func-names': 'off',
      'no-process-exit': 'off',
      'object-shorthand': 'off',
      'class-methods-use-this': 'off',
    },
  },
];
