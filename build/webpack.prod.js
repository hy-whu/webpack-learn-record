const merge = require('webpack-merge')
const commonConfig = require('./webpack.common.js/index.js.js')

const prodConfig =  {
  mode: 'development', //defalut production
  
}
module.exports = merge(commonConfig,prodConfig)