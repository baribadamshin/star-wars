module.exports = api => {
    const isProduction = api.env('production');

    const plugins = [];

    if (!isProduction) {
        plugins.push('react-hot-loader/babel');
    }

    return {
        plugins,
        presets: [
            ['@babel/env', {
                corejs: '3.6',
                bugfixes: true,
                useBuiltIns: 'entry',
            }],
            '@babel/react',
            '@babel/typescript',
        ],
    };
};
