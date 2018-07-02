const webpack = require('webpack')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./package.base.conf')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const extractLess = new ExtractTextPlugin('/tdView.min.css')

module.exports = merge(baseWebpackConfig, {
    output: {
        filename: '[name].js'
    },
    module: {
        loaders: [{
            test: /\.less$/i,
            loader: extractLess.extract(['css-loader', 'less-loader'])
        }]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"development"'
            }
        }),
        extractLess
    ]
})
