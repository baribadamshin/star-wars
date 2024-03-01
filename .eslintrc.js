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
        'object-curly-spacing': [1, 'never', {
            objectsInObjects: false,
            arraysInObjects: false,
        }],
        indent: [1, 4, {
            SwitchCase: 1,
            VariableDeclarator: 1,
            outerIIFEBody: 1,
        }],
        'arrow-parens': 0,
        'import/extensions': [
            1,
            'always',
            {
                ts: 'never',
                tsx: 'never',
                js: 'never',
                jsx: 'never',
            },
        ],

        '@typescript-eslint/no-var-requires': 0,
        '@typescript-eslint/ban-types': 0,
        '@typescript-eslint/no-non-null-assertion': 0,

        'react/jsx-uses-react': 0,
        'react/react-in-jsx-scope': 0,
        'react/jsx-filename-extension': 0,
        'jsx-quotes': [1, 'prefer-double'],
        'react/jsx-curly-brace-presence': [1, {
            props: 'never',
            children: 'never',
        }],
        'react/jsx-closing-bracket-location': [1],
        'react/self-closing-comp': [1],
        'react/jsx-tag-spacing': [1, {
            afterOpening: 'never',
            beforeSelfClosing: 'always',
            closingSlash: 'never',
        }],
        'react/jsx-indent': [1, 4],
        'react/jsx-indent-props': [1, 4],
        'react/no-array-index-key': 0,
        'react/jsx-uses-vars': [1],
        'react/prop-types': 0,
        'object-curly-newline': 0,
        'react/require-default-props': 0,
        'react/function-component-definition': [1, {
            unnamedComponents: 'arrow-function',
        }],
        'no-param-reassign': [1, {props: true, ignorePropertyModificationsFor: ['state']}],
        'import/no-named-as-default': 0,
        'import/prefer-default-export': 1,
        'max-len': [1, {code: 120}],
        'comma-dangle': ['error', 'always-multiline'],
        'import/order': [
            'error',
            {
                pathGroups: [
                    {
                        pattern: '~/**',
                        group: 'internal',
                    },
                ],
                groups: ['builtin', 'external', 'internal', ['parent', 'sibling'], 'index'],
                'newlines-between': 'always',
            },
        ],
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
