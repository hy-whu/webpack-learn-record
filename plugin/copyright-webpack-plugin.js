class CopyrightWebpackPlugin{
  constructor () {

  }
  apply(compiler){

    //同步操作函数
    compiler.hooks.compile.tap('CopyrightWebpackPlugin',(compilation)=>{
      
    })

    //异步操作函数
    compiler.hooks.emit.tapAsync('CopyrightWebpackPlugin',(compilation,callback)=>{
      compilation.assets['copyright.txt'] = {
        source: function(){
          return 'copyright by yus'
        },
        size: function() {
          return 16
        }
      }
      callback();
    })

    //该插件主要用于在打包过程某一生命周期对source源码，size大小等等做一些打包的操作
  }
}

module.exports = CopyrightWebpackPlugin