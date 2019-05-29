const utils = require('./utils');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge')
const CopyWebpackPlugin = require('copy-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')


const path = require('path');

const baseWebpackConfig = require('./webpack.config.base')

const config = require('../config')

function resolvePath(dir) {
  return path.join(__dirname, '..', dir);
}

let devWebpackConfig = webpackMerge(baseWebpackConfig, {
  mode: 'development',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': require('../config/dev.env') //JSON.stringify('development'),
    }),
    // new webpack.HotModuleReplacementPlugin(),
    // new webpack.NamedModulesPlugin(),
    // new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './index.html',
      inject: true,
    }),
    // new MiniCssExtractPlugin({
    //   filename: 'app.css'
    // }),
    // new CopyWebpackPlugin([{
    //   from: resolvePath('static'),
    //   to: resolvePath('www/static'),
    // }]),
    // new CopyWebpackPlugin([
    //   {
    //     from: path.resolve(__dirname, '../static'),
    //     to: config.build.assetsSubDirectory,
    //     ignore: ['.*']
    //   }
    // ])
  ]
});


// module.exports = devWebpackConfig

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port
      // add port to devServer config
      devWebpackConfig.devServer.port = port

      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://localhost:${port}`],
        },
        onErrors: config.dev.notifyOnErrors
        ? utils.createNotifierCallback()
        : undefined
      }))

      resolve(devWebpackConfig)
    }
  })
})
