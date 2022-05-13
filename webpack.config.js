const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const {merge} = require('webpack-merge');
const {WebpackManifestPlugin} = require('webpack-manifest-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const {description} = require('./package.json');

const src = path.join(__dirname, 'src');
const dist = path.join(__dirname, 'dist');

module.exports = () => {
    const mode = process.env.NODE_ENV || 'development';
    const isProduction = mode === 'production';

    const base = {
        mode,
        devtool: false,
        bail: true,
        entry: path.join(src, 'client'),
        output: {
            path: dist,
            publicPath: '',

        },
        resolve: {
            alias: {
                '~': src,
            },
            extensions: ['.mjs', '.js', '.jsx', '.ts', '.tsx', '.json'],
        },
        optimization: {
            splitChunks: {
                cacheGroups: {
                    vendor: {
                        test: /\/node_modules\//,
                        name: 'vendor',
                        chunks: 'initial',
                    },
                },
            },
        },

        module: {
            rules: [{
                test: /\.(jsx?|tsx?|mjs)$/i,
                type: 'javascript/auto',
                resolve: {
                    fullySpecified: false,
                },
                include: src,
                loader: 'babel-loader',
            }, {
                test: /\.(png|jpe?g|gif)$/i,
                loader: 'file-loader',
            }, {
                test: /\.css$/i,
                use: [
                    {
                        loader: isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: !isProduction,
                            modules: true,
                            importLoaders: 1,
                        },
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: !isProduction,
                        },
                    },
                ],
            }],
        },

        plugins: [
            new HtmlWebpackPlugin({
                template: path.join(src, 'index.html'),
                title: description,
                minify: isProduction,
                inject: 'body',
                favicon: path.join(src, 'assets', 'favicon.png'),
                publicPath: isProduction ? '/star-wars/' : 'auto',
            }),
        ],
    };

    if (isProduction) {
        return merge(base, {
            output: {
                filename: '[contenthash].js',
                chunkFilename: '[chunkhash].js',
            },
            optimization: {
                minimize: true,
            },
            plugins: [
                new MiniCssExtractPlugin({
                    filename: '[contenthash].css',
                    chunkFilename: '[chunkhash].css',
                }),
                new WebpackManifestPlugin(),
            ],
        });
    }

    const devServer = {
        static: {
            directory: dist,
        },
        open: true,
        allowedHosts: 'all',
        headers: {
            'Access-Control-Allow-Origin': '*',
        },
        historyApiFallback: true,
        host: 'localhost',
        port: 8080,
        hot: 'only',
        client: {
            logging: 'error',
        },
    };

    return merge(base, {
        devServer,
        stats: {
            colors: true,
            modules: false,
        },
        entry: {
            client: [
                'react-hot-loader/patch',
                base.entry,
            ],
        },
        devtool: 'inline-cheap-module-source-map',
    });
};
