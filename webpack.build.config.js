const path = require('path');
const {merge} = require('webpack-merge');
const TerserPlugin = require("terser-webpack-plugin");

const main = require('./webpack.main.config.js');

module.exports = merge(main, {
    mode: 'production',
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin(
            {
                extractComments: false,
            }
        )]
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "icallback.[contenthash].js",
        publicPath: '/',
        chunkFormat: 'array-push',
    },
    performance: {
        maxEntrypointSize: 1048576,
        maxAssetSize: 1048576
    },
    module: {
        rules: [
            {
                test: /\.(js|tsx|hbs?)$/,
                enforce: 'pre',
                exclude: /(node_modules|bower_components|\.spec\.js)/,
                use: [
                    {
                        loader: 'webpack-strip-block'
                    }
                ]
            }]
    }
});
