// WEBPACK CONFIG - DEV
// ---------------------------------------------

'use strict';

// IMPORTS
const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const validate = require('webpack-validator');
const common = require('./webpack-common.config.js');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

// PATHS
const build_path = path.resolve(__dirname, 'static', 'build');

const config_dev = {
    devtool: 'inline-source-map',
    output: {
        path: build_path,
        filename: '[name]/[name].js',
        publicPath: '/static/build/'
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            filename: 'common/common.js',
            minChunks: 2
        }),
        new ExtractTextPlugin('[name]/[name].css')
    ]
};

const config = merge(common, config_dev);

module.exports = validate(config);
