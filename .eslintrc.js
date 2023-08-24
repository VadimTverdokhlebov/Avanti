module.exports = {
    parser: '@typescript-eslint/parser',
    extends: ['eslint:recommended', 'airbnb-typescript/base'],
    plugins: [
        '@typescript-eslint',
        'import',
    ],
    parserOptions: {
        project: 'tsconfig.json',
        tsconfigRootDir: __dirname,
        sourceType: 'module',
    },
    rules: {
        'import/extensions': ['error', 'ignorePackages', {
            js: 'always',
            ts: 'never',
        }],

        '@typescript-eslint/no-implicit-any-catch': 'off',
        '@typescript-eslint/indent': 'off',
        'no-restricted-syntax': ['error', 'BinaryExpression[operator="of"]'],
        'no-underscore-dangle': 'off',
        'indent':'off',
        'no-console': 'off',
    },
    globals: {
        module: 'readonly',
        __dirname: 'readonly',
    },
};