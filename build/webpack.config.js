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
  module:{
    rules:[
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              modules: true
            }
          },
          'postcss-loader'
        ]
      },
    ]
  },
  plugins:[
    new webpack.HotModuleReplacementPlugin(),
  ],
 
  
}

module.exports = merge(commonConfig, devConfig)