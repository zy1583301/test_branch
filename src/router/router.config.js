import store from '@/store'
import Router from 'vue-router'
const RouterConfig = {
	mode: "hash", //hash history
	routes: Routers,
	scrollBehavior: function (to, from, savedPosition) {
		// console.log(to) // to：要进入的目标路由对象，到哪里去
		// console.log(from) // from：离开的路由对象，哪里来
		// console.log(savedPosition) // savePosition：会记录滚动条的坐标，点击前进/后退的时候记录值{x:?,y:?}
		// 从第二页返回首页时savedPosition为undefined
		if (savedPosition || typeof savedPosition === 'undefined') //后退
		{

		  //判断是否是相邻得tab（tab跳转一定要replace跳转），如果是，那么每次打开都是获取最新页面
		  if(typeof from.meta.tabs !== 'undefined' && from.meta.tabs.length > 0)
		  { //是tabs

		    //清空tabs之间切换缓存，tabs直接跳转是不需要缓存的，因为大家都是同级页面
		    from.meta.tabs.map(function(vo,index){
		      store.commit('delcachePageName',vo);
		    })

		  }else{ 
		  	//不是tabs

		    //后退到缓存页面，那么这里需要删除上一个页面的缓存，因为你要是再次打开，肯定要获取最新的页面数据 A-B-C 如果从C返回B肯定要把C的缓存删除，不然你从B-C，那就显示C的缓存了
		    store.commit('delcachePageName',from.name);
		  }

		  //后退滚动到上一次位置
		  if (savedPosition) { return savedPosition }

		} else { //前进

		  //前进把前进的页面加入到要缓存的组件中
		  store.commit('addcachePageName',to.name);

		  //前进滚动到顶部
		  return {x:0,y:0}

		}
	}
}