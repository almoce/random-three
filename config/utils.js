const merge = require('webpack-merge')
const fs = require('fs')

module.exports = {
    errorMsg (msg) {
        console.error(`\u001b[1m\u001b[31m${msg}\u001b[39m\u001b[22m`)
    },
    getArg ({ key, idx = 0 }, arg) {
        let value = ''
        if (idx) {
            return arg[idx]
        } else if (key) {
            const a = arg.filter(i => i.indexOf(`${key}=`) !== -1)
            if (a.length > 0) {
                value = a[0].split('=')[1]
            }
        }
        return value
    },
    getConfig (src, env) {
        // 检查是否存在文件
        if (!fs.existsSync(`${src}/app.js`)) {
            this.errorMsg(`No App found: ${src}/app.js`)
            return false
        }
        const config = require('./config.js')(src)
        const _config = env === 'production' ? require('./prod') : require('./dev')
        return merge(config, _config)
    }
}
