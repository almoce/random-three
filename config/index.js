const path = require('path')
const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const utils = require('./utils')

const argv = process.argv
const env = utils.getArg({ key: 'ENV' }, argv) || 'development'
const app = utils.getArg({ key: 'app', idx: 3 }, argv) || 'sample'
const srcDir = path.resolve(app, 'src')
process.env.NODE_ENV = env

const config = utils.getConfig(srcDir, env) || {}
console.log(`Start compile ${app}`)
const compiler = webpack(config)

if (env === 'development') {
    const devServer = config.devServer || {}
    devServer.port = devServer.port || 8080
    devServer.contentBase = config.output.path
    const serve = new WebpackDevServer(compiler, devServer)
    serve.listen(devServer.port)
} else {
    compiler.run((err, stats) => {
        console.log(`Finish compile ${app}`, err)
        console.log(
            stats.toString({
                chunks: false, // Makes the build much quieter
                colors: true // Shows colors in the     console
            })
        )
    })
}
