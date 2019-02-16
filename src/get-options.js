/**
 * get cli-app's options
 * @param {string|object|function} options
 * @returns {object}
 */
function getOptions(options) {
    if(typeof options === 'string' && /\.clirc\.js(on)?$/.test(options)) {
        try {
            options = require(options);
        } catch (error) {
            throw new Error('Incorrect profile path, it like `$PATH.clirc.js` or `$PATH.clirc.json`');
        }
    }

    if(typeof options === 'function') {
        options = options();
    }

    if(!options || typeof options !== 'object') {
        throw new Error('Options is required, must be an object');
    }

    return options;
}

module.exports = getOptions;
