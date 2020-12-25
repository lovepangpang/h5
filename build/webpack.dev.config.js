const path = require('path');
const { merge } = require('webpack-merge');
const config = require('./webpack.config.js');
const webpack = require('webpack');
const ip = require('ip');

const resolvePath = (dir) => {
    return path.resolve(__dirname, '../', dir);
};

const ipThe = ip.address();
const port = '8086';

let devConfig = merge(config, {
    mode: 'development',
    devServer: {
        open: true,
        stats: 'errors-only',
        host: ipThe,
        contentBase:'./dist',
        watchContentBase: true,
        disableHostCheck: true,
        compress: true,
        sockPort: port,
        hot: true,
        port: port,
        sockHost: ipThe,
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
        overlay: {
            warnings: false,
            errors: true
        },
        before: function (app, server) {
            app.get('/', (req, res) => {
                var resHtml = `<!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <title>项目页面</title>
                    <style> * { list-style: none}</style>
                </head>
                <body>
                    <div>页面列表</div> 
                    <ul>`;
                for (let key in config.entry) {
                    if (key.indexOf('\/commons\/') === -1) {
                        resHtml += `<li><a href="${key}.html">${key}.html</a></li>`;
                    }
                }
                resHtml += `</ul>
                </body>
                </html>`;
                res.send(resHtml);
            });

            const chokidar = require('chokidar');
            const files = [
                path.join(__dirname, '../src/pages/**/*.html'),
                path.join(__dirname, '../src/pages/**/*.vue')
            ];
            const options = {
                followSymlinks: false,
                depth: 5
            };
            let watcher = chokidar.watch(files, options);

            watcher.on('all', _ => {
                server.sockWrite(server.sockets, 'content-changed');
            });
        }
    },
    devtool: 'cheap-eval-source-map',
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
});
// console.log('devConfig', JSON.stringify(devConfig.module.rules));
module.exports = devConfig;
