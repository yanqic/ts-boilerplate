module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint/eslint-plugin'],
    extends: ['plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended'],
    env: {
        node: true,
        jest: true
    },
    parserOptions: {
        ecmaVersion: 12,
        sourceType: 'module',
        ecmaFeatures: {
            modules: true
        }
    },
    rules: {
        'prettier/prettier': 'error',
        '@typescript-eslint/no-non-null-assertion': 'off'
    }
};
