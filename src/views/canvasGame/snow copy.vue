<template>
  <div id="gameBox">
    <canvas id="canvas" ref="canvas" width="800" height="500"></canvas>
    <button @click="begin">开始</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      snowStore: [],
      ctx: {},
      inter: null
    }
  },
  mounted() {
    // 是每一次生成时移动画布的原点  然后返回刚才状态  再生成 为了在不同地方生成雪花  每次移动画布
  },
  methods: {

    begin() {
      this.snowStore = []
      this.init()
   this.productSnow()
    this.snowMove()
  // this.ctx.save()
  //     this.productSnow()
  //       this.ctx.restore()
  //     let x = Math.random()*3 + 6
  //     this.ctx.translate(x,x)
  //     this.ctx.save()
  //     this.productSnow()
  //       this.ctx.restore()
    },
    move() {
      let ctx = this.ctx
      this.snowStore = this.snowStore.map((item)=>{
          item.y+=Math.random()*3 + 6
          return item
        })
        this.productSnow()
          ctx.save();//锁画布(为了保存之前的画布状态)
            ctx.translate(10, 10);//把当前画布的原点移到(10,10),后面的操作都以(10,10)作为参照点，默认原点为(0,0)
            //  this.productSnow()
          //把当前画布的原点移到(160,10),后面的操作都以(160,10)作为参照点，
            // ctx.clipRect(10, 10, 90, 90);//这里的真实坐标为左上(170,170)、右下(250,250)
            // ctx.clipRect(30, 30, 70, 70);
            // // drawScene(canvas);
            //  this.productSnow()
            ctx.restore();

    },
    init() {

      this.ctx = this.$refs.canvas.getContext('2d')
      this.ctx.clearRect(0,0,800,500)
      this.inter = null
      for(var i = 0; i<20; i++){
        let x = Math.floor(Math.random()*700)+20
        let y = Math.floor(Math.random()*20)+10
        let radius = Math.floor(Math.random()*6) + 2
        this.snowStore.push({x,y,radius})
      }
    },
    productSnow() {
       let ctx = this.ctx
      // 随机产生雪花 20片  位置随机   下落一段距离  消除  再随机生成20个
       this.snowStore.forEach((item)=>{
         let x = item.x
         let y = item.y
        //  let radius = item.radius
        ctx.beginPath()
        // ctx.strokeRect(x,y,radius,0,2*Math.PI);
        ctx.rect(x,y,5,5);
        ctx.fillStyle = 'white'
        ctx.fill()
        })
      

    },
    snowMove() {
      // let that = this
      // 产生个随机的半径数字   
    
     this.inter =  setInterval(() => {
        this.snowStore.forEach((item=>{
          this.clear(item.x,item.y)
        }))
        this.snowStore = this.snowStore.filter((item)=>{

          
          return item.y<500
        })
        this.snowStore = this.snowStore.map((item)=>{
          item.y+=2
          return item
        })
       
        this.productSnow()
      },10);
      setInterval(() => {
        for(var i = 0; i<20; i++){
        let x = Math.floor(Math.random()*700)+20
        let y = Math.floor(Math.random()*20)+10
        let radius = Math.floor(Math.random()*6) + 2
        this.snowStore.push({x,y,radius})
      }
      }, 1000);
     
    },
    clear(x,y) {
      // var canvas=document.getElementById('canvas');
			// var context=canvas.getContext('2d');
			
			// context.beginPath();
			// context.fillStyle="blue";
			// context.arc(200,200,100,0,360*Math.PI/180);
      // context.fill();
      let that = this
      that.ctx.clearRect(x,y,5,5);

			

    }
  }
}
</script>
<style lang="less" scoped>
#canvas{
  background-image: url(https://s2.ax1x.com/2019/05/25/VAY1nf.jpg);
  background-size: 800px;
  background-repeat: no-repeat;
}
</style>