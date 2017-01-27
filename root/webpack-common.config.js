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
        loaders: [
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
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader?sourceMap=inline!postcss-loader?sourceMap=inline')
            },
            {
                test: /\.html$/,
                loader: 'extract-loader!html-loader'
            },
            {
                test: /\.(jpe?g|png|gif)$/i,
                loaders: [
                    'file?name=images/[name].[ext]'
                ]
            },
            {
                test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
                loaders: [
                    'file?name=fonts/[name].[ext]'
                ]
            }
        ]
    },
    postcss: function () {
        return [
            postcssImport,
            postcssAssets,
            postcssNextCSS
        ];
    },
    resolve: {
        extensions: [ '', '.js' ],
        modulesDirectories: [
            'node_modules',
            'bower_components'
        ]
    },
    plugins: [
        new webpack.BannerPlugin(banner),
        new webpack.ResolverPlugin(
            new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin(
                'bower.json', Object.keys(entry)
            )
        ),
        new webpack.NoErrorsPlugin(),
        new FlowStatusWebpackPlugin({
            failOnError: true
        })
    ],
    cache: true
};

module.exports = config;
