const path = require('path')
const port = process.env.port || process.env.npm_config_port || 4000 
function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports={
  publicPath: '/',
  devServer: {
    port: port,
    open: true,
    },
  devServer:{
      disableHostCheck:true
  },
  configureWebpack: {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    name: '自定义项目',
    resolve: {
      alias: {
        '@': resolve('src')
      }
    }
  },
  chainWebpack: config => {
    // 其他配置
    // config.entry('main').add('babel-polyfill') // main是入口js文件
    // 其他配置
  },
	css: {
		loaderOptions: {
			less: {
				// modifyVars: {
				// 	/* less 变量覆盖，用于自定义 ant design 主题 */

				// 	/*
				// 	'primary-color': '#F5222D',
				// 	'link-color': '#F5222D',
				// 	'border-radius-base': '4px',
				// 	*/
        // },
        // prependData: '',
				javascriptEnabled: true
			}
		}
  },
}