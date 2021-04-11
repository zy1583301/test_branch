/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: 鱼仙倌
 * @Date: 2020-11-25 14:41:21
 * @LastEditors: 鱼仙倌
 * @LastEditTime: 2020-11-26 13:49:51
 */
export default {
    state: {
        pages: {
            index: {
                name: "div",
                key: "0000",
                slot: {
                    text: '这是一个块状div，可以在拖入任意组件',
                    children: [],
                },
                props: {
                    style: {
                        zh: 'div鸭',
                        type: 'string',
                        current: 'width: 100%;height:100%;',
                    },
                    ref: 'origin'
                },
            }
        },
        currentView: null,
        currentPage: 'index'
    },
    mutations: {
        setCurrentView({pages,currentView},parmas) {

        },
        pushView({ pages, currentPage }, { key, data }) {
            // let vw = new UnitViewHandle(pages[currentPage]);
            // console.log(vw,'vwwwww')
            // vw.add(key, data)
            console.log(data,'xxx')
            
            const str = 'abcdefghiABCDEFGHI1234567890'
            data.key = str[Math.floor(Math.random()*str.length)] + str[Math.floor(Math.random()*str.length)]+str[Math.floor(Math.random()*str.length)]
            console.log(pages[currentPage],'pages[currentPage]pages[currentPage]pages[currentPage]')
            pages[currentPage].slot.children.push(data)

          },
    }
}