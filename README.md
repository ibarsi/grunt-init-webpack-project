# README #

Outlined below are the steps needed to get the solution up and running from a clean initial pull from master.

## What is this repository for? ##

My personal Webpack configuration and workflow for front-end code, initialized via grunt-init.

### Feature Support: ###
* ES6 (ES2015)
* ESLint
* PostCSS
    * Import
    * NextCSS
* Flow
* Mocha

## How do I get set up? ##

Install grunt and grunt-init globally.

```
npm install -g grunt
npm install -g grunt-init
```

Install the template into your `~/.grunt-init/` folder.

```
git clone git@bitbucket.org:ibarsi/webpack_build.git ~/.grunt-init/webpack-project
```

Issue the `grunt init` command inside of your project.

```
cd project
grunt-init webpack-project
```

Follow the prompts.

Open project folder and install npm packages:

```
npm install
```

Build tasks are configured via npm scripts (can be seen in `package.json`).

```
npm run build       // Runs production build workflow.
npm run build-dev   // Runs development build workflow.
npm run watch       // Runs development build workflow and watches for changes.
```

## That's it! ##
Get crackin'

Also, best/funniest Webpack tutorial ever (helped me a ton): https://medium.com/@dtothefp/why-can-t-anyone-write-a-simple-webpack-tutorial-d0b075db35ed#.71afdq2bc

# TODOs #
1. Integrate flow with webpack build (not as a separate command).
2. Integrate mocha with webpack build (not as a separate command).
