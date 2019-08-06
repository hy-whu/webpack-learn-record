const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const webpack = require('webpack')


module.exports = {
  entry: {
    main: './src/index.js'
  },
  module: {
    rules: [{
      test: /\.(jpg|pbg|gif)$/,
      use: {
        loader: 'file-loader',
        options: {
          name: '[name]_[hash].[ext]', //placeholder
          outputPath: 'images/'
        }
      }
    },{
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
    {
      test: /\.(eot|ttf|svg)$/,
      use: ['file-loader',]
    },
    { 
      test: /\.js$/, 
      exclude: /node_modules/, //去掉node_modules里面的库
      loader: "babel-loader",
    }
  ]
  },
  plugins:[
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    }), //打包时自动生成一个html并将bundle.js自动引入html中 
    new CleanWebpackPlugin({
      root: path.resolve(__dirname, '../')
    }),
  ],
  optimization: {
    splitChunks: {
      chunks: "all",
      minSize: 30000, //表示当导入的包大于30k时做代码分离
      minChunks: 1,  //导入的包必须被引用次数大于1
      maxAsyncRequests: 5, //最大分割数
      maxInitialRequests: 3,
      automaticNameDelimiter: '-', //文件名分隔符
      name: true,
      cacheGroups: {  //
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        },
        default:{
          priority: -20,
          reuseExistingChunk: true, //如果某个库被打包过，则不会被重新打包，直接复用
          filename: 'common.js'
        }
      }
    }
  },
  output: {
    // publicPath: 'http://yourcdnsite.com',  //方便添加cdn
    filename: '[name].js',
    path: path.resolve(__dirname, '../dist') //绝对路径
  }
}