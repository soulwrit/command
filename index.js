const path = require('path');
const assert = require('assert'); 

function toArray(array, filter) {
    filter = typeof filter === 'function' ? filter : defaultFilter;

    if (Array.isArray(array)) {
        for (let i = 0; i < array.length; i++) {
            if (!filter(array[i])) {
                array.splice(i, 1);
                i--;
            }
        }

        return array;
    }

    const filtered = filter(array);
    return filtered ? [filtered] : [];
}

function defaultFilter(v) {
    return v != null && v !== '';
}

const S_OPT_REG = /^[\-][A-Za-z0-9]+$/;
const L_OPT_REG = /^[\-]{2}[^\.][A-Za-z0-9\-_.]+[^\.\-_]$/;
const SPLIT_SEP = '|';
const humpify = str => str
    .replace(/^(\.|-|_|\+|\||\\|\/|\s|=)+/, '').trim()
    .replace(/(\.|-|_|\+|\||\\|\/|\s|=)+\w/g, m => m.slice(-1).toUpperCase());
const defaults = {
    help: {
        alias: ['-h', '--help'],
        handle(name) {
            const spaces = ' '.repeat(8);
            const message = [];

            if (typeof name === 'undefined') {
                message.push(
                    'Usage: ' + this.name + ' <command> [options]\n',
                    'where <command> is one of:\n  ' + Object.keys(this.details).join(', ') + '\n',
                    this.name + ' help <command>' + ', quick help on <command>.',
                    this.name + ' help',
                    (this.package.description || '')
                );
            } else {
                name = this.which(name);
                const command = this.details[name];
                const usages = this.name + ' ' + name + ' [options]';
                const alias = command.alias ? command.alias : undefined;
                const options = Array.isArray(command.param)
                    ? command.param.map(v => v.split(/\n+/g).map(n => spaces + n).join('\n')).join('\n')
                    : undefined;

                message.push(
                    ' Usages:\n' + spaces + usages,
                    '  Alias:\n' + spaces + alias,
                    options.length ? 'Options:\n' + options : undefined,
                    '\nQuick help on `' + name + '`, Try `' + this.name + ' help ' + name + '` for more info.',
                    (command.desc || command.description || '')
                );
            }

            console.log(message.filter(v => !!v).join('\n'));
        }
    },
    version: {
        alias: ['-v', '--version'],
        handle() {
            const author = this.package.author || { name: '', email: '' };

            console.log(
                '©2018-' + new Date().getUTCFullYear() +
                '\nVersion: ' + this.package.version +
                '\nContributors: ' + author.name
            );
        }
    },
};

/**
 * @class Command
 * @property {PathLike} root your `cli-app` root dir
 * @property {Object} default  default executable command's name
 * @property {Object} modules  command's handler's directory
 * @property {Object} details  command set
 * @property {Object} context  command handler's context, default this
 * @method start(argv<Array>) start app
 * @method which(enter<String>) find currently command's name
 * @method parse(input<Array>,param<Array>) parse currently command's options
 * @method make(param<Array>) parse the `param`
 */
class Command {
    /**
     * @param {Object|Function|PathLike} options
     * @param {String} options.root    - your `cli-app`'s root-dir
     * @param {String} options.name    - your `cli-app`'s name
     * @param {Array}  options.modules - your `cli-app` command's handler's directory
     * @param {String} options.default - default execute command's name
     * @param {Object} options.context - command handle's context, default this
     * @param {Object} options.command - command detail info
     * @param {Array|String} options.command[key].alias - command's alias
     * @param {Array} options.command[key].param - command's options
     * @param {String} options.command[key].description - command's description, short name `desc`
     * @param {Function|PathLike} options.command[key].handle - command's handler, it is a function or a module's path.
     */
    constructor(options) {
        if (typeof options === 'string') {
            try {
                options = require(options);
            } catch (error) {
                throw new Error('The path `' + options + '` does not exsited.');
            }
        }

        typeof options === 'function' && (options = options(this));
        assert.ok(options && typeof options === 'object', 'Options is required, and must be an object.');
        assert.ok(typeof options.name === 'string' && options.name.trim().length, 'App\'s name is required, and must be valid string.');
        assert.ok(path.isAbsolute(options.root), 'Project\'root must be a absolute path.');

        this.root = options.root;
        this.name = options.name.trim();
        this.package = require(path.join(options.root, './package.json'));
        this.modules = ['./', 'lib'].concat(options.modules).filter((v, i, a) => !!v && a.indexOf(v) === i);
        this.details = Object.assign({}, defaults, options.command);
        this.default = options.default in this.details ? options.default : 'help';
        this.context = options.context || this;
    }

    /**
     * require object form this root
     * @param  {...any} args
     */
    require(...args) {
        let fn;
        const fnPath = path.resolve(this.root, ...args);

        try {
            fn = require(fnPath);
        } catch (error) {
            fn = null;
            assert.ok(error.code === 'MODULE_NOT_FOUND', error.message);
            // console.log(error)
        }

        return fn;
    }

    /**
     * start your `cli-project`
     * @param {array} argv part of the `process.argv`
     * @description you can fake the `process.argv`
     * @public
     */
    start(argv) {
        argv = !argv || argv === process.argv ? process.argv.slice(2) : toArray(argv);

        const name = this.which(argv[0]);
        const command = this.details[name];
        const param = this.parse(argv.slice(1), command.param);
        const handles = [];

        if (typeof command.handle === 'string') {
            command.handle = this.require(command.handle);
        }

        typeof command.handle === 'function' && handles.push(command.handle);
        this.modules.forEach(dir => handles.push(this.require(dir, name)));

        let noHandle = true;
        handles.forEach(handle => {
            if (typeof handle === 'function') {
                noHandle = false;
                handle.apply(this.context, param);
            }
        });

        noHandle && console.log(`${name} has not exsit process.`);
    }

    /**
     * look for currently executing command
     * @param {string} enter find command's name
     * @public
     */
    which(enter) {
        const details = this.details;

        if (enter) {
            for (const name in details) {
                if (enter === name) return name;
                const command = details[name];

                assert.ok(command && typeof command === 'object', 'Command Model must be an object.');
                if ([].concat(command.alias).indexOf(enter) > -1) return name;
            }

            console.log(`Cannot find '${enter}', has been redirected to default. \n`);
        }

        return this.default;
    }

    /**
     * pre built the pre-opt
     * @param {Array} param
     * @returns {Object}
     */
    make(param) {
        let pre = {};

        param.forEach(val => {
            const tmp = val.split(SPLIT_SEP);
            const desc = tmp.slice(1).join(SPLIT_SEP);
            const opts = tmp.slice(0, 1).join('').split(/\s+/);

            opts.forEach((val, idx, arr) => {
                if (!val) return;

                if (S_OPT_REG.test(val) || L_OPT_REG.test(val)) {
                    pre[val] = {
                        desc,
                        name: humpify(arr[1] || val)
                    };

                    return;
                }

                if (idx === 0) {
                    pre[val] = {
                        desc,
                        name: humpify(val)
                    };
                }
            });
        });

        return pre;
    }

    /**
     * parse currently executing command options
     * @param {array} input command user options
     * @param {array} param command pre options
     * @returns {Array}
     * @public
     */
    parse(input, param) {
        param = toArray(param);
        input = toArray(input);

        if (param.length && input.length) {
            let key, one;
            const pre = this.make(param);
            const arg = {};
            const arr = [];

            input.forEach(opt => {
                if (S_OPT_REG.test(opt)) {
                    let idx;
                    // split short options
                    opt.split('').slice(1).forEach(c => {
                        if ('-' + c in pre) {
                            const name = pre['-' + c].name;

                            idx = idx || name;
                            arg[name] = arg[name] || [];

                            return;
                        }

                        console.log('no such option: \'-' + c + '\'.');
                    });

                    key = idx || key;
                    one = one || key;
                    return;
                }

                if (L_OPT_REG.test(opt)) {
                    if (opt in pre) {
                        key = pre[opt].name;
                        one = one || key;
                        arg[key] = arg[key] || [];
                        return;
                    }

                    return console.log('no such option: \'' + opt + '\'.');
                }

                // BSD style, not support split
                if (opt in pre) {
                    key = pre[opt].name;
                    one = one || key;
                    arg[key] = arg[key] || [];

                    return;
                }

                key ? arg[key].push(opt) : arr.push(opt);
            });

            one && arg[one].unshift(...arr);

            for (const k in arg) {
                arg[k] = arg[k].join(' ').trim();
                arg[k] = arg[k].length ? arg[k] : true;
            }

            return [arg];
        }

        return input;
    }
}

module.exports = Command;