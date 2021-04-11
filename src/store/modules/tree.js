
import Vue from 'vue'
const state = {
   checkedNodes: [],
   checkedItems: [],
   roles: ['edit'] 
}

const mutations = {
    setCheckedNodes(state, nodes) {
        let node = JSON.parse(JSON.stringify(nodes))
        Vue.set(state,'checkedNodes',node)
    },
    setCheckedItem(state,checkedItem) {
        // let checkedItems = {state}
        // console.log(checkedItems,'checkedItems')
        let flag = state.checkedItems.every(item=>{
            return item.id !== checkedItem.id
        })
        if(flag) {
            checkedItem.type = "danger"
            state.checkedItems.push(checkedItem)
        }
        
    }, 
    delCheckedItem(state, item) {
        // let checkedItems = {state}
        console.log(item,'item')
        for(let i=0;i<state.checkedItems.length;i++) {
            console.log(state.checkedItems[i].id,item.id,'item.id')
            if(state.checkedItems[i].id == item.id) {
                console.log('sssssssssss')
                state.checkedItems.splice(i,1)
                break
            }
        }
        // let i = checkedItems.find({})
    }
}

const actions = {
    setCheckedNodes({commit}, nodes) {
        commit('setCheckedNodes',nodes)
    }

}

export default {
    namespaced: true,
    state,
    mutations,
    actions
  }
  