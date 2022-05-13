module.exports = ({env}) => ({
    plugins: {
        'postcss-preset-env': {
            stage: 3,
            autoprefixer: {
                grid: 'no-autoplace',
            },
        },
        'postcss-csso': env === 'production' ? {} : false,
    },
});
