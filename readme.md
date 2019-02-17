# @writ/command

Mime, Command parameter parsing for building cli applications.
[中文](./doc/README-zh.md)

## Table of Contents

* [Features](#features)
* [Install](#install)
* [Usage](#usage)
* [Change log](#changelog)
* [Resources](#resources)

### [Features](#features)

* elegant command line parameter parsing
* configure the build command line application

### [Install](#install)

[install node.js](https://github.com/tianlugang/docs/blob/master/en/installNodeJS.MD), Now, install and use this project

```sh
   npm install @writ/command
```

### [Usage](#usage)

1. Project Structure

   ```text
      ├─ doc/          `usage and intro files`
      ├─ src/          `source code`
      │  ├─ index.js   `entry points`
      ├─ test/         `test code`
      ├─ .gitignore    `git ignore`
      ├─ .eslintrc.js  `eslint format config`
      ├─ license       `agreement that`
      ├─ package.json  `table of modules with npm`
      └─ README.md     `description`
   ```

2. Usage
   [You can see my example here](./example)
   * Configuration using `function` types, You can do some work in the functions

   ```javascript
      #! /usr/bin/env node
      const Command = require('@writ/command');

      new Command(function(command) {
         return require('../.clirc');
      }).start();
   ```

   * Configuration using `object` types

   ```javascript
      #! /usr/bin/env node
      const Command = require('@writ/command');

      new Command({
         root: '.',
         order: {
            help: {
                  param: [],
                  alias: ['h', '-h']
            },
            version: {
                  alias: [
                     'v',
                     'V',
                     '-v',
                     '--version'
                  ]
            }
         },
         action: {
            help: require('../src/help'),
            version: require('../src/version')
         }
      }).start();
   ```

   * Configuration using `string` types

   ```javascript
      #! /usr/bin/env node

      const Command = require('../../src');
      new Command('../example/.clirc.js').start();
   ```

3. Options [example](./example/.clirc.js)

   * `options.root`[string] your `cli-app` root dir
   * `options.action`[string|object] command handler, it is a dirname or an object
   * `options.order`[object] command detail info

      ```javascript
         // for example: 
         module.exports = {
            root: '.',
            action: {
               example(param) {
                     if (param.all) {
                        process.stdout.write(`All: ${param.all.join(' ')}\n`);
                     }
                     if (param.bail) {
                        process.stdout.write(`Bail: ${param.bail.join(' ')}\n`);
                     }
                     if (param.comment) {
                        process.stdout.write(`Comment: ${param.comment.join(' ')}\n`);
                     }
               }
            },
            order: {
               // Declare the 'example` subcommand
               example: {
                     // example's alias
                     alias: [
                        'ex',
                        '-e'
                     ],
                     // command parameters, the rule is the '--' beginning refers to the full name of the parameter, the '-' beginning refers to the corresponding abbreviation
                     // in a program, or will be converted to the full name, such as the '-a' convert 'param.all = []'
                     param: [
                        '--all -a',
                        '--bail -b',
                        '--comment -c'
                     ]
               }
            }
         }
      ```

      The above configuration implements a child command `<main-command-name> example param`, a command only `alias` and `param` two properties, and are currently only supports arrays, `param` statement for eachparamter in the code: `--<name> -<alias>`, all will be used in the corresponding `action`, referred to as "only to belong to convenient

4. API intro
   In each `action`, `this` always points to your `Command` instances, So, you can use `Command's` methods and properties in each `action`.

   * `root`[string] your `cli-app's` root dir
   * `actRoot`[string] command handler file dir
   * `action`[object] commamd handlers
   * `orders`[object] command set
   * `runtime`[object] currently executing command's infomation
   * start(argv<[array]>)   start loader
   * whoami(enter<[string]>) find currently command's name
   * parse(param<[array|*]>) parse currently command's options
   * invalid() print invaild infomation

### [Change log](#changelog)

* Founded in Wed, 24 Oct 2018 01:38:45 GMT
* Add the test case, Mon, 28 Jan 2019 05:01:27 GMT
* Add usage, Sat, 16 Feb 2019 04:07:42 GMT

### [Resources](#resources)

* [Node.js](https://nodejs.org/en/)