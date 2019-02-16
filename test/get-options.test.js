/* global describe,it, Symbol */
const util = require('util');
const path = require('path');
const typeif = require('@writ/utils/src/typeof');
const { expect, assert } = require('chai');
const getOptions = require('../src/get-options');

function notReturnObject() { }
function returnObject() {
    return {};
}

describe('Command.options-get', () => {
    const invalidOptions = [11, '', null, undefined, [1], false, true, Symbol('any'), notReturnObject];
    const invalidStrings = invalidOptions.map(v => util.inspect(v)).join(', ');

    it('Incorrect example: ' + invalidStrings, () => {
        const optionsIsAnObject = 'Options is required, must be an object';
        invalidOptions.forEach(opts => {
            try {
                getOptions(opts);
            } catch (error) {
                assert.strictEqual(error.message, optionsIsAnObject, 'options type is not correct.');
            }
        });
    });

    const vaildOptions = [
        require('./options/.clirc'),
        returnObject,
        path.join(__dirname, './options/example.clirc.js'),
        path.join(__dirname, './options/example.clirc.json')
    ];
    const vaildStrings = [
        { root: '.', action: './src', usage: './src/usage', order: { help: { alias: ['h'], param: [] } } },
        '$PATH/.clirc.js',
        '$PATH/.clirc.json',
        returnObject
    ].map(v =>'\n'+ util.inspect(v)).join(',');

    it('Correct example: ' + vaildStrings, () => {
        vaildOptions.forEach(opts => {
            expect(typeif(getOptions(opts)) === 'object').true;
        });
    });
});
