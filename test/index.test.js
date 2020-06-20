/* global describe,it, Symbol */
const util = require('util');
const path = require('path');
const { expect, assert } = require('chai');
const typeif = require('@writ/utils/src/typeof');

const Command = require('../');
const options = require('./options/.clirc');

function returnNonObject() { }
function returnObject() {
    return {};
}

describe('Command', () => {
    const invalidOptions = [1, '', null, undefined, [1], false, true, Symbol('any'), returnNonObject];
    const invalidStrings = invalidOptions.map(v => util.inspect(v)).join(', ');

    it('Incorrect options example: ' + invalidStrings, () => {
        const optionsIsAnObject = 'Options is required, and must be an object';
        invalidOptions.forEach(opts => {
            try {
                new Command(opts);
            } catch (error) {
                assert.strictEqual(error.message, optionsIsAnObject, 'options type is not correct.');
            }
        });
    });

    const vaildOptions = [
        returnObject,
        require('./options/.clirc'),
        path.join(__dirname, './options/example.clirc.js'),
        path.join(__dirname, './options/example.clirc.json')
    ];
    const vaildStrings = [
        {
            root: '.', action: './src',
            usage: './src/usage',
            order: {
                help: {
                    alias: ['h'],
                    param: []
                }
            }
        },
        '$PATH/.clirc.js',
        '$PATH/.clirc.json',
        returnObject
    ].map(v => '\n' + util.inspect(v)).join(',');

    it('Correct example: ' + vaildStrings, () => {
        vaildOptions.forEach(opts => {
            expect(typeif(new Command(opts)) === 'object').true;
        });
    });

    const command = new Command(options);

    it('`Command` is a constructor', () => {
        expect(command).is.an('function').instanceOf(Command);
    });

    it('`Command.start`', () => {
        let error;
        try {
            command.start(['-h']);
        } catch (err) {
            error = err;
        }

        assert.isUndefined(error);
    });

    it('`Command`.whoami', () => {
        let error;
        try {
            expect(command.whoami('-v') === 'version').true;
        } catch (err) {
            error = err;
        }

        assert.isUndefined(error);
    });

    it('`Command`.parse - no param', () => {
        let error;
        try {
            command.start(['-v']);
            expect(command.runtime.order).equals('version');
            assert.deepEqual(command.parse(['v']), ['v'], 'help no pre param');
        } catch (err) {
            error = err;
        }
        assert.isUndefined(error);
    });

    it('`Command`.parse - has param', () => {
        let error;
        try {
            command.start(['ex', '--all', 'hello', 'world', '!', '-b', 'busty', 'gril', '-mn']);
            expect(command.runtime.order).equals('example');

            const param = command.parse(['--bail', 'hello', 'china', '!']);
            assert.isArray(param);

            const obj = param[0];
            assert.isArray(obj.bail);
            assert.deepEqual(obj.bail, ['hello', 'china', '!']);

            command.start(['ex', 'this', 'is', '--all', '-a', 'a', '--bail',
                'do', 'you', 'understand', '--all', 'parameter', '--bail', '?', '-a', '.']);
        } catch (err) {
            error = err;
        }

        assert.isUndefined(error);
    });
});
