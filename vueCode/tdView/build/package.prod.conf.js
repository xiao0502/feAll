const webpack = require('webpack')
const merge = require('webpack-merge')
const config = require('../config')
const baseWebpackConfig = require('./package.base.conf')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const extractLess = new ExtractTextPlugin('/tdView.min.css')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = merge(baseWebpackConfig, {
    output: {
        filename: '[name].min.js'
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
                NODE_ENV: '"production"'
            }
        }),
        //new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            uglifyOptions: {
                ie8: false,
                output: {
                    comments: false,
                    beautify: false,
                },
                mangle: {
                    keep_fnames: true
                },
                compress: {
                    warnings: false,
                    drop_console: true
                }
            }
        }),
        extractLess,
        new OptimizeCSSPlugin({
            cssProcessorOptions: config.build.productionSourceMap ?
                {
                    safe: true,
                    map: {
                        inline: false
                    }
                } :
                {
                    safe: true
                }
        }),
        new CopyWebpackPlugin([
            // {output}/file.txt
            {
                from: `./src/components`,
                to: `./components`
            }
        ]),
    ]
})
