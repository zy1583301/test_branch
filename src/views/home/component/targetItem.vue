<template>
  <div class="first-catalog">
      <div class="first-title">
          <span>{{targetItem.paramValue}}</span>
          <div>
              <label>排序</label>
              <input type="text" style="width: 50px;" v-model.number="targetItem.order" @change="change" >
          </div>          
      </div>
      <div class="first-content-box">
        <div  class="first-content">
          <template v-for="child in splitCatalogList(targetItem.children, targetItem.more)">
              <template v-if="!child.children.length">
                  <span class="second-catalog-nochild" :key="child.id" :title="child.paramValue" :class="child.checked?'checked':''" @click="checkItem(child)">{{child.paramValue}}</span>
              </template>
              <template v-else-if="child.children.length">
                  <div class="second-catalog" :key="child.id">
                    <h4>{{child.paramValue}}</h4>
                    <div style="padding-left: 10px;" class="second-catalog-more">
                      <component v-for="item in splitCatalogList(child.children,child.more)" :key="item.id" :is="checkChildren(item)" class="third-catalog" :class="getClassName(item)">
                          <template v-if="item.children.length">
                            <h5 style="color: black"> {{item.paramValue}}</h5>
                            <div style="padding-left: 10px;" class="fourth-catalog">
                              <span v-for="it in splitCatalogList(item.children,item.more)" :key="it.id" class="fourth-catalog-item" :class="it.checked?'checked':''" :title="it.paramValue" @click="checkItem(it)">
                                {{it.paramValue}}
                              </span>
                            </div>
                              <div class="third-btn-group">
                                <div  v-if="item.more" @click="item.more=!item.more">
                                    <i class="el-icon-arrow-right"></i>
                                    <span>展示更多...</span>
                                </div>
                                <div  v-else-if="!item.more && item.children.length>4" @click="item.more=!item.more">
                                    <i class="el-icon-arrow-up"></i>
                                    <span>收起</span>
                                </div>
                              </div>
                          </template>
                          <template v-else>
                            <span class="third-catalog-nomore" :title="item.paramValue" :class="item.checked?'checked':''" @click="checkItem(item)">{{item.paramValue}}</span>
                          </template>
                      </component>
                    </div>
                    <div class="second-btn-group">
                        <div  v-if="child.more" @click="child.more=!child.more">
                            <i class="el-icon-arrow-right"></i>
                            <span>展示更多...</span>
                        </div>
                        <div  v-else-if="!child.more && child.children.length>4" @click="child.more=!child.more">
                            <i class="el-icon-arrow-up"></i>
                            <span>收起</span>
                        </div>
                      </div>
                  </div>
              </template>
          </template>
        </div>
        <div class="first-btn-group">
            <div v-if="targetItem.more" @click="targetItem.more=!targetItem.more">
              <i class="el-icon-arrow-right"></i>
              <span>展示更多...</span>
            </div>
            <div  v-else-if="!targetItem.more && targetItem.children.length>4" @click="targetItem.more=!targetItem.more">
              <i class="el-icon-arrow-up"></i>
              <span>收起</span>
            </div>
        </div>
      </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
    name: "TargetItem",
    props: {
      targetItem: {
          type: Object,
          required: true
      }
    },
    methods: {
      ...mapMutations({
        setCheckedItem: "tree/setCheckedItem",
        delCheckedItem:"tree/delCheckedItem"
      }),
      splitCatalogList(arr,flag) {
        if (arr.length <= 4 || !flag) {
          return arr
        } else {
          return arr.slice(0, 4)
        }
      },
      change() {
        this.$emit('submit')
      },
      checkChildren(item) {
        if(item.children.length) {
          return 'div'
        } else {
          return 'span'
        }
      },
      getClassName(item) {
        if(!item.children.length) {
          return 'third-catalog-nomore'
        } else {
          return ''
        }
      },
      checkItem(child){
        child.checked = !child.checked
        if(child.checked) {
          this.setCheckedItem(child)
        } else {
          this.delCheckedItem(child)
        }
        console.log(child.checked,'child')

      }
  }
}

</script>

<style lang='less' scoped>

.first-catalog {
    .first-title {
      display: flex;
      justify-content: space-between;
      background: #eee;
      height: 30px;
      line-height: 30px;
      /* margin: 10px 0; */
      padding-left: 20px;
      padding-right: 5px;
      border-left: 1px solid #ccc;
    }
    .first-content-box {
      .checked {
        background-color: rgba(255, 153, 153, 1);
        color: white!important;
        border-radius: 5px;
        /* border */
      }
      padding-top: 10px;
      padding-bottom: 10px;
      border: 1px solid #ccc;
      .first-btn-group {
        font-size: 14px;
        padding-left: 20px;
        color: #169BD5;
        font-weight: 700;
      }
      .second-btn-group {
        padding-left: 10px;
      }
      .third-btn-group {
        padding-left: 10px;
      }
    }
    .first-content {
      padding-left: 20px;
      .second-catalog-nochild {
        font-weight: 700;
        font-size: 14px;
        color: #169BD5;
        margin-right: 10px;
        padding: 10px;
        box-sizing: border-box;
        text-align: center;
        margin-bottom: 10px;
        display: inline-block;
        width: 21%;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
      }
    .second-catalog {
      margin-bottom: 10px;
      h4 {
        font-size: 14px;
        margin-bottom: 10px;
      }
      .second-btn-group {
        font-size: 14px;
        color:#169BD5;
        font-weight: 700;
        margin-top: 10px;
      }
      h5 {
        font-size: 14px;
        margin-bottom: 10px;
      }
      .third-catalog {
        margin: 10px 0;
        color: #169BD5;
        font-weight: 700;
        font-size: 14px;
        span.third-catalog-nomore{
          display:inline-block;
          width:25%;
          overflow:hidden;
          text-align: center;
          /* line-height: 30px;
          height: 30px; */
          padding: 10px;
          margin-right: 10px;
          text-overflow:ellipsis;
          white-space: nowrap;
        }
        .fourth-catalog{ 
            padding-left: 10%;
            span.fourth-catalog-item {
              display:inline-block;
              width:21%; 
              overflow:hidden;
              text-align: center;
              /* line-height: 30px;
              height: 30px; */
              padding: 10px;
              margin-right: 10px;
              text-overflow:ellipsis;
              white-space: nowrap;
            }
        }
        .activated {
          background-color: #169BD5;
          color: #fff;
          border: 1px solid #169BD5;
        }
        .more {
          padding-left: 10px;
          .el-button--text {
            text-decoration: underline;
          }
        }
      }
    }
  }
}
</style>