/* global describe,it, Symbol */
const { expect, assert } = require('chai');

const Command = require('../src');
const options = require('./options/.clirc');

describe('Command', () => {
    it('`Command` is a function', () => {
        expect(Command).is.an('function');
    });

    it('`Command`.new', () => {
        expect(new Command(options)).instanceOf(Command);
    });

    const command = new Command(options);

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
