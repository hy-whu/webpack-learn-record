const path = require('path')
const CopyrightWebpackPlugin = require('./plugin/copyright-webpack-plugin')

module.exports = {
  mode:'production',
  entry:{
    main: './src/index.js'
  },
  module:{
    rules:[{
      test: /\.js/,
      use:[{
        loader:path.resolve(__dirname,'./loaders/replaceLoader.js'),
        options: {
          name: 'ys'
        }
      }]
    }]
  },
  plugins:[
    new CopyrightWebpackPlugin()
  ],
  output:{
    filename:'[name]'.js,
    path: path.resolve(__dirname,'dist')
  }
}