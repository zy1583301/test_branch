<template>
    <div>
        <button @click="go">go</button>
        <input type="text" v-model="url" @change="qrCode">
        <div id="qrcode" ref="qrcode"></div>
    </div>
</template>

<script>
    import QRCode from 'qrcodejs2'
export default {
    data() {
        return {
            url:''
        }
    },
    mounted() {
        this.url = 'http://192.168.43.162:5000/qrcode/scan?name=yuge'
        this.qrCode()
    },
    methods:{
        qrCode () {
           this.$refs.qrcode.innerHTML = ''
            let url = this.url
            let qrcode = new QRCode('qrcode', {
                width: 150, //图像宽度
                height: 150, //图像高度
                colorDark : "#000000", //前景色
                colorLight : "#ffffff", //背景色
                typeNumber:4, 
                correctLevel : QRCode.CorrectLevel.H //容错级别 容错级别有：（1）QRCode.CorrectLevel.L （2）QRCode.CorrectLevel.M （3）QRCode.CorrectLevel.Q （4）QRCode.CorrectLevel.H
            })
            console.log(qrcode,'qqq')
            qrcode.clear() //清除二维码 

            qrcode.makeCode(url) //生成另一个新的二维码
        },
        go(url) {

            // this.$router.push('http://192.168.43.162:5000/scan')
            window.open('http://192.168.43.162:5000/qrcode/scan?name=yuge')
        }
    }
}
</script>