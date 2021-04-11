/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: 鱼仙倌
 * @Date: 2020-11-25 15:07:13
 * @LastEditors: 鱼仙倌
 * @LastEditTime: 2020-11-26 13:51:53
 */
export default {
    name: "div",
    slot: {
        text: '这是一个块状div，可以在拖入任意组件',
        children: [],
    },
    props: {
        style: {
            zh: 'div鸭',
            type: 'string',
            current: 'width: 100%;',
        },
        ref: 'origin'
    },
}