module.exports = function version() {
    const packageJson = require('../package.json');

    process.stdout.write(
        'name   : ' + packageJson.name +
        '\nauthor : ' + packageJson.author.name + '(copyright)' +
        '\nuptime : 2018-' + new Date().getFullYear() +
        '\n'
    );
};
