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
    },
    {
      test: /\.(eot|ttf|svg)$/,
      use: ['file-loader',]
    },
    { 
      test: /\.js$/, 
      exclude: /node_modules/, //去掉node_modules里面的库
      use: [{
        loader: 'babel-loader'
      },{
        loader: 'imports-loader?this=>window'  //更改this指向
      }],
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
    new webpack.ProvidePlugin({
      //在一些我们导入的类库中会有一些比较老的地方，不可以使用import导入所需要的依赖
      //但是又必须有这些依赖才可以执行，我们知道ES6 module语法中模块间变量是无法共用的，
      //那么我们就可以在这个插件配置全局变量，以供不同模块使用
      $: 'jquery ',
      _join: ['lodash','join']
    })
  ],
  optimization: {
    usedExports: true ,//tree Shaking
    splitChunks: {
      chunks: "all"
    }
  },
 
  output: {
    // publicPath: 'http://yourcdnsite.com',  //方便添加cdn
  
    path: path.resolve(__dirname, '../dist') //绝对路径
  }
}