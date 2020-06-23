<template>
  <div class="outside" ref="outside">
    <input v-model="onlineImg" placeholder="sss" :title="imgUrl1">
    <input type="button" @click="loadImage" value="给帅照添加水印">
    <button value="请选择帅照" @click="getFile">请选择帅照</button>
    <div class="inside">
    <img :src="imgUrl1" alt="" :style="imgStyle">
    <img :src="imgUrl" alt="" :style="imgStyle">
    </div>
    <form name="form1">
      <input type="file" name="picpath" id="picpath" style="display:none;" ref="img" @change="readImg">
    </form>
  </div>
</template>

<script>
export default {
  data(){
    return {
      imgUrl: '',
      imgStyle: {
        width: '',
        height: ''
      },
      imgUrl1: '',
      onlineImg: ""
    }
  },
  created() {
  },
  methods: {
    loadImage() {
      let that = this
      let src = this.onlineImg
      if(!src) {
        return
      }
      let img = new Image();
      // 在线图片设置crossOrigin跨域
      if (src.indexOf(src) === 0) {
        img.crossOrigin = '*';
      }
      img.src = src;
      img.onload = () => {
        that.imgToCan(img)
        that.imgUrl1 = src
      };
      img.onerror = () => {
        
      }
    },
    getFile() {
      this.$refs.img.click()
    },
    readImg() {
      var reader = new FileReader();
      let that = this;
      // 将图片转成base64
      reader.readAsDataURL(this.$refs.img.files[0]);
      reader.onload = function(evt){
        var image = new Image()
        image.src = evt.target.result
        that.imgUrl1 = evt.target.result
        image.onload = function(){
          that.imgToCan(image)
        }
      }
    },
    imgToCan(image) {
 
      let canvas = document.createElement('canvas')
      let scale
      // 需要考虑图片展示比例
      let width,height
      if(image.height > 1500 && image.width<image.height) {
        scale = 0.25
      } else if(image.width < 400 || image.height < 400 ) {
        scale = 1
      } else {
        scale = 0.5
      }
      width = image.width*scale
      height = image.height*scale
      canvas.width = width
      canvas.height = height
      let ctx = canvas.getContext('2d')
      // 使用canvas读取图片
      ctx.drawImage(image, 0, 0, width, height);
      this.drawFont(ctx,width, height)
      let img = canvas.toDataURL('image/jpeg',1)
      this.imgStyle.width = width + 'px'
      this.imgStyle.height = height + 'px'
      this.imgUrl = img
    },
    drawFont(ctx,x, y) {
      var gradient = ctx.createLinearGradient(0,0,x*2,0);
        gradient.addColorStop("0","orange");
        gradient.addColorStop("0.3","yellow");
        gradient.addColorStop("0.4","blue");
        gradient.addColorStop("0.6","red");
        ctx.font = '30px bold, Songti SC';
        ctx.fillStyle = gradient;
        ctx.fillText('颜王雨帝你值得拥有', 0, y-10);
    }
  }
}
</script>
<style lang="less" scoped>
  .outside{
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    img{
      margin-top:30px;
      margin-left: 20px;
    }
    button {
      padding: 5px;
      background-color: brown;
      font-size:30px;
      color: white
    }
  }
</style>