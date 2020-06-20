module.exports = {
    root: __dirname,
    command: {
        example: {
            // 命令的别名
            alias: [
                'ex',
                '-e'
            ],
            // 命令的参数, 规则是 ‘--’开头表示参数全称，‘-’开头表示对应的简称
            // 在程序中，简称将会转换为全称，例如 '-a' 转换为 'param.all=[]'
            param: [
                '-a --all | `配置项描述` ',
                '-b --bail | `配置项描述` ',
                '-c --comment | `配置项描述` '
            ],
            handle(param) {
                if (param.all) {
                    process.stdout.write(`All: ${param.all}\n`);
                }
                if (param.bail) {
                    process.stdout.write(`Bail: ${param.bail}\n`);
                }
                if (param.comment) {
                    process.stdout.write(`Comment: ${param.comment}\n`);
                }
            }
        },
        'hello': {
            alias: ['h', '-h'],
            param: [],
            description: 'Print hello world.'
        }
    }
};
