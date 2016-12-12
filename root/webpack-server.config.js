// WEBPACK CONFIG - SERVER
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
const build_path = path.resolve(__dirname, 'static', 'server');
const src_path = path.join(__dirname, 'static', 'src');

// ASSETS
const assets = require('./assets.json');

let modules = !assets || !assets.modules ? [] :
    [].concat.apply([], assets.modules.map(element => {
        return element.src.map(function (source) {
            if (!source) { return source; }

            return `${ src_path }/${ source }`;
        });
    })).filter(element => element.indexOf('.css') < 0);

// IMPORTS
let import_loaders = !assets || !assets.imports ? [] :
    assets.imports.map(module => ({
        test: require.resolve(module),
        loader: 'imports-loader?window=>{},setTimeout=>function() {}'
    }));

// ENV
process.env.BABEL_ENV = 'server';

const config_server = {
    output: {
        path: build_path,
        filename: 'server.min.js'
    },
    module: {
        loaders: [
            {
                test: [/\.js$/],
                loader: strip_loader.loader('console.log')
            },
            {
                test: /\.jsx?$/,
                loaders: ['babel'],
                exclude: /(node_modules)/
            }
        ].concat(import_loaders)
    },
    plugins: [
        new ExtractTextPlugin('server.min.css')
    ]
};

const config = merge(common, config_server);

config.entry = {
    server: modules
};

module.exports = validate(config);
