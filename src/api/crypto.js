import request from '@/utils/request'

export function crypto(data) {
    return request({
        url:'/crypto',
        method: 'post',
        data,
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        }
    })
}