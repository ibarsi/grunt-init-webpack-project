// WEBPACK CONFIG - COMMON
// ---------------------------------------------

'use strict';

// IMPORTS
const path = require('path');
const webpack = require('webpack');
const pkg = require('./package.json');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const FlowStatusWebpackPlugin = require('flow-status-webpack-plugin');

// PATHS
const src_path = path.resolve(__dirname, 'static', 'src');
const node_modules = path.resolve(__dirname, 'node_modules');
const bower_components = path.resolve(__dirname, 'bower_components');

// POSTCSS
const postcssImport = require('postcss-import');
const postcssAssets = require('postcss-assets');
const postcssNextCSS = require('postcss-cssnext');

// BANNER
const banner = `
=====
Title: ${ pkg.title }
Version: ${ pkg.version }
Author: ${ pkg.author.name }
Repository: ${ pkg.repository.url }
Date: ${ new Date().toISOString() }
=====
`;

// ASSETS
const assets = require('./assets.json');

let entry = !assets || !assets.js ? {} :
    assets.js.reduce((prev, curr) => {
        if (!prev || !curr || !curr.name || !curr.src) { return prev; }

        prev[curr.name] = curr.src.map(function (source) {
            if (!source) { return source; }

            return `${ src_path }/${ source }`;
        });

        return prev;
    }, {});

const config = {
    entry: entry,
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: [
                    node_modules,
                    bower_components
                ],
                use: [
                    'babel-loader',
                    'eslint-loader'
                ]
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract({
                    fallbackLoader: 'style-loader',
                    loader: [
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: 'inline'
                            }
                        },
                        'postcss-loader'
                    ]
                })
            },
            {
                test: /\.html$/,
                use: [
                    'extract-loader',
                    'html-loader'
                ]
            },
            {
                test: /\.(jpe?g|png|gif)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'images/[name].[ext]'
                        }
                    }
                ]
            },
            {
                test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'fonts/[name].[ext]'
                        }
                    }
                ]
            }
        ]
    },
    resolve: {
        extensions: [ '.js' ],
        modules: [
            'node_modules',
            'bower_components'
        ],
        descriptionFiles: [
            'package.json',
            'bower.json'
        ],
        mainFields: Object.keys(entry)
    },
    plugins: [
        new webpack.BannerPlugin({ banner }),
        new FlowStatusWebpackPlugin({
            failOnError: true
        }),
        new webpack.LoaderOptionsPlugin({
            options: {
                context: src_path,
                postcss: [
                    postcssImport,
                    postcssAssets,
                    postcssNextCSS
                ]
            }
        })
    ],
    cache: true
};

module.exports = config;
