'use strict';

// Basic template description.
exports.description = 'Initialize a Webpack project template.';

// Template-specific notes to be displayed after question prompts.
exports.after = 'You should now install build dependencies with _npm ' +
    'install_. After that, you may execute project tasks with _npm run build|build-dev|watch_ and ' +
    'install javascript packages with _bower install_ (must be initialized first via _bower init_). For ' +
    'more information about installing and configuring Webpack, please see ' +
    'the Getting Started guide:' +
    '\n\n' +
    'http://webpack.github.io/docs/tutorials/getting-started/';

// Any existing file or directory matching this wildcard will cause a warning.
exports.warnOn = '*';

// The actual init template.
exports.template = function(grunt, init, done) {
    init.process({
        type: 'project'
    }, [
        // Prompt for these values.
        init.prompt('name'),
        init.prompt('title'),
        init.prompt('author_name'),
        init.prompt('repository', function (value, data, done) {
            done(null, 'git@github.com:ibarsi/' + data.name);
        }),
        init.prompt('homepage')
    ], function(err, props) {
        props.version = '0.1.0';

        // Files to copy (and process).
        var files = init.filesToCopy(props);

        // Actually copy (and process) files.
        init.copyAndProcess(files, props, { noProcess: 'libs/**' });

        // NOTE: Must be matched up manually with package.json in /root (it gets overwritten).
        props["pre-commit"] = [
            "precommit-msg",
            "test",
            "lint"
        ];

        // NOTE: Must be matched up manually with package.json in /root (it gets overwritten).
        props.scripts = {
            "precommit-msg": "echo 'Pre-commit checks...' && exit 0",
            "lint": "eslint ./ --cache",
            "test": "nyc mocha --reporter spec --compilers js:babel-register --require ignore-styles static/src/**/*.test.js",
            "build": "npm test && flow && npm run build:dev && npm run build:prod",
            "build:dev": "webpack --config webpack-dev.config.js --progress --colors",
            "build:prod": "webpack --config webpack-prod.config.js --progress --colors -p",
            "watch": "npm run watch:dev | npm run watch:prod",
            "watch:dev": "npm run build:dev -- --watch",
            "watch:prod": "npm run build:prod -- --watch"
        };

        // NOTE: Must be matched up manually with package.json in /root (it gets overwritten).
        props.devDependencies = {
            "babel-core": "^6.14.0",
            "babel-eslint": "^6.1.2",
            "babel-loader": "^6.2.5",
            "babel-plugin-transform-flow-strip-types": "^6.14.0",
            "babel-plugin-transform-require-ignore": "0.0.2",
            "babel-polyfill": "^6.16.0",
            "babel-preset-es2015": "^6.14.0",
            "babel-register": "^6.18.0",
            "bower": "^1.7.9",
            "chai": "^3.5.0",
            "css-loader": "^0.25.0",
            "eslint": "^3.12.2",
            "eslint-loader": "^1.5.0",
            "eslint-plugin-compat": "^0.1.3",
            "eslint-plugin-flowtype": "^2.19.0",
            "eslint-plugin-react": "^6.5.0",
            "extract-loader": "^0.1.0",
            "extract-text-webpack-plugin": "^1.0.1",
            "flow-bin": "^0.32.0",
            "html-loader": "^0.4.4",
            "ignore-styles": "^5.0.1",
            "image-webpack-loader": "^3.1.0",
            "mocha": "^3.1.2",
            "nyc": "^8.4.0",
            "postcss-assets": "^4.1.0",
            "postcss-cssnext": "^2.8.0",
            "postcss-import": "^8.1.2",
            "postcss-loader": "^0.13.0",
            "strip-loader": "^0.1.2",
            "style-loader": "^0.13.1",
            "webpack": "^1.13.2",
            "webpack-merge": "^0.14.1",
            "webpack-validator": "^2.2.7"
        };

        // Generate package.json file, used by npm and grunt.
        init.writePackageJSON('package.json', props);

        // All done!
        done();
    });
};
