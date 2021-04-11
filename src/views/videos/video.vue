<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: 鱼仙倌
 * @Date: 2020-10-12 10:02:59
 * @LastEditors: 鱼仙倌
 * @LastEditTime: 2020-11-10 11:54:21
-->
<template>
    <div class='video'>
        <!-- <video width="1120" height="540" controls="controls" id="video" preload="auto"  :src="src"   >
            <source :src="src"   type="video/mp4">
        </video> -->
        <video src="http://172.19.181.97:4000/file/video" ref="video" controls="controls" type="video/webm"></video>
        <!-- <a href="http://localhost:3000/download">下载文件</a> -->
        <div v-show='!isError'>
                <video id="videobox" class="video-js vjs-default-skin vjs-big-play-centered vjs-16-9" controls preload="auto" webkit-playsinline="true" playsinline="true" type="application/x-mpegURL" allowsInlineMediaPlayback=YES  webview.allowsInlineMediaPlayback=YES  width='100%' ref='videoRef' x5-video-player-fullscreen="true" >
                   <source id="sourceBox" :src="videoSrc">
                   <p class="vjs-no-js">不支持播放</p>
                </video>
             </div>
             <div v-show='isError' class="errorTip"><p>视频出错了！</p></div>
    </div>
</template>

<script>
// import {video} from '@/api/crypto'
import videojs from 'video.js'
import 'videojs-contrib-hls'

export default {
    data() {
        return {
            // videoSrc:'http://192.168.43.162:4000/uploads/sintel.mp4',
            videoSrc:'http://ivi.bupt.edu.cn/hls/cctv1hd.m3u8',
         
            src:'http://down.soundaer.com/live/stream_89003_sd/playlist.m3u8?k=d708550fbd49c58a1b8a8412c8623277&t=1553687908',
            posterSrc:'https://matrimony001.100msh.net.cn/public/code/material/mp-7261-1554175849.jpg',
            isError:false

        }
    },
    methods:{
      
        
    },
    created() {
        // let a = new Buffer('Test data.')

        // var blob = new Blob([a])
        // window.URL.createObjectURL(blob)
        // console.log(blob,window.URL.createObjectURL(blob),'blob')
        // this.$axios.get('http://localhost:4000/file/video').then(res=>{
        //     console.log(res,'resss')
        // })
    },
    mounted() {
        videojs('videobox',{
                    bigPlayButton: true,
                    textTrackDisplay: true,
                    posterImage: true,
                    errorDisplay: false,
                    controlBar: false,
                    playbackRates: [0.5, 1, 1.5, 2],
                    ControlBar:{
                        customControlSpacer: true
                    }
                },
                function onPlayerReady(){
                    this.play();
                    setTimeout(() => {   //延时确保能监听到视频源错误
                        var mediaError = this.error();
                        if(mediaError!=null && mediaError.code){
                            this.isError=true
                            // Dialog.alert({
                            //     message: '啊哦，播放出错了。<br>请刷新重试，如无法播放建议您观看其它内容。',
                            //     confirmButtonText:'确定'
                            // }).then(() => {
                            //     this.goback();
                            // });
                        }
                    },1000);
                });        
             // player.width(this.videoW)   //设置播放器宽度

    }
}
</script>



