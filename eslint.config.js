import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import importPlugin from 'eslint-plugin-import';
import react from 'eslint-plugin-react';
import { defineConfig, globalIgnores } from 'eslint/config';


export default defineConfig([
    globalIgnores(['dist', 'node_modules', 'coverage', 'cache'], 'generated'),
    globalIgnores(['@**/*', '**/@*/**'], 'external'),
    {
        files: ['**/*.{ts,tsx}'],
        plugins: {
            react,
            import: importPlugin
        },
        settings: {
            'import/resolver': {
                typescript: true,
            },
            react: {
                version: 'detect',
            },
        },
        extends: [
            // Other configs...
            js.configs.recommended,
            tseslint.configs.recommended,
            reactHooks.configs.flat.recommended,
            reactRefresh.configs.vite,

            // Remove tseslint.configs.recommended and replace with this
            tseslint.configs.recommendedTypeChecked,
            // Alternatively, use this for stricter rules
            tseslint.configs.strictTypeChecked,
            // Optionally, add this for stylistic rules
            tseslint.configs.stylisticTypeChecked,

            // Other configs...
        ],
        languageOptions: {
            parserOptions: {
                project: ['./tsconfig.node.json', './tsconfig.app.json'],
                tsconfigRootDir: import.meta.dirname,
            },
            ecmaVersion: 2020,
            globals: globals.browser
        },
        rules: {
            'react-hooks/set-state-in-effect': 'warn',
            '@typescript-eslint/consistent-type-imports': ['error', { prefer: 'type-imports' }],
            'react-refresh/only-export-components': 'off',
            'object-curly-spacing': ['error', 'always'],
            'semi': ['error', 'always'],
            'quotes': ['error', 'double', { avoidEscape: true }],
            'import/order': ['error', {
                groups: [
                    ['builtin', 'external'],
                    'internal',
                    ['parent', 'sibling', 'index'],
                    'type',
                ],
                'newlines-between': 'always',
                alphabetize: { order: 'asc', caseInsensitive: true },
            }]
        }
    },
])
