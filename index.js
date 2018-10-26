const pa = require('path');
const { path, logger, arrify, ini } = require('@writ/utils')('ini', 'logger', 'arrify', 'path');

module.exports = class Command {
    constructor(paths) {
        const options = this.getOption(paths);

        if(!options || !options.root) {
            throw new Error('No corresponding project was found');
        }

        this.pkgRoot = path.resolve(options.root);
        this.docRoot = path.resolve(options.usage);
        this.actRoot = path.resolve(options.action);

        this.author = options.author;
        this.order = Object.assign({}, options.order);

        this.runtime = {
            order: 'help'
        };
    }

    // 获取参数
    getOption(paths) {
        if(!paths) {
            throw new Error('This Options is a must, And that should be a `ini` or `json` file or an `object`');
        }

        switch(typeof paths) {
            case 'string':
                paths = paths.length ? path.resolve(paths) : pa.join(process.cwd(), '.fmrc.js');
                if(pa.extname(paths) === '.ini') {

                    return ini.parse(paths) || {};
                }
                return require(paths);
            case 'object':
                return paths;
            default: break;
        }
    }

    // 启动
    start(argv) {
        argv = arrify(argv);
        this.parse(argv);
        this.emit();
    }

    // 实行命令
    emit() {
        const { order, param } = this.runtime,
            paths = pa.normalize(this.actRoot + '/' + order + '.js');

        try {
            require.resolve(paths);
        }catch(error) {
            throw error;
        }
        const fn = require(paths);

        if(typeof fn === 'function') {
            fn.apply(this, param);
        }
    }

    // 解析参数
    parse(argv) {
        if(argv.length) {
            this.runtime.order = this.whoami(argv[0]) || this.runtime.order;
            this.runtime.param = this._parse(argv.slice(1));
        }

        return this;
    }

    // 查找命令
    whoami(target, verbose = true) {
        const { order } = this;

        for(const key in order) {
            if(target === key) {
                this.runtime.enter = key;

                return target;
            }
            const obj = order[key];

            if(obj && typeof obj === 'object') {
                const alias = [].concat(obj.alias);

                if(alias.indexOf(target) > -1) {
                    this.runtime.enter = target;

                    return key;
                }
            }
        }
        verbose && this.notFound(target);
    }

    _parse(arr) {
        const { order } = this.runtime,
            options = this.order[order];

        this.runtime.options = options;
        const sys = arrify(options.param);

        if(sys.length && arr.length) {
            const obj = {},
                index = [],
                keys = [],
                flat = sys.join(' ').split(/\s+/),
                regex = sys.map(v => new RegExp('^(' + v.split(/\s+/).join('|') + ')', 'i'));

            arr.forEach((val, idx) => {
                if(flat.includes(val)) {
                    index.push(idx);
                    for(let i = 0; i < regex.length; i++) {
                        if(regex[i].test(val)) {
                            const exec = /--(\w+)/g.exec(sys[i]);

                            if(exec) {
                                keys[index.length] = exec[1];
                                break;
                            }
                        }
                    }
                }
            });

            index.push(arr.length);
            index.reduce((prev, curr, idx) => {
                const key = keys[idx] ? keys[idx] : keys[idx + 1];

                if(key) {
                    const vals = arr.slice(idx === 0 ? prev : prev + 1, curr);

                    obj[key] ? obj[key].push(...vals) : obj[key] = [...vals];
                }

                return curr;
            }, 0);

            return [obj];
        }

        return arr;
    }

    // 指令不存在
    notFound(name) {
        name && logger.warn(`'${name}' is not a built-in order, \
        has been redirected to 'help', namely: fm help <param>`);
    }

    // 无效的处理项目
    invalid() {
        logger.warn('Invalid Processing Options');
    }
};
