/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: 鱼仙倌
 * @Date: 2020-11-10 14:36:09
 * @LastEditors: 鱼仙倌
 * @LastEditTime: 2020-11-10 18:06:12
 */
import sensors from 'sa-sdk-javascript/sensorsdata.min.js';

import config from '../config';
console.log(config)

/**** 事件名只支持 大小写字母 数字 _  中文和其它符号都不会显示到后台中 ***/
const sensorsTrackEventName = 'YG_HH';

const sensorsTrack = {
    // 初始化
    init(){
        console.log(process.env.NODE_ENV,'config.http.sensorsUrl[process.env.NODE_ENV]')
        sensors.init({
            server_url : config.http.sensorsUrl[process.env.NODE_ENV],
            heatmap: {
                //是否开启点击图，default 表示开启，自动采集 $WebClick 事件，可以设置 'not_collect' 表示关闭。
                // clickmap:'default', //开启之后事件名称 自动为$WebClick 我们是使用自定义名称
                //是否开启触达注意力图，not_collect 表示关闭，不会自动采集 $WebStay 事件，可以设置 'default' 表示开启。
                // scroll_notice_map:'not_collect'
             }
        })
    },
    // 区分用户 distinct_id有关
    login(userId) {
        sensors.login(userId);
    },
    quick() {
        sensors.quick('autoTrack'); //用于采集 $pageview 事件。
    },
    // 记录打卡页面
    trackPage(routeName, property) {
        
        // const diffChannel = {channel: utils.getStorage('channelId')}; //区分不同的channel
        // console.log("diffChannel",diffChannel);
        let eventNew = sensorsTrackEventName + routeName.replace(/.*?\/pages\//, '').replace('/index', '').replace(new RegExp(/\//g), '_');
        sensors.track(eventNew, {...property});
    },
    // 记录点击行为
    trackClick(eventName, property) {
        // const diffChannel = {channel: utils.getStorage('channelId')}; //区分不同的channel
        console.log(eventName, property,'eventName, property')
        let eventNew = sensorsTrackEventName + eventName;

        console.log('****** trackClick ****** ' + eventNew + ' **** ' + JSON.stringify(property));

        sensors.track(eventNew, {...property});
    },
    //按钮点击事件
    trackClickButton(property) {
        const eventName = 'click_button';
        this.trackClick(eventName, property);
    },
    //信息事件  可以将请求接口的结果发送  如登录失败
    trackMessage(event, options){
        const eventName = 'event_message';
        this.trackClick(eventName, {event, ...options});
    },
    trackOperate(eventName, property) {
        // const diffChannel = {channel: utils.getStorage('channelId')}; //区分不同的channel


        let eventNew = sensorsTrackEventName + 'Operate_' + eventName;

        let operate = property.operate;

        if (operate && operate.length) {

            operate = operate.substr(0, operate.length - 1);
            property.operate = operate;

            let times = operate.split('_').length;
            property.operateTime = times;
        }

        console.log('****** trackOperate ****** ' + eventNew + ' **** ' + JSON.stringify(property));

        sensors.track(eventNew, {...property});
    },
    // 补充信息页用于记录用户操作的缓存字符串
    addInfoCache: '',
}

export default sensorsTrack;
