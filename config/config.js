const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

module.exports = src => {
    return {
        entry: path.resolve(src, 'app.js'),
        output: {
            path: path.resolve(src, '../build'),
            filename: '[name].[hash:5].js'
        },
        module: {
            rules: [
                {
                    test: /\.m?js$/,
                    exclude: /(node_modules|bower_components)/,
                    use: [
                        {
                            loader: 'babel-loader',
                            options: {
                                presets: ['@babel/preset-env']
                            }
                        },
                        'eslint-loader'
                    ]
                },
                {
                    test: /\.scss$/,
                    use: [
                        'style-loader', // creates style nodes from JS strings
                        'css-loader', // translates CSS into CommonJS
                        'sass-loader' // compiles Sass to CSS, using Node Sass by default
                    ]
                },
                {
                    type: 'javascript/auto',
                    test: /\.(png|jpe?g|gif|json|gltf)$/i,
                    loader: 'file-loader',
                    options: {
                        outputPath: 'assets'
                    }
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
