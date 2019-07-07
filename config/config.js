const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

module.exports = (src) => {
    return {
        entry: path.resolve(src, 'app.js'),
        output: {
            path: path.resolve(src, '../build'),
            filename: "[name].[hash:5].js"
        },
        module: {
            rules: [
                {
                    test: /\.m?js$/,
                    exclude: /(node_modules|bower_components)/,
                    use: [{
                        loader: 'babel-loader',
                        options: {
                          presets: ['@babel/preset-env']
                        }
                    }, 'eslint-loader']
                },
                {
                    test: /\.scss$/,
                    use: [
                        "style-loader", // creates style nodes from JS strings
                        "css-loader", // translates CSS into CommonJS
                        "sass-loader" // compiles Sass to CSS, using Node Sass by default
                    ]
                }
            ]
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: path.resolve(src, 'index.html')
            })
        ]
    }
}