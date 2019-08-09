import path from 'path'

const webpack = require('webpack')
module.exports ={
  mode:'development',
  entry: {
    vendors: ['react','react-dom','lodash']
  },
  output: {
    filename:'[name].dll.js',
    path: path.resolve(__dirname,'../dll'),
    library: '[name]'
  },
  plugins: [
    new webpack.DllPlugin({
      name: '[name]',
      path: path.resolve(__dirname, '../dll/[name].manifest.json')
    })
  ]
}


//首先可以使用项目中所需要引入的第三方模块，导入一个名为【name】.dll.js的文件中存储
//然后使用DllPlugin做映射，映射文件为同目录下的json文件
//当再次打包的时候，在common.js配置DllReferencePlugin，导入映射文件，这样就会使打包的外部导入库直接被引入
//节省了每次将外部库重新打包的时间
//不好的地方在于先要打包一次类库，再依据类库打包好的文件，再次打包其余的所有文件 