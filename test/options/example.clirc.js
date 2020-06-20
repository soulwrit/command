module.exports = {
    root: '.',
    default: 'version',
    command: {
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
