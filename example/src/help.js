const fs = require('fs');
const pa = require('path');

module.exports = function help(name) {
    name = name ? this.whoami(name) || 'help' : 'help';

    const path = pa.join(this.actRoot || './src', `./usage/${name}.txt`);

    fs.createReadStream(path).pipe(process.stdout);
};
