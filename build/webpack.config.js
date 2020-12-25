const webpack = require('webpack');
const path = require('path');
// node 中参数，用于获取文件
const glob = require('glob');
// node中模块，用于获取参数
const argv = require('yargs').argv;
// 插件用于命令行的提示【成功、警告、错误】
var FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// console.log('环境', process.env.NODE_ENV === 'development' ? 'vue-style-loader' : 'MiniCssExtractPlugin.loader')

const resolvePath = (dir) => {
    return path.resolve(__dirname, '../', dir);
};

// 多页面
const setMPA = () => {
    const entry = {};
    const htmlWebpackPlugins = [];
    const entryFiles = glob.sync(path.join(__dirname, '../', 'src/pages/*/index.js'));
    Object.keys(entryFiles)
        .map((index) => {
            const entryFile = entryFiles[index];

            const match = entryFile.match(/pages\/(.*)\/index\.js/);
            const pageName = match && match[1];

            entry[pageName] = entryFile;
            htmlWebpackPlugins.push(
                new HtmlWebpackPlugin({
                    template: path.join(__dirname, '../', `src/pages/${pageName}/index.html`),
                    filename: `${pageName}.html`,
                    // chunks: ['manifest', 'vendor', pageName]
                    chunks: [pageName],
                    inject: true,
                    minify: {
                        html5: true,
                        collapseWhitespace: true,
                        preserveLineBreaks: false,
                        minifyCSS: true,
                        minifyJS: true,
                        removeComments: false
                    }
                })
            );
        });

    return {
        entry,
        htmlWebpackPlugins
    }
};

const { entry, htmlWebpackPlugins } = setMPA();

module.exports = {
    entry: entry,
    output: {
        path: path.join(__dirname, '../', 'dist'),
        publicPath: '/',
        filename: '[name].[hash].js'
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: ['vue-loader'],
                exclude: /node_modules/,
            },
            {
                test: /\.js$/, // 它会应用到普通的 `.js` 文件, 以及 `.vue` 文件中的 `<script>` 块
                loader: 'babel-loader',
                exclude: /node_modules/,
                include: [
                    resolvePath('build'),
                    resolvePath('src'),
                ]
            },
            {
                test: /\.(c|sa|sc)ss$/, // 它会应用到普通的 `.css|.sass|.sacc` 文件,以及 `.vue` 文件中的 `<style>` 块
                use: [
                    process.env.NODE_ENV === 'development' ? 'vue-style-loader' : MiniCssExtractPlugin.loader, // 请只在生产环境下使用 CSS 提取，这将便于你在开发环境下进行热重载
                    {
                        loader: 'css-loader',
                        options: {
                            esModule: false // 新版本默认是esModule
                        }
                    },
                    'postcss-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/,
                use: [
                    {
                        loader: 'url-loader', // 4.3.0 esModule
                        options: {
                            limit: 10240,
                            esModule: false,
                            name: 'assets/[name].[ext]'
                        }
                    }
                ]
            },
            {
                test: /\.(ttf|woff2?|eot)(\?.*)?$/,
                use: [
                    {
                        loader: 'url-loader',
                        query: {
                            limit: 10000,
                            name: 'assets/fonts/[name].[hash:7].[ext]'
                        }
                    }
                ]
            },
            {
                test: /\.html$/,
                loader: 'html-loader',
                exclude: [
                    /node_modules/
                ]
            }
            // {
            //     test: /\.(vue|js)$/,
            //     loader: 'eslint-loader?cacheDirectory=true',
            //     enforce: 'pre',
            //     exclude: [
            //         /node_modules/,
            //         /lib/
            //     ],
            //     options: {
            //         // addfix: true
            //     }
            // }
        ]
    },
    resolve: {
        extensions: ['.js', '.scss', '.json', '.vue'],
        alias: {
            'src': path.resolve(__dirname, '../', 'src'),
            'assets': path.resolve(__dirname, '../', 'src/assets')
        }
    },
    plugins: [
        new VueLoaderPlugin(),
        new FriendlyErrorsWebpackPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development')
            }
        })
    ].concat(htmlWebpackPlugins)
} 