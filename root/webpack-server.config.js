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
const src_path = path.join(__dirname, 'static', 'src');
const build_path = path.resolve(__dirname, 'static', 'server');
const node_modules = path.resolve(__dirname, 'node_modules');
const bower_components = path.resolve(__dirname, 'bower_components');

// ASSETS
const assets = require('./assets.json');

let modules = !assets || !assets.modules ? [] :
    [].concat.apply([], assets.modules.map(element => {
        return element.src.map(function (source) {
            if (!source) { return source; }

            return `${ src_path }/${ source }`;
        });
    })).filter(element => element.indexOf('.css') < 0);

// SHIM
let import_loaders = !assets || !assets.shim ? [] :
    assets.shim.map(module => ({
        test: require.resolve(module),
        loader: 'imports-loader?window=>{},setTimeout=>function() {}'
    }));

// ENV
process.env.BABEL_ENV = 'server';

const config_server = {
    output: {
        path: build_path,
        filename: 'server.min.js',
        publicPath: '/static/server/'
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loaders: [ 'babel' ],
                exclude: [
                    node_modules,
                    bower_components
                ]
            },
            {
                test: /\.(js|jsx)$/,
                loader: 'imports-loader?window=>{},setTimeout=>function() {}'
            },
            {
                test: /\.(jpe?g|png|gif)$/i,
                loaders: [
                    'file?name=images/[name].[ext]',
                    'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
                ]
            },
            {
                test: /\.(js|jsx)$/,
                loader: strip_loader.loader('console.log')
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
