module.exports = {
    root: '.',
    default: 'help',
    command: {
        help: {
            alias: [
                '-h',
                '--help'
            ],
            handle() {
                process.stdout.write('...look help infomation\n');
            }
        },
        version: {
            alias: [
                'v',
                'V',
                '-v',
                '--version'
            ],
            handle() {
                process.stdout.write('...v1.0.0\n');
            }
        },
        example: {
            alias: [
                'ex'
            ],
            param: [
                '--all -a',
                '--bail -b',
                '--comment -c',
                '--<name> -<alias>',
            ],
            handle(param) {
                if (param.all) {
                    process.stdout.write(`All: ${param.all.join(' ')}\n`);
                }
                if (param.bail) {
                    process.stdout.write(`Bail: ${param.bail.join(' ')}\n`);
                }
                if (param.comment) {
                    process.stdout.write(`Comment: ${param.comment.join(' ')}\n`);
                }
            }
        }
    }
}