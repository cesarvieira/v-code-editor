import tsEslint from 'typescript-eslint';
import eslintConfigPrettier from 'eslint-config-prettier';
import js from '@eslint/js';
import eslintPluginVue from 'eslint-plugin-vue';
import {
  defineConfigWithVueTs,
  vueTsConfigs,
} from '@vue/eslint-config-typescript';
import vueEslintParser from 'vue-eslint-parser';
import stylistic from '@stylistic/eslint-plugin';
import { defineConfig } from 'eslint/config';
import { includeIgnoreFile } from '@eslint/compat';
import { fileURLToPath } from 'node:url';
import globals from 'globals';

const gitignorePath = fileURLToPath(new URL('.gitignore', import.meta.url));

export default defineConfig(
  includeIgnoreFile(gitignorePath, 'Imported .gitignore patterns'),
  eslintConfigPrettier,
  js.configs.recommended,
  ...tsEslint.configs.strict,
  ...tsEslint.configs.stylistic,
  ...eslintPluginVue.configs['flat/recommended'],
  ...defineConfigWithVueTs(vueTsConfigs.recommended),
  stylistic.configs.customize({
    quoteProps: 'as-needed',
    commaDangle: 'always-multiline',
  }),
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tsEslint.parser,
      parserOptions: {
        project: ['./tsconfig.json', './playground/tsconfig.json'],
      },
    },
  },
  {
    files: ['**/*.vue'],
    languageOptions: {
      parser: vueEslintParser.parser,
      parserOptions: {
        parser: tsEslint.parser,
      },
    },
    rules: {
      'vue/component-name-in-template-casing': [
        'error',
        'PascalCase',
        {
          registeredComponentsOnly: false,
        },
      ],
      'vue/html-self-closing': [
        'error',
        {
          html: {
            void: 'never',
            normal: 'never',
            component: 'always',
          },
          svg: 'always',
          math: 'always',
        },
      ],
      'vue/max-attributes-per-line': [
        'error',
        {
          singleline: 4,
          multiline: 1,
        },
      ],
      'vue/object-property-newline': [
        'error',
        {
          allowAllPropertiesOnSameLine: true,
        },
      ],
      'vue/operator-linebreak': ['off'],
      'vue/quote-props': ['error', 'as-needed'],
      'vue/singleline-html-element-content-newline': ['off'],
      'vue/valid-v-slot': ['error', { allowModifiers: true }],
      'vue/max-len': [
        'error',
        {
          code: 120,
          ignoreUrls: true,
        },
      ],
    },
  },
  {
    rules: {
      '@stylistic/brace-style': ['error', '1tbs', { allowSingleLine: true }],
      '@stylistic/eol-last': ['error', 'always'],
      '@stylistic/linebreak-style': ['error', 'unix'],
      '@stylistic/max-len': [
        'error',
        {
          code: 120,
          ignoreUrls: true,
          ignoreStrings: true,
          ignoreTemplateLiterals: true,
          ignoreRegExpLiterals: true,
          ignorePattern: 'd="([\\s\\S]*?)"',
        },
      ],
      '@stylistic/no-multiple-empty-lines': ['error', { max: 2, maxEOF: 1 }],
      '@stylistic/member-delimiter-style': [
        'error',
        {
          multiline: {
            delimiter: 'semi',
            requireLast: true,
          },
          singleline: {
            delimiter: 'semi',
            requireLast: false,
          },
          multilineDetection: 'brackets',
        },
      ],
      '@stylistic/operator-linebreak': [
        'error',
        'after',
        {
          overrides: {
            '?': 'before',
            ':': 'before',
          },
        },
      ],
      '@stylistic/semi': ['error', 'always'],
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'default',
          format: ['camelCase'],
          leadingUnderscore: 'allow',
        },
        {
          selector: 'variable',
          format: ['camelCase', 'UPPER_CASE', 'PascalCase'],
          leadingUnderscore: 'allow',
        },
        {
          selector: 'function',
          format: ['camelCase', 'PascalCase'],
        },
        {
          selector: 'enum',
          format: ['UPPER_CASE'],
        },
        {
          selector: 'typeAlias',
          format: ['PascalCase', 'UPPER_CASE'],
        },
        {
          selector: 'typeLike',
          format: ['PascalCase'],
        },
        {
          selector: 'parameter',
          format: ['camelCase'],
          leadingUnderscore: 'allow',
        },
        {
          selector: ['property', 'objectLiteralProperty', 'objectLiteralMethod', 'enumMember'],
          format: null,
        },
        {
          selector: 'import',
          format: null,
        },
      ],
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrors: 'none',
        },
      ],
      'max-params': ['error', 4],
      'no-console': 1,
      'no-debugger': 1,
      'no-restricted-syntax': [
        'error',
        {
          selector: 'CallExpression[callee.property.name=\'then\']',
          message: 'Use async/await instead of Promise.then()',
        },
        {
          selector: 'CallExpression[callee.property.name=\'catch\']',
          message: 'Use try/catch with await instead of Promise.catch()',
        },
        {
          selector: 'CallExpression[callee.property.name=\'finally\']',
          message:
            'Use finally within try/catch/finally, not Promise.finally()',
        },
      ],
      quotes: ['error', 'single'],
      semi: ['error', 'always'],
    },
  },
  {
    files: [
      '**/app/layouts/**/*.vue',
      '**/app/pages/**/*.vue',
      '**/app/error.vue',
    ],
    rules: {
      'vue/multi-word-component-names': 'off',
    },
  },
  {
    files: ['eslint.config.mjs'],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
);
