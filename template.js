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
        props["pre-commit"] = ["precommit-msg", "lint"];

        // NOTE: Must be matched up manually with package.json in /root (it gets overwritten).
        props.scripts = {
            "precommit-msg": "echo 'Pre-commit checks...' && exit 0",
            "lint": "eslint ./ --cache",
            "build": "webpack --config webpack-prod.config.js -p",
            "build-dev": "webpack --config webpack-dev.config.js",
            "watch": "webpack --config webpack-dev.config.js --watch",
            "flow": "flow; test $? -eq 0 -o $? -eq 2"
        };

        // NOTE: Must be matched up manually with package.json in /root (it gets overwritten).
        props.devDependencies = {
            "babel-core": "^6.14.0",
            "babel-eslint": "^6.1.2",
            "babel-loader": "^6.2.5",
            "babel-plugin-transform-flow-strip-types": "^6.14.0",
            "babel-preset-es2015": "^6.14.0",
            "bower": "^1.7.9",
            "css-loader": "^0.25.0",
            "eslint": "^3.6.0",
            "eslint-loader": "^1.5.0",
            "eslint-plugin-flowtype": "^2.19.0",
            "eslint-plugin-react": "^6.5.0",
            "extract-text-webpack-plugin": "^1.0.1",
            "flow-bin": "^0.32.0",
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
