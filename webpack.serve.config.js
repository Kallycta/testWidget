const {merge} = require('webpack-merge');
const main = require('./webpack.main.config.js');

module.exports = merge(main, {
    mode: 'development',
    devtool: 'inline-source-map',
    output: {
        chunkFormat: 'array-push',
    },
    devServer: {
		allowedHosts: 'all'
    },
    performance: {
        maxEntrypointSize: 4194304,
        maxAssetSize: 4194304
    }
});
