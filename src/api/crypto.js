import request from '@/utils/request'

export function crypto(data) {
    return request({
        url:'http://172.19.181.97:4000/test/crypto',
        method: 'post',
        data,
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        }
    })
}
export function upHistory(params) {
    return request({
        url:'http://172.19.181.97:4000/test/upHistory',
        method: 'get',
        params,
        // headers: {
        //     'Content-Type': 'application/json;charset=UTF-8'
        // }
    })
}

export function getHistory() {
    return request({
        url:'http://172.19.181.97:4000/test/getHistory',
        method: 'get',
        // params,
        // headers: {
        //     'Content-Type': 'application/json;charset=UTF-8'
        // }
    })
}
export function video() {
    return request({
        url:'http://localhost:3000/download',
        method: 'get',
        // data,
        // headers: {
        //     'Content-Type': 'application/json;charset=UTF-8'
        // }
    })
}