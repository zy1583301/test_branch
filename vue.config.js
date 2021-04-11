/*
 * @Descripttion: 
 * @version: 
 * @Author: Andy
 * @Date: 2020-09-23 14:08:17
 * @LastEditors: 鱼仙倌
 * @LastEditTime: 2020-11-11 16:18:36
 */
const path = require('path')
const webpack = require('webpack');
const UglifyPlugin = require("uglifyjs-webpack-plugin");
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const port = process.env.port || process.env.npm_config_port || 5000
function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports={
  publicPath: '/',
  assetsDir: 'static',//静态资源目录名称
  lintOnSave: process.env.NODE_ENV === 'development',
  productionSourceMap: false,
  devServer: {
    open: true,
    port: 5000,
    // host: '172.19.181.97',
    proxy: {
      [process.env.VUE_APP_BASE_API]: {
      target: `http://172.19.181.97:4000`,
      changeOrigin: true,
        pathRewrite: {
          ['^' + process.env.VUE_APP_BASE_API]: ''
        }
      },
    }
  },
  // devServer:{
  //     disableHostCheck:true
  // },
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
     // 移除 prefetch 插件
    config.plugins.delete('prefetch')
    let plugins = [
      new CompressionWebpackPlugin({
        filename: '[path].gz[query]',
        algorithm: 'gzip',
        test: new RegExp(
          '\\.(' +
          ['js', 'css'].join('|') +
          ')$',
        ),
        threshold: 10240,
        minRatio: 0.8,
      }),
    ]
    // if (process.env.NODE_ENV !== 'development') {
    //   config.plugins = [...config.plugins, ...plugins]
    // }
    // if (process.env.NODE_ENV == "production") {
    //   // let b = {
    //   //   x:1
    //   // }
    //   // Object.assign(config.optimization,b)
      
    //   // console.log('produciton',config.optimization)
    //   config.mode = "production";
      
    //   // 为生产环境修改配置...
      
    //   // 将每个依赖包打包成单独的js文件
    //   var optimization = {
    //     runtimeChunk: "single",
    //     splitChunks: {
    //       chunks: "all",
    //       maxInitialRequests: Infinity,
    //       minSize: 0, // 依赖包超过20000bit将被单独打包
    //       cacheGroups: {
    //         vendor: {
    //           test: /[\\/]node_modules[\\/]/,
    //           name(module) {
    //             // get the name. E.g. node_modules/packageName/not/this/part.js
    //             // or node_modules/packageName
    //             const packageName = module.context.match(
    //               /[\\/]node_modules[\\/](.*?)([\\/]|$)/
    //             )[1];
    //             // npm package names are URL-safe, but some servers don't like @ symbols
    //             return `npm.${packageName.replace("@", "")}`;
    //           }
    //         }
    //       }
    //     },
    //     minimizer: [
    //       new UglifyPlugin({
    //         uglifyOptions: {
    //           compress: {
    //             // warnings: false,
    //             drop_console: true, // console
    //             drop_debugger: false,
    //             pure_funcs: ["console.log"] // 移除console
    //           }
    //         }
    //       })
    //     ],
    //   };
    //   Object.assign(config, {optimization}
    //   );
    // }
    config.plugin('define').use(webpack.DefinePlugin, [{//将环境变量变为
      'process.env': {
        VERSION_ENV: `"${process.env.VUE_APP_VERSION_ENV}"`,
        API_ENV: `"${process.env.VUE_APP_API_ENV}"`,
        VUE_APP_BASE_API: `"${process.env.VUE_APP_BASE_API}"`,
        VUE_APP_DOWN_API:`"${process.env.VUE_APP_DOWN_API}"`
      },
    }])
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