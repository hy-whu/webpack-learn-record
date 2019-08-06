const webpack = require('webpack')
const merge = require('webpack-merge')
const commonConfig = require('./webpack.common.js')

const devConfig = {
  mode: 'development', //defalut production
  devtool: 'cheap-module-eval-source-map', //当打包文件报错时，映射到index.js哪个地方出错
  devServer: {
    contentBase: './dist',
    open: true,
    port: 8080,
    hot: true,
    hotOnly: true
  },
  
  plugins:[
    new webpack.HotModuleReplacementPlugin(),
  ],
  optimization: {
    usedExports: true
  },
  
}

module.exports = merge(commonConfig, devConfig)