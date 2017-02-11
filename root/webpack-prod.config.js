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
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'images/[name].[ext]'
                        }
                    },
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            bypassOnDebug: true,
                            optimizationLevel: 7,
                            interlaced: false
                        }
                    }
                ]
            },
            {
                test: [ /\.js$/ ],
                use: [
                    strip_loader.loader('console.log')
                ]
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': { NODE_ENV: JSON.stringify('production') }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            filename: 'js/common.min.js',
            minChunks: 2
        }),
        new ExtractTextPlugin('css/[name].min.css'),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                screw_ie8: true,
                conditionals: true,
                unused: true,
                comparisons: true,
                sequences: true,
                dead_code: true,
                evaluate: true,
                if_return: true,
                join_vars: true
            },
            output: {
                comments: false
            }
        })
    ]
};

const config = merge(common, config_prod);

module.exports = config;
