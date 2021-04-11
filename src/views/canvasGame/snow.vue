<template>
  <div id="gameBox">
    <canvas id="canvas" ref="canvas" width="800" height="500"></canvas>
    <!-- <button @click="begin">开始</button> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      snowStore: [],
      ballStore:[],
      ctx: {},
      inter: null,
      originY: 0,
      originX: 0,
      an: null,
      lastTime: null,
      image: '',
      lastTime2: null
    }
  },
  mounted() {
    // 是每一次生成时移动画布的原点  然后返回刚才状态  再生成 为了在不同地方生成雪花  每次移动画布
    this.init()
  },
  destroyed() {
    window.cancelAnimationFrame(this.an)
  },
  methods: {
    init() {
      this.ctx = this.$refs.canvas.getContext('2d')
      this.image = new Image()
      this.image.src = 'https://s2.ax1x.com/2019/05/25/VAY1nf.jpg'
      this.image.onload = ()=>{
        //  this.ctx.drawImage(image,0,0,800,500)
         this.lastTime = new Date().getTime()
         this.lastTime2 = new Date().getTime()
        //  let ctx = this.ctx
         this.customAnimation()
      }
    },

    customAnimation() {
      this.an = window.requestAnimationFrame(this.customAnimation)
      this.ctx.clearRect(0, 0, 800, 500);
      this.ctx.drawImage(this.image, 0, 0, 800, 500);
      this.createSnow(this.image)
    },
    createBall() {
      let x = Math.random()*700;
      let y = Math.random()*600;
      let radius = Math.max(Math.random()*50+50-40,20)
      var flag
      for(let i =0; i<this.ballStore.length;i++){
        flag = false
        let instance = Math.sqrt((x - this.ballStore[i].x) ** 2 + (y-this.ballStore[i].y) **2 )
        if(instance > this.ballStore[i].radius + radius + 20 ) {
          flag = true
        }
      }
      if(this.ballStore.length === 0 || flag) {
        this.ballStore.push({
          x: x,
          y: y,
          radius: radius
        })
      }
      // console.log(flag,'fals')
    },
    createSnow() {
      let now = new Date().getTime()
      if(now > this.lastTime+300 && this.snowStore.length < 500) {
        this.snowStore.push({x: (Math.random()*800+1), y: (Math.random()*5) ,radius: (Math.random()*5+2)})
        this.lastTime = now
      }
      if(now > this.lastTime2+1000 && this.ballStore.length < 50) {
        // this.snowStore.push({x: (Math.random()*800+1), y: (Math.random()*5) ,radius: (Math.random()*5+2)})
        // console.log('ball',this.ballStore)
        this.createBall()
        this.lastTime2 = now
      }
      this.snowMove()
      // this.ballMove()
       for (let i = 0, len = this.ballStore.length - 1; i < len; i++) {
        // let ballA = this.ballStore[i];
        // n^2暴力枚举每个气泡之间是否发生碰撞
        for (let j = i + 1; j < this.ballStore.length; j++) {
             this.ballStore[j];
            this.checkCollision(this.ballStore[i], this.ballStore[j]);
        }
    }
    },
    rotate(x, y, sin, cos, reverse) {
    return {
        x: (reverse) ? (x * cos + y * sin) : (x * cos - y * sin),
        y: (reverse) ? (y * cos - x * sin) : (y * cos + x * sin)
    };
},
    checkCollision(ball0, ball1) {
    // console.log(ball0, ball1)
    let dx = ball1.x - ball0.x,
        dy = ball1.y - ball0.y,
        dist = Math.sqrt(dx * dx + dy * dy);
    //collision handling code here
    if (dist < ball0.radius + ball1.radius) {
        //calculate angle, sine, and cosine
        let angle = Math.atan2(dy, dx),
            sin = Math.sin(angle),
            cos = Math.cos(angle),
            //rotate ball0's position
            pos0 = {x: 0, y: 0}, //point
            //rotate ball1's position
            pos1 = this.rotate(dx, dy, sin, cos, true),
            //rotate ball0's velocity
            vel0 = this.rotate(ball0.vx, ball0.vy, sin, cos, true),
            //rotate ball1's velocity
            vel1 = this.rotate(ball1.vx, ball1.vy, sin, cos, true);
        //collision reaction, swap the two velocities
        [vel0, vel1] = [vel1, vel0]; // ES6
        //update position - to avoid objects becoming stuck together
        let absV = Math.abs(vel0.x) + Math.abs(vel1.x),
            overlap = (ball0.radius + ball1.radius) - Math.abs(pos0.x - pos1.x);
        pos0.x += vel0.x / absV * overlap;
        pos1.x += vel1.x / absV * overlap;
        //rotate positions back
        let pos0F = this.rotate(pos0.x, pos0.y, sin, cos, false),
            pos1F = this.rotate(pos1.x, pos1.y, sin, cos, false);
        //adjust positions to actual screen positions
        ball1.x = ball0.x + pos1F.x;
        ball1.y = ball0.y + pos1F.y;
        ball0.x = ball0.x + pos0F.x;
        ball0.y = ball0.y + pos0F.y;
        //rotate velocities back
        let vel0F = this.rotate(vel0.x, vel0.y, sin, cos, false),
            vel1F = this.rotate(vel1.x, vel1.y, sin, cos, false);
        ball0.vx = vel0F.x;
        ball0.vy = vel0F.y;
        ball1.vx = vel1F.x;
        ball1.vy = vel1F.y;
        ball0.vx *= 0.99;
        ball0.vy *= 0.99;
        ball1.vx *= 0.99;
        ball1.vy *= 0.99;
    }
},
checkWalls(ball) {
    // let bounce = -0.95; // 碰撞墙面衰减系数
    if (ball.x + ball.radius > 800) {
        
        // ball.vx *= bounce;
        ball.x = 800 - ball.radius;
        // ball.x + 
    } else if (ball.x - ball.radius < 0) {
        ball.x = ball.radius;
        // ball.vx *= bounce;
    }
    if (ball.y + ball.radius > 500) {
        ball.y = 500 - ball.radius;
        // ball.vy *= bounce;
    } else if (ball.y - ball.radius < 0) {
        ball.y = ball.radius;
        // ball.vy *= bounce;
    }
},
    ballMove() {
      let that = this
      this.ballStore.forEach((item,index)=>{
        
        item.y+= (Math.random() < 0.5 ? 1 : -1) * (Math.random() * 2) + 5
        item.x+= (Math.random() < 0.5 ? 1 : -1) * Math.random() * 2 + 5
        console.log(index)
        // if(item.x>800 || item.y>500) {
        //   item.y-= (Math.random() < 0.5 ? 1 : -1) * (Math.random() * 2) + 5
        // item.x-= (Math.random() < 0.5 ? 1 : -1) * Math.random() * 2 + 5
        // }else {
          that.checkWalls(item)
          that.drawBall(item.x, item.y, item.radius)
        // }

       
      })
    },
    drawBall(x, y, radius) {
      console.log(y)
      let ctx = this.ctx
       ctx.save();
        ctx.translate(x, y);
        // ctx.lineWidth = this.lineWidth;
        ctx.fillStyle = 'red';
        ctx.beginPath();
        //x, y, radius, start_angle, end_angle, anti-clockwise
        ctx.arc(0, 0, radius, 0, (Math.PI * 2), true);
        // ctx.closePath();
        ctx.fill();
        ctx.restore();
    },
    snowMove() {
       this.snowStore.forEach((item,index)=>{
        item.y+= (Math.random()*5+2)/3
        if(item.y>500) {
          this.snowStore.splice(index,1)
        }else {
          this.drawSnow(item.x,item.y,item.radius)
        }
      })
    },
    drawSnow(x, y, radius) {
      // console.log(y)
      let ctx = this.ctx
       ctx.save();
        ctx.translate(x, y);
        // ctx.lineWidth = this.lineWidth;
        ctx.fillStyle = 'white';
        ctx.beginPath();
        //x, y, radius, start_angle, end_angle, anti-clockwise
        ctx.arc(0, 0, radius, 0, (Math.PI * 2), true);
        // ctx.closePath();
        ctx.fill();
        ctx.restore();
    }
    
  }
}
</script>
<style lang="less" scoped>
#canvas{
  background-image: url('https://s2.ax1x.com/2019/05/25/VAY1nf.jpg');
  background-size: 800px;
  background-repeat: no-repeat;
 }
</style>