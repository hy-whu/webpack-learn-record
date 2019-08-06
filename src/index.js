



document.addEventListener('click',()=>{
  import(/* webpackPrefetch:true */'./click').then(( {default: func} )=>{
		func()
	})
})

//当点击时才会异步加载点击模块。也就是0.js,这样会使首页加载利用率变高
//但是如果点击事件js代码可以在首页加载完后空余时间在加载进来，这样就不会使点击事件有延迟，这就是preLoading
//使用magic Comment语法webpackPrefetch:true 可以达到上面要求

