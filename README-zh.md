# @writ/command

我的，用于cli程序构建时的命令参数解析[english](./readme.md)

## 大纲

* [特性](#features)
* [安装](#install)
* [用法](#usage)
* [日志](#changelog)
* [资源](#resources)

### [特性](#features)

* 我的命令行参数解析
* 配置化、按需加载构建命令行应用程序

### [安装](#install)

首先，你的[安装 node.js](https://github.com/tianlugang/docs/blob/master/en/installNodeJS.MD), 然后你才能使用它

``` sh
   npm install @writ/command
```

### [用法](#usage)

1. 项目结构

``` text
   ├─ example/ `用例` 
   ├─ index.js `入口点` 
   ├─ test/ `测试代码` 
   ├─ .gitignore `git 忽略` 
   ├─ .eslintrc.js `eslint配置` 
   ├─ license `协议声明` 
   ├─ package.json `模块清单` 
   └─ README.md `说明文件` 
```

2. 用法

   [你可以在此看到我提供的例子](./example)
   * 使用函数类型的配置启动程序, 你可以在函数做一些事

``` javascript
    #!/usr/bin/env node

    const Command = require('@writ/command');

    new Command(function(command) {
        return require('../.clirc');
    }).start();
```

   * 使用对象类型的配置启动程序

``` javascript
   #!/usr/bin/env node

   const Command = require('@writ/command');

   new Command({
       root: __dirname,
       command: {
           hello: {
               alias: ['h', '-h'],
               param: [],
               handle() {
                   console.log('Hello world.');
               },
               description: 'Print hello world.'
           }
       }
   }).start();
```

   * 使用字符串类型（配置文件的路径）的配置启动程序

``` javascript
    #! /usr/bin/env node

    const Command = require('../../src');
    new Command('../example/.clirc.js').start();
```

3. 配置 [示例](./example/.clirc.js)

   * `options.root` [string] 你的 `cli-app` 的根目录
   * `options.command` [object] 命令集的详情，请参考示例

``` javascript
   // 例如
   module.exports = {
       root: __dirname,
       command: {
           // 声明 example 子命令
           example: {
               // 命令的别名
               alias: [
                   'ex',
                   '-e'
               ],
               // 命令的参数, 规则是 ‘--’开头表示参数全称，‘-’开头表示对应的简称
               // 在程序中，简称将会转换为全称，例如 '-a' 转换为 'param.all=[]'
               param: [
                   '-a --all `配置项描述` ',
                   '-b --bail `配置项描述` ',
                   '-c --comment `配置项描述` '
               ],
               handle(param) {
                   if (param.all) {
                       process.stdout.write( `All: ${param.all.join(' ')}\n` );
                   }
                   if (param.bail) {
                       process.stdout.write( `Bail: ${param.bail.join(' ')}\n` );
                   }
                   if (param.comment) {
                       process.stdout.write( `Comment: ${param.comment.join(' ')}\n` );
                   }
               }
           }
       }
   }
```

   上述配置实现了一个子命令 `<main-command-name> example [param]` , 一个命令只有 `alias` 与 `param` 两个属性, 且目前都只支持数组， `param` 中每个参数的声明规约: `--<全称> -<简称>` ，全程将用于对应的 `handle` , 简称仅仅为了属于方便

4. API 说明

   在每个 `handle` 中, `this` 总是指向你实例化的 `Command` 的实例, 因此, 你可以使用 `Command's` 的方法与属性在任何一个 `handle` 中.

   * `root` [string] 你的 `cli-app's` 的根目录
   * `modules` [string] 放置 `handle` 的文件夹路径
   * `default` [object] `handle` 组成的对象
   * `command` [object] 命名集合同 `options.order` , 即你传入的命令配置
   * `context` [object] 当前执行的命令的具体信息
   * start(argv<[array]>) 程序启动入口，你可以传入命令行的参数数组，也可以不用传入，另外你还可以伪造一个参数数组
   * whoami(enter<[string]>) 当前执行的命令是谁
   * parse(param<[array|*]>) 解析当前执行的参数
   * make(param<[array]>) 分析指定的选项

### [日志](#changelog)

* 2018/10/24 上午9:38:45, 该包发布
* 2019/1/28 下午1:01:27, 添加测试模块
* 2019/2/16 下午12:35:12, 添加使用说明
* 2019/10/18 晚上22:36:12, 重构，新增功能, 新增Posix风格短选项组合，新增BSD风格（暂不支持短选项合成）, 内置默认的 `help` 和 `version` 功能

### [资源](#resources)

* [Node.js](https://nodejs.org/en/)

