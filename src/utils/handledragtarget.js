function proRandomStr(len) {
    let len = len || 32
    const origin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz123456789'
    let randomStr = ''
    let oriLen = origin.length
    for (let i = 0; i < len; i++) {
        randomStr += origin.charAt(Math.floor(Math.random()*oriLen))
    }
    return randomStr

}
export default class Handledragtarget{

    constructor(view) {
        this.$view = view
    }
    // 要知道往哪个组件里添加元素，元素的内容也要传过来
    addNewView(findkey, newView) {
        let view = this.findView(this.$view,findkey)
        view.slot.children.push({
            ...newView,
            key: proRandomStr(6) //需要一个随机的key
        })
    }
    delOldView(findkey) {
        // 不能删除最大的这个容器
        if( findkey == this.$view.key ) return
        // 应该找到这个key对应的父对象

    }
    findView(current,findkey) {
        // 结构出key  到时候找出  看看需要往哪个下面添加元素对象
        const { key, slot: { children } } = current;
        let result
        if(findkey == key) {
            result = current
        }else if(children && Array.isArray(children)) { 
            for(let item of children) {
                let child = this.findView(item,findkey)
                child & (result=child)
            }
        }
        return result
    }

    findViewParent(current,findkey) {
        let {key, slot:{children}} = current
        if(children && Array.isArray(children)) {
            children.forEach((item,index)=>{
                if(item.key == findkey) {
                    
                }


            })
        }
    }

}