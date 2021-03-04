module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint'],
    extends: [
        'airbnb-typescript/base',
        'prettier',
        'prettier/@typescript-eslint',
    ],
    parserOptions: {
        project: './tsconfig.json',
    },
    rules: {
        'eol-last': ['warn', 'always'],
        'indent': ['error', 4],
        'quotes': ['warn', 'single'],
        'max-len': [
            'error',
            {
                'code': 80 ,
                'ignoreUrls': true,
                'ignoreTemplateLiterals': true,
                'ignoreStrings': true,
            },
        ],
        'prefer-destructuring': ['warn',
            {
                'array': true,
                'object': true,
            }, {
                'enforceForRenamedProperties': true,
            },
        ],
    }
};
