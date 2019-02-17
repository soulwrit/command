module.exports = {
    root: '.',
    action: {
        help() {
            process.stdout.write('...look help infomation\n');
        },
        version() {
            process.stdout.write('...v1.0.0\n');
        },
        example(param) {
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
    },
    order: {
        help: {
            alias: [
                '-h',
                '--help'
            ],
            param: []
        },
        version: {
            alias: [
                'v',
                'V',
                '-v',
                '--version'
            ]
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
            ]
        }
    }
}