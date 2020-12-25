const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { merge } = require('webpack-merge');
const config = require('./webpack.config');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

let prodConfig = merge(config, {
    mode: 'production',
    stats: 'errors-only',
    output: {
        path: path.join(__dirname, '../', 'dist'),
        publicPath: './',
        filename: '[name].[contenthash:7].js'
    },
    plugins: [
        new CleanWebpackPlugin(),
        // 提取CSS
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash:7].css'
        })
    ]
});

const resolvePath = (dir) => {
    return path.resolve(__dirname, '../', dir);
};

module.exports = prodConfig;