module.exports = {
    root: '.',
    action: './src',
    usage: './src/usage',
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
        }
    }
};
