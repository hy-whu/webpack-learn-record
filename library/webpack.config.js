const path = require('path')

module.exports = {
  mode: "production",
  entry: './src/index.js',
  externals:{
    lodash:{
      root: '_',  //script标签引入lodash库时，会产生一个_全局变量指向lodash
      commonjs: 'lodash', //通过commonjs mudule语法引入时，必须是const lodash = require('lodash')形式
    }
  },
  output:{
    path: path.resolve(__dirname,'dist'),
    filename:'library.js',
    library:'root',  //script标签引入library时，指向模块的全局变量名字
    libraryTarget:'umd' //支持引入的方式
  }
}