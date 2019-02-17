# @soul/command

我的，用于cli程序构建时的命令参数解析[english](../readme.md)

## 大纲

* [特性](#features)
* [安装](#install)
* [用法](#usage)
* [日志](#changelog)
* [资源](#resources)

### [特性](#features)

* 合理的命令行参数解析
* 配置化、按需加载构建命令行应用程序
* 支持`SystemV`

### [安装](#install)

首先，你的[安装 node.js](https://github.com/tianlugang/docs/blob/master/en/installNodeJS.MD), 然后你才能使用它

```sh
   npm install @writ/command
```

### [用法](#usage)

1. 项目结构

   ```text
      ├─ doc/          `文档说明文件`
      ├─ src/          `源码目录`
      │  ├─ index.js   `入口点`
      ├─ test/         `测试代码`
      ├─ .gitignore    `git 忽略`
      ├─ .eslintrc.js  `eslint配置`
      ├─ license       `协议声明`
      ├─ package.json  `模块清单`
      └─ README.md     `说明文件`
   ```

2. 用法
   [你可以在此看到我提供的例子](./example)
   * 使用函数类型的配置启动程序,你可以在函数做一些事

   ```javascript
      #! /usr/bin/env node
      const Command = require('@writ/command');

      new Command(function(command) {
         return require('../.clirc');
      }).start();
   ```

   * 使用对象类型的配置启动程序

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

   * 使用字符串类型（配置文件的路径）的配置启动程序

   ```javascript
      #! /usr/bin/env node

      const Command = require('../../src');
      new Command('../example/.clirc.js').start();
   ```

3. 配置 [示例](./example/.clirc.js)

   * `options.root`[string] 你的 `cli-app` 的根目录
   * `options.action`[string|object] 命令的处理函数集合, 可以是一个对象或者一个处理函数的文件夹
   * `options.order`[object] 命令集的详情，请参考示例

4. API 说明
   在每个 `action`中, `this` 总是指向你实例化的`Command`的示例, 因此, 你可以使用`Command's`的方法与属性在任何一个`action`中.

   * `root`[string] 你的`cli-app's`的根目录
   * `actRoot`[string] 放置`action`的文件夹路径
   * `action`[object] `action`组成的对象
   * `orders`[object] 命名集合同`options.order`,即你传入的命令配置
   * `runtime`[object] 当前执行的命令的具体信息
   * start(argv<[array]>) 程序启动入口，你可以传入命令行的参数数组，也可以不用传入，另外你还可以伪造一个参数数组
   * whoami(enter<[string]>) 当前执行的命令是谁
   * parse(param<[array|*]>) 解析当前执行的参数
   * invalid() 打印一条提示无效参数的信息

### [日志](#changelog)

* 2018/10/24 上午9:38:45, 该包发布
* 2019/1/28 下午1:01:27, 添加测试模块
* 2019/2/16 下雨12:35:12, 添加使用说明

### [资源](#resources)

* [Node.js](https://nodejs.org/en/)