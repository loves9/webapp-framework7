const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const path = require('path');

const baseWebpackConfig = require('./webpack.config.base')

function resolvePath(dir) {
  return path.join(__dirname, '..', dir);
}

let prodWebpackConfig = webpackMerge(baseWebpackConfig, {
  mode: 'production',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': require('../config/prod.env') // JSON.stringify('production'),
    }),
    new UglifyJsPlugin({
      uglifyOptions: {
        warnings: false
      },
      sourceMap: true,
      parallel: true
    }),
    new OptimizeCSSPlugin({
      cssProcessorOptions: {
        safe: true,
        map: { inline: false }
      }
    }),
    // new webpack.HotModuleReplacementPlugin(),
    // new webpack.NamedModulesPlugin(),
    // new VueLoaderPlugin(),

    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './index.html',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true,
      }
    }),
    new webpack.HashedModuleIdsPlugin(),
    new webpack.optimize.ModuleConcatenationPlugin(),
    // new MiniCssExtractPlugin({
    //   filename: 'app.css'
    // }),
    // new CopyWebpackPlugin([{
    //   from: resolvePath('static'),
    //   to: resolvePath('www/static'),
    // }])
  ]
});

module.exports = prodWebpackConfig;