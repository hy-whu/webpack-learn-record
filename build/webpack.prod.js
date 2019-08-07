const merge = require('webpack-merge')
const commonConfig = require('./webpack.common.js')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');  
//分离css文件，使其不要被一起打包到js文件中，注意【该包没有HMR功能，无法实时更新，一般在上线环境下使用】
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin'); 
//压缩css文件使用,但不知道为什么和课程讲的不一样，合并失败

const prodConfig =  {
  mode: 'development', //defalut production
  devtool:'cheap-module-source-map',
  module:{
    rules:[
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
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
  optimization: {
    minimizer: [new OptimizeCSSAssetsPlugin({})],
  },
  plugins:[
    new MiniCssExtractPlugin({
      filename: "[name].css",  //直接在index.html中被引用，走filename路径
      chunkFilename: '[name].chunk.css'
    })
  ]
  
}
module.exports = merge(commonConfig,prodConfig)