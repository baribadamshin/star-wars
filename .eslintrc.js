module.exports = {
    env: {
        browser: true,
        es6: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended',
        'airbnb',
        'airbnb/hooks',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    plugins: [
        'react',
        '@typescript-eslint',
    ],
    rules: {
        'object-curly-spacing': 0,
        indent: ['error', 4, {
            SwitchCase: 1,
            VariableDeclarator: 1,
            outerIIFEBody: 1,
            FunctionDeclaration: {
                parameters: 1,
                body: 1,
            },
            FunctionExpression: {
                parameters: 1,
                body: 1,
            },
        }],
        'arrow-parens': 0,
        'import/extensions': [
            'error',
            'always',
            {
                ts: 'never',
                tsx: 'never',
                js: 'never',
                jsx: 'never',
            },
        ],

        '@typescript-eslint/no-var-requires': 0,

        'react/jsx-filename-extension': 0,
        'jsx-quotes': ['error', 'prefer-double'],
        'react/jsx-curly-brace-presence': ['error', {
            props: 'never',
            children: 'never',
        }],
        'react/jsx-closing-bracket-location': ['error'],
        'react/self-closing-comp': ['error'],
        'react/jsx-tag-spacing': ['error', {
            afterOpening: 'never',
            beforeSelfClosing: 'always',
            closingSlash: 'never',
        }],
        'react/jsx-uses-vars': ['error'],
        'react/jsx-uses-react': ['error'],
        'react/function-component-definition': ['error', {
            unnamedComponents: 'arrow-function',
        }],
    },
    settings: {
        'import/resolver': {
            webpack: {
                config: './webpack.config.js',
            },
        },
        'import/extensions': ['.js', '.jsx', '.ts', '.tsx'],
    },
};
