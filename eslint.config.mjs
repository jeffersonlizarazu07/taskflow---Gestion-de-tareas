import { createRequire } from 'node:module';
import js from '@eslint/js';
import prettier from 'eslint-config-prettier';

const require = createRequire(import.meta.url);
const nextRequire = createRequire(require.resolve('eslint-config-next/package.json'));

const nextPlugin = nextRequire('@next/eslint-plugin-next');
const reactPlugin = nextRequire('eslint-plugin-react');
const reactHooksPlugin = nextRequire('eslint-plugin-react-hooks');
const jsxA11yPlugin = nextRequire('eslint-plugin-jsx-a11y');
const importPlugin = nextRequire('eslint-plugin-import');
const tsParser = nextRequire('@typescript-eslint/parser');
const tsPlugin = nextRequire('@typescript-eslint/eslint-plugin');
const globals = nextRequire('globals');

const nextRecommendedRules = nextPlugin.configs.recommended.rules;
const nextCoreWebVitalsRules = nextPlugin.configs['core-web-vitals'].rules;
const reactRecommendedRules = reactPlugin.configs.recommended.rules;
const reactHooksRecommendedRules = reactHooksPlugin.configs.recommended.rules;
const typescriptRecommendedRules = tsPlugin.configs.recommended.rules;

const eslintConfig = [
  {
    ignores: ['.next/**', 'out/**', 'build/**', 'next-env.d.ts'],
  },
  js.configs.recommended,
  {
    files: ['**/*.{js,jsx,mjs,cjs,ts,tsx}'],
    plugins: {
      '@next/next': nextPlugin,
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
      'jsx-a11y': jsxA11yPlugin,
      import: importPlugin,
      '@typescript-eslint': tsPlugin,
    },
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parserOptions: {
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    settings: {
      react: { version: 'detect' },
      next: { rootDir: ['./'] },
    },
    rules: {
      ...reactRecommendedRules,
      ...reactHooksRecommendedRules,
      ...nextRecommendedRules,
      ...nextCoreWebVitalsRules,
      'import/no-anonymous-default-export': 'warn',
      'react/no-unknown-property': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'jsx-a11y/alt-text': ['warn', { elements: ['img'], img: ['Image'] }],
      'jsx-a11y/aria-props': 'warn',
      'jsx-a11y/aria-proptypes': 'warn',
      'jsx-a11y/aria-unsupported-elements': 'warn',
      'jsx-a11y/role-has-required-aria-props': 'warn',
      'jsx-a11y/role-supports-aria-props': 'warn',
      'react/jsx-no-target-blank': 'off',
      'no-console': 'warn',
      'prefer-const': 'error',
    },
  },
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        sourceType: 'module',
      },
    },
    rules: {
      ...typescriptRecommendedRules,
      'no-undef': 'off',
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/no-explicit-any': 'error',
    },
  },
  prettier,
];

export default eslintConfig;
