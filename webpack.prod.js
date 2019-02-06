const path = require('path');
const uglifyJsPlugin = require('uglifyjs-webpack-plugin');
const optimizeJsPlugin = require('optimize-js-plugin');
const optimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const cssnano = require('cssnano');

module.exports = {
    mode: 'production',
    entry: './src/index.ts',
    module: {
        rules: [
            {
                test: /\.tsc?$/,
                use: 'ts-loader',
                exclude: '/node_modules/'
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader', 'clean-css-loader'],
                exclude: '/node_modules/'
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'weightedRating.min.js',
        libraryTarget: 'var',
        library: 'WRating'
    },
    optimization: {
        minimize: true,
        minimizer: [
            new uglifyJsPlugin({
                include: /\.min\.js$/
            }),
            new optimizeJsPlugin({
                sourceMap: false
            }),
            new optimizeCssAssetsPlugin({
                cssProcessor: cssnano,
                canPrint: false
            })
        ]
    }
};
