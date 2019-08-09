const utils = require('loader-utils')

module.exports = function (source) {

  const options  = utils.getOptions(this);
  // console.log(this.query.name)
  // return source.replace('dell',options.name)
  const result = source.replace('dell',options.name)
  // this.callback(null,result)  
  //callback 可以返回更多参数
  const callback = this.async();
  //异步打包
  setTimeout(()=>{
    callback(null,result)  //异步操作使用async返回,底层调用的仍然是this.callback
  },1000)
}