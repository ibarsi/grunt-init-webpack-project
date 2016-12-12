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

// POSTCSS
const postcssImport = require('postcss-import');
const postcssNextCSS = require('postcss-cssnext');

// BANNER
const banner = `
=====
Title: ${ pkg.title }
Version: ${ pkg.version }
Repository: ${ pkg.repository.url }
Date: ${ new Date().toISOString() }
=====
`;

// ASSETS
const assets = require('./assets.json');

let entry = !assets || !assets.modules ? {} :
    assets.modules.reduce((prev, curr) => {
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
        preLoaders: [
        ],
        loaders: [
            {
                test: /\.(js|jsx)$/,
                loader: 'babel-loader'
            },
            {
                test: /\.js$/,
                loader: 'eslint-loader'
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
        extensions: ['', '.js', '.jsx'],
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
        )
    ]
};

module.exports = config;
