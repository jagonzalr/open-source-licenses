

'use strict'

const path = require('path')
const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const ManifestPlugin = require('webpack-manifest-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin')
const WebappWebpackPlugin = require('webapp-webpack-plugin')
const PreloadWebpackPlugin = require('preload-webpack-plugin')

const WebpackMd5Hash = require('webpack-md5-hash')
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const baseConfig = require('../config/webpack.base.js')

let config = Object.assign(baseConfig, {
  devtool: 'source-map',
  mode: 'production',
  stats: {
    colors: true,
    hash: true,
    timings: true,
    assets: true,
    chunks: true,
    chunkModules: true,
    modules: false,
    children: false
  },
  entry: {
    bundle: [
      'babel-polyfill',
      './src/index'
    ]
  },
  output: {
    filename: '[name].[chunkhash].js',
    path: path.join(__dirname, '../dist')
  },
  optimization: {
    minimize: true,
    runtimeChunk: {
      name: "runtime"
    },
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendor",
          priority: -20,
          chunks: "all"
        }
      }
    }
  }
})

const prodRules = [
  {
    test: /\.(js|jsx)$/,
    loader: require.resolve('babel-loader'),
    options: {
      cacheDirectory: true
    },
    exclude: /node_modules/
  },
  {
    test: /\.css$/,
    use: [
      'style-loader',
      MiniCssExtractPlugin.loader,
      'css-loader',
      'postcss-loader'
    ]
  },
  {
    test: /\.scss$/,
    use: [
      'style-loader',
      MiniCssExtractPlugin.loader,
      'css-loader',
      'postcss-loader',
      'sass-loader'
    ]
  },
  {
    test: /\.html$/,
    use: [
      {
        loader: 'html-loader',
        options: {
          attrs: [':data-src'],
          minimize: true
        }
      }
    ]
  }
]

const prodPlugins = [
  new CleanWebpackPlugin('dist', {}),
  new HtmlWebpackPlugin({
    template: './src/index.html',
    favicon: './src/assets/favicon.png',
    inject: true
  }),
  new MiniCssExtractPlugin({ filename: 'style.[chunkhash].css' }),
  new WebappWebpackPlugin({
    logo: './src/assets/favicon.png',
    cache: true
  }),
  new PreloadWebpackPlugin({
    rel: 'preload',
    as(entry) {
      if (/\.css$/.test(entry)) return 'style'
      if (/\.woff$/.test(entry)) return 'font'
      if (/\.png$/.test(entry)) return 'image'
      return 'script'
    }
  }),
  new WebpackMd5Hash(),
  new webpack.LoaderOptionsPlugin({ minimize: true, debug: false }),
  new SWPrecacheWebpackPlugin({
    cacheId: 'open-source-licences',
    filename: 'open-source-licences-worker.js',
    maximumFileSizeToCacheInBytes: 4194304,
    minify: true,
    navigateFallback: '/',
    staticFileGlobsIgnorePatterns: [/dist\/.*\.html/]
  }),
  new ManifestPlugin({
    seed: {
      "name": "Open Source Licences",
      "short_name": "OPL",
      "theme_color": "#ffffff",
      "start_url": '/'
    }
  }),
  // new BundleAnalyzerPlugin({
  //   openAnalyzer: true,
  //   generateStatsFile: false
  // }),
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('production'),
      BABEL_ENV: JSON.stringify('production')
    }
  })
]

prodRules.map((rule) => { config.module.rules.push(rule) })
prodPlugins.map((plugin) => { config.plugins.push(plugin) })
module.exports = config
