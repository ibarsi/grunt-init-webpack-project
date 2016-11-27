// WEBPACK CONFIG - COMMON
// ---------------------------------------------

'use strict';

// IMPORTS
const path = require('path');
const webpack = require('webpack');
const pkg = require('./package.json');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

// PATHS
const node_modules = path.resolve(__dirname, 'node_modules');
const bower_components = path.resolve(__dirname, 'bower_components');
const static_path = path.resolve(__dirname, 'static');

// POSTCSS
const postcssImport = require('postcss-import');
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

            return `${ static_path }/${ source }`;
        });

        return prev;
    }, {});

// VENDORS
entry.vendor = !assets || !assets.vendor ? [] : assets.vendor;

const config = {
    entry: entry,
    module: {
        preLoaders: [
            {
                test: /\.js$/,
                loader: 'eslint-loader'
            }
        ],
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015']
                }
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader?sourceMap=inline!postcss-loader?sourceMap=inline')
            }
        ]
    },
    postcss: function () {
        return [
            postcssImport,
            postcssNextCSS
        ];
    },
    resolve: {
        extensions: ['', '.js'],
        modulesDirectories: [
            node_modules,
            bower_components
        ]
    },
    plugins: [
        new webpack.BannerPlugin(banner),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            filename: 'common/common.min.js',
            minChunks: 2
        }),
        new webpack.ResolverPlugin(
            new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin(
                'bower.json', ['main']
            )
        )
    ]
};

module.exports = config;
