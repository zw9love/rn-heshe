/**
 * Created by zw9love on 2018/5/17.
 */
import 'whatwg-fetch'

// fetch能否解决https加密接口问题
export function fetchData(url, data = {}, fn) {

    // let apiAddr = 'http://127.0.0.1:8888/api'
    let apiAddr = 'http://127.0.0.1:9988/api'
    // let apiAddr = 'https://192.168.20.11:9989'
    // let apiAddr = 'http://v.juhe.cn/weather/index?format=2&cityname=%E4%B8%8A%E6%B5%B7&key=71efbb690b9bc9a389ad90502306c8cd'

    let option = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'token': 'debug'
        },
        body: JSON.stringify(data)
    }

    // Call fetch to see your interceptors in action.
    fetch(apiAddr + url, option).then(function (response) {
        return response.json()
    }).then(function (body) {
        if (fn) {
            fn(body)
        }
    }).catch(function (error) {
        console.log('request failed', error)
    })
}