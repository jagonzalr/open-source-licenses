

'use strict'

const path = require('path')
const webpack = require('webpack')
const eslintFormatter = require('react-dev-utils/eslintFormatter')
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin')

const srcPath = path.join(__dirname, '../src')
const staticPath = path.join(__dirname, '../src/assets')

let config = {
  target: 'web',
  node: {
    fs: 'empty',
    net: 'empty'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        enforce: 'pre',
        use: [
          {
            loader: 'eslint-loader',
            options: {
              formatter: eslintFormatter
            }
          }
        ],
        include: [srcPath, staticPath],
        exclude: [/node_modules/, /fontawesome-all.min.js/]
      },
      {
        test: /\.(svg|png|jpeg|jpg|gif|eot|ttf|woff|woff2)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192
            }
          }
        ]
      }
    ]
  },
  resolve: {
    mainFields: [ 'browser', 'main', 'module' ],
    extensions: [ '.js', '.mjs', '.json', '.jsx' ]
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new CaseSensitivePathsPlugin()
  ]
}

module.exports = config