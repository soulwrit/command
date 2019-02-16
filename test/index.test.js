const Command = require('../src');
const { expect } = require('chai');

/* global describe,it, Symbol */
describe('Test Command Modules', () => {

    it('`Command` is a function', () => {
        expect(Command).is.an('function');
    });

    it('invalid options of `new Command`', () => {
        // const command = new Command();
        
        const errorOptions = [
            ''
        ];

    });
});
