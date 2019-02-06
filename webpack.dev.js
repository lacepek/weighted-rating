const path = require('path');

module.exports = {
    mode: 'development',
    entry: ['./src/index.ts'],
    devtool: 'eval-source-map',
    module: {
        rules: [
            {
                test: /\.tsc?$/,
                use: 'ts-loader',
                exclude: '/node_modules/'
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
                exclude: '/node_modules/'
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'weightedRating.js',
        libraryTarget: 'var',
        library: 'WRating',
    },
    devServer: {
        contentBase: path.resolve(__dirname),
        port: 8080
    }
};
