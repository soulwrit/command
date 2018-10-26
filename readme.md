# @soul/command

Command parameter parsing for building cli applications

## Table of Contents

* [Features](#features)
* [Install](#install)
* [Usage](#usage)
* [Change log](#changelog)
* [Resources](#resources)

### [Features](#features)

* The feature description ...

### [Install](#install)

This is a [Node.js](https://nodejs.org/en/) module available through the [npm registry](https://www.npmjs.com/).

Before installing, download and install Node.js,This version must be greater than `8.8` or higher, and must be required.

* [install node.js using n](https://github.com/tj/n)

(Unfortunately n is not supported on Windows yet. If you're able to make it work, send in a pull request!)

```sh
  curl -L https://git.io/n-install | bash
  n latest # n <version>
```

* [install node.js using nvm](https://github.com/creationix/nvm)

For Windows, download [nvm-windows](https://github.com/coreybutler/nvm-windows/releases)
And Others, To install or update nvm, you can use the install script using cURL:

```sh
  # use curl
  curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | bash

  # use wget
  wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | bash
```

Now, install and use this project

```sh

   npm install @writ/command

```

### [Usage](#usage)

1. Project Structure

   ```text
      ├─ doc/          `build scripts`
      ├─ src/          `source code`
      │  ├─ index.js   `entry points`
      ├─ test/         `source code`
      │  ├─ index.js   `test scripts`
      ├─ .babelrc      `babel transform options`
      ├─ .gitignore    `git ignore`
      ├─ .eslintrc.js  `eslint format config`
      ├─ license       `agreement that`
      ├─ package.json  `table of modules with npm`
      └─ README.md     `description`
   ```

2. Usage

### [Change log](#changelog)

* Founded in Wed, 24 Oct 2018 01:38:45 GMT

### [Resources](#resources)

* [Node.js](https://nodejs.org/en/)