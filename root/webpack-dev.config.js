// WEBPACK CONFIG - DEV
// ---------------------------------------------

'use strict';

// IMPORTS
const path = require('path');
const merge = require('webpack-merge');
const validate = require('webpack-validator');
const common = require('./webpack-common.config.js');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

// PATHS
const static_path = path.resolve(__dirname, 'static');
const build_path = path.resolve(static_path, 'build');

const config_dev = {
    devtool: 'inline-source-map',
    output: {
        path: build_path,
        filename: 'js/[name].js'
    },
    plugins: [
        new ExtractTextPlugin('css/[name].css')
    ]
};

const config = merge(common, config_dev);

module.exports = validate(config);
