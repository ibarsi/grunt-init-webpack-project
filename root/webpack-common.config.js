// WEBPACK CONFIG - COMMON
// ---------------------------------------------

'use strict';

// IMPORTS
const path = require('path');
const webpack = require('webpack');
const pkg = require('./package.json');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

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
                loader: 'babel-loader',
                exclude: [
                    node_modules,
                    bower_components
                ]
            },
            {
                test: /\.js$/,
                loader: 'eslint-loader',
                exclude: [
                    node_modules,
                    bower_components
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
                        {
                            loader: 'postcss-loader',
                            options: {
                                sourceMap: 'inline',
                                plugins: [
                                    postcssImport,
                                    postcssAssets,
                                    postcssNextCSS
                                ]
                            }
                        }
                    ]
                })
            },
            {
                test: /\.html$/,
                loader: 'extract-loader!html-loader'
            },
            {
                test: /\.(jpe?g|png|gif)$/i,
                loaders: [
                    'file-loader?name=images/[name].[ext]'
                ]
            },
            {
                test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
                loaders: [
                    'file-loader?name=fonts/[name].[ext]'
                ]
            }
        ]
    },
    resolve: {
        extensions: [ '.js' ],
        modules: [
            'node_modules',
            'bower_components'
        ]
    },
    plugins: [
        new webpack.BannerPlugin(banner)
        // TODO: Do we need this?
        // new webpack.ResolverPlugin(
        //     new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin(
        //         'bower.json', Object.keys(entry)
        //     )
        // )
    ],
    cache: true
};

module.exports = config;
