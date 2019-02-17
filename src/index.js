const pa = require('path');
const logger = require('@writ/utils/src/logger');
const arrify = require('@writ/utils/src/arrify');
const getRootDir = require('@writ/utils/src/get.root-dir');
const typeif = require('@writ/utils/src/typeof');
const getOptions = require('./get-options');

/**
 * @class Command
 * @property {string} root your `cli-app` root dir
 * @property {string} actRoot command handler file dir
 * @property {object} action  commamd handlers
 * @property {object} orders  command set
 * @property {object} runtime currently executing command's infomation
 * @method start(argv<[array]>) start loader
 * @method invalid() print invaild infomation
 * @method whoami(enter<[string]>) find currently command's name
 * @method parse(input<[array|*]>) parse currently command's options
 */
class Command {

    /**
     * @param {object|string} options
     * @param {string} options.root your `cli-app` root dir
     * @param {string|object} options.action command handler, it is a dirname or an object
     * @param {object} options.order command detail info
     */
    constructor(options) {
        options = getOptions(options, this);
        this.root = options.root || getRootDir();

        switch(typeif(options.action)) {
            case 'string':
                this.actRoot = pa.resolve(this.root, options.action);
                break;
            case 'object':
                this.action = options.action;
                break;
            default: break;
        }

        this.orders = Object.assign({}, options.order);
        this.runtime = {
            enter: null, // user's command name
            input: null, // user's command opts
            order: 'help', // match command name
            prime: null, // currently command preset options
            param: [] // match command opts
        };
    }

    /**
     * handle currently executing command's invalid options
     * @public
     */
    invalid() {
        logger.warn(`This command ${this.runtime.order} do not exsit processing options`);
    }

    /**
     * start your `cli-project`
     * @param {array<>} argv part of the `process.argv`
     * @description you can fake the `process.argv`
     * @public
     */
    start(argv) {
        argv = !argv || argv === process.argv ? process.argv.slice(2) : arrify(argv);

        if(argv.length) {
            this.runtime.enter = argv[0];
            this.runtime.input = argv.slice(1);
            this.runtime.order = this.whoami() || this.runtime.order;
            this.runtime.prime = this.orders[this.runtime.order];
            this.runtime.param = this.parse();
        }

        let handler;
        const { order, param } = this.runtime;

        if(this.action && Reflect.has(this.action, order)) {
            handler = this.action[order];
        } else if(this.actRoot) {
            const paths = pa.normalize(this.actRoot + '/' + order + '.js');
            try {
                require.resolve(paths);
            } catch (error) {
                throw error;
            }
            handler = require(paths);
        }

        if(typeof handler === 'function') {
            handler.apply(this, param);
        } else {
            logger.erro(`This command ${order} do not exsit handler.`);
        }
    }

    /**
     * look for currently executing command
     * @param {string} enter find command's name
     * @public
     */
    whoami(enter) {
        const { orders } = this;
        enter = enter || this.runtime.enter;

        for(const key in orders) {
            if(enter === key) {
                return key;
            }
            const obj = orders[key];

            if(obj && typeof obj === 'object') {
                const alias = [].concat(obj.alias);

                if(alias.indexOf(enter) > -1) {
                    return key;
                }
            }
        }

        logger.warn(`'${enter}' is not a built-in command, Has been redirected to 'help', ` +
            'namely: <command> help [param]');
    }

    /**
     * parse currently executing command options
     * @param {array|*} input command options
     * @public
     */
    parse(input) {
        const param = arrify(this.runtime.prime.param);
        input = arrify(input || this.runtime.input);

        if(param.length && input.length) {
            const keys = genKey(param);
            const obj = {};

            for(let key, tmp, arr = [], i = 0, value; i < input.length; i++) {
                value = input[i];
                tmp = getKey(keys, value);

                if(tmp) {
                    key = tmp;
                    obj[key] = obj[key] || [];

                    if(arr) {
                        obj[key].push(...arr);
                        arr = null;
                    }
                    continue;
                }

                if(obj[key]) {
                    obj[key].push(value);
                } else {
                    arr.push(value);
                }
            }

            return [obj];
        }

        return input;
    }
}

module.exports = Command;

function genKey(array) {
    const key = {};
    const blank = /\s+/;

    array.forEach(value => {
        const temp = value.split(blank);
        temp.forEach(item => {
            key[item] = temp[0];
        });
    });

    return key;
}

function getKey(key, str) {
    // const reg = /^-[A-Za-z0-9]+$/;
    str = key[str];
    if(str) {
        str = str.replace(/^(\.|-|_|\+|\||\\|\/|\s|=)+/, '');
        return str.trim().replace(/(\.|-|_|\+|\||\\|\/|\s|=)+\w/g, function(m) {
            return m.slice(-1).toUpperCase();
        });
    }
}
