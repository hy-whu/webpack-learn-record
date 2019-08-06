function getComponent() {

  //CodeSplit打包文件名为cacheGruop名加上分隔符再加上打包后所归属的js文件

	return import(/*webpackChunkName:"lodash"*/ 'lodash').then(({ default: _ }) => {
		var element = document.createElement('div');
		element.innerHTML = _.join(['Dell', 'Lee'], '-');
		return element;
	})
}


// 代码分割，和webpack无关
// webpack中实现代码分割，两种方式
// 1. 同步代码： 只需要在webpack.common.js中做optimization的配置即可,chunks:all
// 2. 异步代码(import): 异步代码，无需做任何配置，会自动进行代码分割，放置到新的文件中,chunks:async(默认)

document.addEventListener('click',()=>{
  getComponent().then(element => {
    document.body.appendChild(element);
  });
})

//异步导入库的时候会启用代码懒加载，即未使用的时候，不会加载vendors~lodash代码，这样页面首次加载快