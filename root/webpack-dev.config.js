// WEBPACK CONFIG - DEV
// ---------------------------------------------

'use strict';

// IMPORTS
const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack-common.config.js');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

// PATHS
const build_path = path.resolve(__dirname, 'static', 'build');

const config_dev = {
    devtool: 'inline-source-map',
    output: {
        path: build_path,
        filename: 'js/[name].js',
        publicPath: '/static/build/'
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': { NODE_ENV: JSON.stringify('development') }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            filename: 'js/common.js',
            minChunks: 2
        }),
        new ExtractTextPlugin('css/[name].css'),
        new webpack.NamedModulesPlugin()
    ]
};

const config = merge(common, config_dev);

module.exports = config;
