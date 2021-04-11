import { stat } from "fs"

// import { getTaskClass } from '@/api/manage'
const state = {
  terminalClientHeight: 0, // 终端可是区域高度（不包括tab高度）
  monacoEditor: null, // monacoEditor实例对象
  execuResult: {}, //执行结果
  logStr: '', // 执行日志
  manageId: '',
  listTab: 'list',
  resFiled: [], // 结果字段
  registerInfo: [], // 注册信息
  labelClassArr: [], //标签分类列表
  activeStep: 0, //,
  terminalTab: 'log',
  dataDir: '',
  seq: '',
  bufferData:''
}

const mutations = {
  setState: (state, params) => {
    state[params.key] = params.value
  },
  setBufferData:(state, data) =>{
    state.bufferData = data
  }
}

const actions = {
//   getLabelClassArr ({commit, state}){
//     return new Promise(resolve => {
//       if (state.labelClassArr.length) {
//         resolve()
//       }else {
//         getTaskClass().then(res => {
//           if (res.code === 0) {
//             commit('setState', {
//               key: 'labelClassArr',
//               value: res.datas
//             })
//             resolve()
//           }
//         })
//       }
//     })
//   }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
