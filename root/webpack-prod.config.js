// WEBPACK CONFIG - PROD
// ---------------------------------------------

'use strict';

// IMPORTS
const path = require('path');
const merge = require('webpack-merge');
const validate = require('webpack-validator');
const strip_loader = require('strip-loader');
const common = require('./webpack-common.config.js');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

// PATHS
const static_path = path.resolve(__dirname, 'static');
const build_path = path.resolve(static_path, 'dist');

const config_prod = {
    output: {
        path: build_path,
        filename: 'js/[name].min.js'
    },
    module: {
        loaders: [
            {
                test: [/\.js$/],
                loader: strip_loader.loader('console.log')
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('css/[name].min.css')
    ]
};

const config = merge(common, config_prod);

module.exports = validate(config);
