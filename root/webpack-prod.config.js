// WEBPACK CONFIG - PROD
// ---------------------------------------------

'use strict';

// IMPORTS
const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const strip_loader = require('strip-loader');
const common = require('./webpack-common.config.js');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

// PATHS
const build_path = path.resolve(__dirname, 'static', 'dist');

const config_prod = {
    output: {
        path: build_path,
        filename: 'js/[name].min.js',
        publicPath: '/static/dist/'
    },
    module: {
        rules: [
            {
                test: /\.(jpe?g|png|gif)$/i,
                loaders: [
                    'file-loader?name=images/[name].[ext]',
                    'image-webpack-loader?bypassOnDebug&optimizationLevel=7&interlaced=false'
                ]
            },
            {
                test: [ /\.js$/ ],
                loader: strip_loader.loader('console.log')
            }
        ]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            filename: 'js/common.min.js',
            minChunks: 2
        }),
        new ExtractTextPlugin('css/[name].min.css')
    ]
};

const config = merge(common, config_prod);

module.exports = config;
