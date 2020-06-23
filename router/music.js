const express = require('express')
const request = require('request')
const router = express.Router()
const axios = require('axios')
// 获取推荐页列表
router.get('/disc',(req,res)=>{
    let url = 'http://ustbhuangyi.com/music/api/getDiscList?g_tk=1928093487&inCharset=utf-8&outCharset=utf-8&notice=0&format=json&platform=yqq&hostUin=0&sin=0&ein=29&sortId=5&needNewCode=0&categoryId=10000000&rnd=0.07173379566119986'
    request(url,(err,response,body)=>{
        res.header("Access-Control-Allow-Origin", "http://localhost:8080");
        res.send(body)
    })
})
// 获取歌词
router.get('/songlyric',(req,res)=>{
    let {mid} = req.query
    let url = `http://ustbhuangyi.com/music/api/lyric?g_tk=1928093487&inCharset=utf-8&outCharset=utf-8&notice=0&format=json&songmid=${mid}&platform=yqq&hostUin=0&needNewCode=0&categoryId=10000000&pcachetime=1571035409126`
    request(url,(err,response,body)=>{
        res.header("Access-Control-Allow-Origin", "http://localhost:8080");
        res.send(body)
    })
})
//获取详情页列表
router.get('/recom',(req,res)=>{
    let {dissid} = req.query
    let url = `http://ustbhuangyi.com/music/api/getCdInfo?g_tk=1928093487&inCharset=utf-8&outCharset=utf-8&notice=0&format=jsonp&disstid=${dissid}&type=1&json=1&utf8=1&onlysong=0&platform=yqq&hostUin=0&needNewCode=0`
    request(url,(err,response,body)=>{
        res.header("Access-Control-Allow-Origin", "http://localhost:8080");
        res.send(body)
    })
})
// 获取轮播图
router.get('/banner',(req,res)=>{         
    let url = `http://ustbhuangyi.com/music/api/getTopBanner`
    const data = {
        g_tk: '1928093487',
        inCharset: 'utf8',
        outCharset: 'utf-8',
        notice: '0',
        format: 'json',
        platform: 'yqq.json',
        hostUin: 0,
        needNewCode: 0,
        '-': 'recom6527403049163054',
        data: JSON.stringify({ 'comm': { 'ct': 24 }, 'category': { 'method': 'get_hot_category', 'param': { 'qq': '' }, 'module': 'music.web_category_svr' }, 'recomPlaylist': { 'method': 'get_hot_recommend', 'param': { 'async': 1, 'cmd': 2 }, 'module': 'playlist.HotRecommendServer' }, 'playlist': { 'method': 'get_playlist_by_category', 'param': { 'id': 8, 'curPage': 1, 'size': 40, 'order': 5, 'titleid': 8 }, 'module': 'playlist.PlayListPlazaServer' }, 'new_song': { 'module': 'newsong.NewSongServer', 'method': 'get_new_song_info', 'param': { 'type': 5 } }, 'new_album': { 'module': 'newalbum.NewAlbumServer', 'method': 'get_new_album_info', 'param': { 'area': 1, 'sin': 0, 'num': 10 } }, 'new_album_tag': { 'module': 'newalbum.NewAlbumServer', 'method': 'get_new_album_area', 'param': {} }, 'toplist': { 'module': 'musicToplist.ToplistInfoServer', 'method': 'GetAll', 'param': {} }, 'focus': { 'module': 'QQMusic.MusichallServer', 'method': 'GetFocus', 'param': {} } })
      }
      axios.get(url,{params:data}).then((response)=>{
        res.header("Access-Control-Allow-Origin", "http://localhost:8080");
        res.send(response.data)
    })
})
// 获取单首歌曲信息
router.get('/songUrl',(req,res)=>{
    let {songmid,songtype} = req.query
    let url =  `https://u.y.qq.com/cgi-bin/musicu.fcg?-=getplaysongvkey9728213402699808&g_tk=5381&loginUin=847006774&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=h5&needNewCode=0&data={"req_0":{"module":"vkey.GetVkeyServer","method":"CgiGetVkey","param":{"guid":"6048512643","songmid":${songmid},"songtype":${songtype},"uin":"0","loginflag":0,"platform":"23"}},"comm":{"uin":0,"format":"json","ct":24,"cv":0}}`
    axios.get(url).then(response=>{
        res.header("Access-Control-Allow-Origin", "http://localhost:8080");
       res.send(response.data)
    })
})
// 获取搜索结果
router.get('/search',(req,res)=>{
    let {keyword, page} = req.query
    let url1 = encodeURI(`http://ustbhuangyi.com/music/api/search?g_tk=1928093487&inCharset=utf-8&outCharset=utf-8&notice=0&format=json&w=${keyword}&p=${page}&perpage=20&n=20&catZhida=1&zhidaqu=1&t=0&flag=1&ie=utf-8&sem=1&aggr=0&remoteplace=txt.mqq.all&uin=0&needNewCode=1&platform=h5`)
    axios.get(url1).then(response=>{
        res.header("Access-Control-Allow-Origin", "http://localhost:8080");
       res.send(response.data.data)
    })
})
module.exports = router