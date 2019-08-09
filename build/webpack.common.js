const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const webpack = require('webpack')
const addAssetHtmlWebpackPlugin = require("add-asset-html-webpack-plugin")

module.exports = {
  entry: {
    main: './src/index.js'
  },
  resolve:{
    extensions:['.js','.jsx'],
    mainFiles: ['index','child'], //当只import文件夹时，会帮你自动导入文件夹下以下名字的文件，但是一般不这样配置对性能不好
    alias:{
      ys: path.resolve(__dirname, '../src/')  //import ys from ys等同于import ys from './src/'路径比较长的时候配置别名
    }
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
      use: [
        'babel-loader',
        {
          loader: 'eslint-loader',
          options:{
            fix: true,
            force: 'pre'  //强制提前使用
          }
        }
      ]
    }
    // {
    //   test: /\.(jpg|pbg|gif)$/,
    //   use: {
    //     loader: 'url-loader', //将图片转换为base64格式直接嵌入js文件中，适合比较小的图片
    //     options: {
    //       name: '[name]_[hash].[ext]',
    //       outputPath: 'images/',
    //       limit: 204800  //小于204800字节打包为base64，否则同file-loader
    //     }
    //   }
    // }
  ]
  },
  plugins:[
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    }), //打包时自动生成一个html并将bundle.js自动引入html中 
    new CleanWebpackPlugin({
      root: path.resolve(__dirname, '../')
    }),
    new addAssetHtmlWebpackPlugin({  //为htmlwebpackPlugin注入资源
      filepath: path.resolve(__dirname,'../dll/vendors.dll.js')
    }),
    new webpack.DllReferencePlugin({
      manifest: path.resolve(__dirname,'../dll/[name].manifest.json')
    })

    
  ],
  optimization: {
    splitChunks: {
      chunks: "all"
    }
  },
  output: {
    // publicPath: 'http://yourcdnsite.com',  //方便添加cdn
    filename: '[name].js',
    path: path.resolve(__dirname, '../dist') //绝对路径
  }
}