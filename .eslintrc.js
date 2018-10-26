module.exports = {
  "parserOptions": { // 设置解析器选项
    "ecmaVersion": 6, // 指定要使用的 ECMAScript 版本
    "sourceType": "module", //指定代码为 ECMAScript 模块
    "impliedStrict": false, // 不启用全局严格模式
    "allowImportExportEverywhere": false, // Import and export declarations can only appear at a program's top level.
    "codeFrame": false // Disable the code frame in the reporter. This is useful since some eslint formatters don't play well with it.
  },
  "env": { // 指定环境
    "node": true, // 启用Node.js环境
    "es6": true, // 启用 ES6 语法
    "browser": true
  },
  "extends": "eslint:recommended",
  "rules": {
    // 关闭严格模式.
    // 在 ECMAScript 模块中，总是处于严格模式语义下，严格模式指令也就没必要开启了。
    // 参考文献：1.http://eslint.cn/docs/rules/strict
    //         2.https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Strict_mode/Transitioning_to_strict_mode
    "strict": [
      "error",
      "never"
    ],
    // 总是使用大括号包裹代码块
    // 此规则目的在于，通过确保代码块使用了大括号包裹以避免bug的发生，并且增加代码的清晰度
    // 参考文献：1.http://eslint.cn/docs/rules/curly
    "curly": [
      "error",
      "all"
    ],
    // 表达式中的点号操作符应该和属性在同一行
    // 参考文献：1.http://eslint.cn/docs/rules/dot-location
    "dot-location": [
      "error",
      "property"
    ],
    // 该规则旨在维护代码的一致性，通过鼓励使用点号操作符来提高代码可读性。因此，当遇到不必要的方括号时，该规则将发出警告。
    // 参考文献：1.http://eslint.cn/docs/rules/dot-notation
    "dot-notation": [
      "error",
      {
        "allowPattern": "^[a-z]+(_[a-z]+)+$"
      }
    ],
    // 要求使用 === 和 !==
    // 参考文献：1.http://eslint.cn/docs/rules/eqeqeq
    "eqeqeq": [
      "error",
      "always"
    ],
    // 该规则旨在避免访问未经初始化的词法绑定以及跨 case 语句访问被提升的函数。
    // 为了保证词法声明语句只在当前 case 语句中有效，将你子句包裹在块中。
    // 参考文献：1.http://eslint.cn/docs/rules/no-case-declarations
    "no-case-declarations": "error",
    // 禁止使用空解构模式
    // 参考文献：1.http://eslint.cn/docs/rules/no-empty-pattern
    "no-empty-pattern": "error",
    // 禁止不必要的 .bind() 调用
    // 参考文献：1.http://eslint.cn/docs/rules/no-extra-bind
    "no-extra-bind": "error",
    // 禁用不必要的标签
    // 参考文献：1.http://eslint.cn/docs/rules/no-extra-label
    "no-extra-label": "error",
    // 总是在小数点前面和后面有一个数字，以明确表明是要创建一个小数。
    // 参考文献：1.http://eslint.cn/docs/rules/no-floating-decimal
    "no-floating-decimal": "error",
    // 允许使用短符号进行类型转换
    // 参考文献：1.http://eslint.cn/docs/rules/no-implicit-coercion
    "no-implicit-coercion": 0,
    // 禁止使用多个空格
    // 参考文献：1.http://eslint.cn/docs/rules/no-multi-spaces
    "no-multi-spaces": "error",
    // 禁止重新声明变量
    // 参考文献：1.http://eslint.cn/docs/rules/no-redeclare
    "no-redeclare": "error",
    // 禁止自我赋值
    // 参考文献：1.http://eslint.cn/docs/rules/no-self-assign
    "no-self-assign": [
      "error",
      {
        "props": false
      }
    ],
    // 禁用未使用过的标签
    // 参考文献：1.http://eslint.cn/docs/rules/no-unused-labels
    "no-unused-labels": "error",
    // 禁用冗余return语句
    // 参考文献：1.http://eslint.cn/docs/rules/no-useless-return
    "no-useless-return": 0,
    // 禁用 with 语句
    // 参考文献：1.http://eslint.cn/docs/rules/no-with
    "no-with": "error",
    // 禁止使用拖尾逗号
    // 参考文献：1.http://eslint.cn/docs/rules/comma-dangle
    "comma-dangle": [
      "error",
      "never"
    ],
    // 强制在逗号周围使用空格
    // 参考文献：1.http://eslint.cn/docs/rules/comma-spacing
    "comma-spacing": [
      "error",
      {
        "before": false,
        "after": true
      }
    ],
    // 逗号风格，要求逗号放在数组元素、对象属性或变量声明之后，且在同一行
    // 参考文献：1.http://eslint.cn/docs/rules/comma-style
    "comma-style": [
      "error",
      "last"
    ],
    // 禁止在计算属性内使用空格
    // 参考文献：1.http://eslint.cn/docs/rules/computed-property-spacing
    "computed-property-spacing": [
      "error",
      "never"
    ],
    // 禁止函数名和开始括号之间存在空格
    // 参考文献：1.http://eslint.cn/docs/rules/func-call-spacing
    "func-call-spacing": [
      "error",
      "never"
    ],
    // 强制 2 个空格缩进
    // 参考文献：1.http://eslint.cn/docs/rules/indent
    // "indent": ["error", 2],
    // 强制在对象字面量的键和值之间使用一致的空格
    // 参考文献：1.http://eslint.cn/docs/rules/key-spacing
    "key-spacing": [
      "error",
      {
        "beforeColon": false,
        "afterColon": true
      }
    ],
    // 强制关键字周围空格的一致性
    // 参考文献：1.http://eslint.cn/docs/rules/keyword-spacing
    "keyword-spacing": [
      "error",
      {
        "overrides": {
          "if": {
            "before": false,
            "after": false
          },
          "for": {
            "before": false,
            "after": false
          },
          "while": {
            "before": false,
            "after": false
          },
          "switch": {
            "before": false,
            "after": false
          },
          "catch": {
            "before": false,
            "after": false
          }
        }
      }
    ],
    // 强制使用一致的换行符风格
    // 参考文献：1.http://eslint.cn/docs/rules/linebreak-style
    // 【！！！特别注意】：window 系统中 git 在 checkout 文件时会把换行符 LF 转换为 CRLF， 但在提交时，会把换行符保存为 LF。
    // 如果配置了了 "unix" 设置，这将导致 linebreak-style 规则报告错误，因为 ESLint 检测到的是 CRLF。
    // 如果你使用 git，请在.gitattributes 文件中添加一行“*.js text eol=lf”来避免 git 对 .js 文件中的换行符进行转换。
    // "linebreak-style": ["error", "unix"],
    // "linebreak-style": ["error", "windows"],
    // 要求在块级注释之前有一空行, 要求在行级注释之前有一空行, 要求注释出现在块语句的开始位置
    // 参考文献：1.http://eslint.cn/docs/rules/lines-around-comment
    "lines-around-comment": [
      "error",
      {
        "beforeBlockComment": true,
        "beforeLineComment": true,
        "allowBlockStart": true
      }
    ],
    // 禁止使用 空格 和 tab 混合缩进
    // 参考文献：1.http://eslint.cn/docs/rules/no-mixed-spaces-and-tabs
    "no-mixed-spaces-and-tabs": "error",
    // 强制最大连续空行数为 2, 强制文件末尾的最大连续空行数为 2, 强制文件开始的最大连续空行数为 2
    // 参考文献：1.http://eslint.cn/docs/rules/no-multiple-empty-lines
    "no-multiple-empty-lines": [
      "error",
      {
        "max": 2,
        "maxBOF": 2,
        "maxEOF": 2
      }
    ],
    // 禁止在空行使用空白符, 禁止在注释块中使用空白符
    // 参考文献：1.http://eslint.cn/docs/rules/no-trailing-spaces
    "no-trailing-spaces": [
      "error",
      {
        "skipBlankLines": true,
        "ignoreComments": false
      }
    ],
    // 禁止 if 语句作为唯一语句出现在 else 语句块中
    // 参考文献：1.http://eslint.cn/docs/rules/no-lonely-if
    "no-lonely-if": "error",
    // 当有更简单的结构可以代替三元操作符时，该规则禁止使用三元操作符。
    // 参考文献：1.http://eslint.cn/docs/rules/no-unneeded-ternary
    "no-unneeded-ternary": "error",
    // 禁止在点号周围或对象属性之前的左括号前出现空白
    // 参考文献：1.http://eslint.cn/docs/rules/no-whitespace-before-property
    "no-whitespace-before-property": "error",
    // 强制在对象字面量、解构赋值 和 import/export 说明符的花括号中使用一致的空格
    // 参考文献：1.http://eslint.cn/docs/rules/object-curly-spacing
    "object-curly-spacing": [
      "error",
      "always"
    ],
    // 本规则旨在维护对象属性之间换行一致性
    // 参考文献：1.http://eslint.cn/docs/rules/object-property-newline
    "object-property-newline": [
      "error",
      {
        "allowMultiplePropertiesPerLine": true
      }
    ],
    // 要求尽可能地使用单引号
    // 参考文献：1.http://eslint.cn/docs/rules/quotes
    "quotes": [
      "error",
      "single"
    ],
    // 禁止在语句末尾使用分号 (除了消除以 [、(、/、+ 或 - 开始的语句的歧义)
    // 参考文献：1.http://eslint.cn/docs/rules/semi
    "semi": [
      "error",
      "always"
    ],
    // 标记修改用const关键字声明的变量
    // 参考文献：1.http://eslint.cn/docs/rules/no-const-assign
    "no-const-assign": "error",
    // 强制函数定义的小括号()之前加空格
    // 参考文献：1.http://eslint.cn/docs/rules/space-before-function-paren
    "space-before-function-paren": [
      "error",
      {
        "asyncArrow": "never",
        "anonymous": "never",
        "named": "never"
      }
    ],
    // 阻止在 for in 遍历过程中，由于不对结果进行筛选而导致意想不到的行为发生
    // 在使用 for in 遍历对象时，会把从原型链继承来的属性也包括进来。这样会导致意想不到的项出现
    // 参考文献：1.http://eslint.cn/docs/rules/guard-for-in
    // "guard-for-in": "error",
    // 禁止直接修改内建对象的属性
    // 参考文献：1.http://eslint.cn/docs/rules/gno-extend-native
    "no-extend-native": [
      "error",
      {
        "exceptions": [
          "Object",
          "String"
        ]
      }
    ],
    // 保持异常抛出的一致性，通过禁止抛出字面量和那些不可能是 Error 对象的表达式
    // 参考文献：1.http://eslint.cn/docs/rules/no-throw-literal
    "no-throw-literal": "error",
    // 禁止未使用过的变量, 所有命名参数必须使用
    // 参考文献：1.http://eslint.cn/docs/rules/no-unused-vars
    "no-unused-vars": [
      "error",
      {
        "args": "none"
      }
    ],
    // 禁止在单行代码块中使用空格
    // 参考文献：1.http://eslint.cn/docs/rules/block-spacing
    "block-spacing": [
      "error",
      "never"
    ],
    // 当命名变量时,要求使用骆驼拼写法.不检查属性名称.
    // 参考文献：1.http://eslint.cn/docs/rules/camelcase
    "camelcase": [
      "error",
      {
        "properties": "never"
      }
    ],
    // 大括号风格要求
    // 参考文献：1.http://eslint.cn/docs/rules/brace-style
    "brace-style": "error",
    // 要求或禁止文件末尾保留一行空行
    // 在非空文件中存在拖尾换行是一个常见的 UNIX 风格。它的好处同输出文件到终端一样，方便在串联和追加文件时不会打断 shell 的提示。
    // 参考文献：1.http://eslint.cn/docs/rules/eol-last
    "eol-last": [
      "error",
      "always"
    ],
    // 限制代码行的长度来提高代码的可读性和可维护性
    // 参考文献：1.http://eslint.cn/docs/rules/max-len
    "max-len": [
      "error",
      {
        "code": 120,
        "ignoreUrls": true,
        "ignoreComments": true,
        "ignoreRegExpLiterals": true
      }
    ],
    // 要求构造函数首字母大写
    // 参考文献：1.http://eslint.cn/docs/rules/new-cap
    "new-cap": [
      "error",
      {
        "properties": false
      }
    ],
    // 该规则旨在阻止 var 的使用，推荐使用 const 或 let
    // 参考文献：1.http://eslint.cn/docs/rules/no-var
    "no-var": "error",
    // 在构造函数中禁止在调用super()之前使用this或super
    // 在派生类的构造函数中，如果在调用 super() 之前使用 this 或 super，它将会引发一个引用错误。
    // 参考文献：1.http://eslint.cn/docs/rules/no-this-before-super
    "no-this-before-super": "error",
    // 使用rest参数而不是arguments
    // 参考文献：1.http://eslint.cn/docs/rules/prefer-rest-params
    // "prefer-rest-params": "error",
    // 使用扩展运算符而非.apply()
    // 在 ES2015 之前，必须使用 Function.prototype.apply() 调用可变参数函数。在 ES2015 中，可以使用扩展运算符调用可变参数函数。
    // 参考文献：1.http://eslint.cn/docs/rules/prefer-spread
    "prefer-spread": "error",
    // 禁止rest操作符和spread操作符之间出现空格
    // 参考文献：1.http://eslint.cn/docs/rules/rest-spread-spacing
    "rest-spread-spacing": "error",
    // 强制在 yield* 表达式中 * 右边使用空格
    // 参考文献：1.http://eslint.cn/docs/rules/yield-star-spacing
    "yield-star-spacing": [
      "error",
      "after"
    ]
  }
}
