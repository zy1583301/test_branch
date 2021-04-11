<template>
    <div class="json">
        <div v-copy="a" v-dir1>哈哈</div>
        <div v-for="(item, index) in gathers" :key="item.id" style="display: inline-block;margin-right:20px">
        <span style="display: inline-block;margin-right:20px">{{item.value}}</span>
       <el-select v-model="parmeter['dict'+ item.id]" placeholder="请选择"
        size="small"
        :disabled="disabled(item.id)"
        >
            <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
            </el-option>
        </el-select>
    </div>
    <el-button type="primary" @click="reset" style="float: right;">
            重置
        </el-button>
    </div>
</template>
      
<script>
import t from './t.js'
console.log(m,a,'aaaaxxx')
import m,{a} from '@/common/test.js'
console.log(m,a,'aaaa')
a.m = 4455
// a = 5534
console.log(m,a,'ccccc')
export default {
    mixins: [t],
    data() {
        return {
            gathers: [
                {id: 'voc', value: 'voc'},
                {id: 'ethene', value: '烯烃'},
                {id: 'c2h2', value: '乙炔'},
                {id: 'nox', value: 'Nox'},
                {id: 'bhc', value: 'Nox'},
            ],
            parmeter: {
                dictvoc: '',
                dictethene: '',
                dictc2h2: ''
            },
            options: [
            {
                id:1,
                label: '十分之一',
                value: '10%'
            },
            {
                id:2,
                label: '一半',
                value: '50%'
            },

        ],
           a: 'haha',
           test: 0
        }
    },
    watch: {
        parmeter:{
            handler(val) {
                console.log(val,'val')
            },
            deep: true
        },
    },
    created() {
        console.log(this.test,'222')
        this.test = 1
    },
    methods: {
        reset() {
            this.parmeter = {
                dictvoc: '',
                dictethene: '',
                dictc2h2: ''
            }
        },
        disabled(id) {
            if(id!=='voc' && this.parmeter.dictvoc || id == 'voc' && this.getParmeterStatus()) {
                return true
            } else {
                return false
            }
        },
        getParmeterStatus() {
            let flag = false
            for(const key in this.parmeter) {
               if(key !== 'dictvoc' && this.parmeter[key]) {
                    flag = true
                    break
               }/*  */
            }
            return flag
        }
    }
}
</script>