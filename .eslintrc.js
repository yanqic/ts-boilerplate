module.exports = {
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint/eslint-plugin'],
    extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended','plugin:@typescript-eslint/recommended-requiring-type-checking'],
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
    }
};
