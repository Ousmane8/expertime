module.exports = {
    env: {
        browser: true,
        es6: true,
    },
    extends: ['plugin:react/recommended', 'plugin:react-hooks/recommended'],
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
    },
    parser: 'babel-eslint',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 2018,
        sourceType: 'module',
    },
    plugins: ['react',"react-hooks","eslint-plugin-react"],
    rules: {"react-hooks/rules-of-hooks": "error",
        "react-hooks/exhaustive-deps": "warn"},
};
