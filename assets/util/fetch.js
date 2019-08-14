/**
 * Created by zw9love on 2018/5/17.
 */
import 'whatwg-fetch'
import qs from 'qs'
// fetch能否解决https加密接口问题
export function fetchData(url, methods = 'GET', data) {

    // let apiAddr = 'http://127.0.0.1:8888/api'
    let apiAddr = 'http://172.25.213.40:8080'
    // let apiAddr = 'https://scrm-test.vivo.com.cn'
    // let apiAddr = 'http://127.0.0.1:8080'
    // let apiAddr = 'https://192.168.20.11:9989'
    // let apiAddr = 'http://v.juhe.cn/weather/index?format=2&cityname=%E4%B8%8A%E6%B5%B7&key=71efbb690b9bc9a389ad90502306c8cd'
    let option
    let path = apiAddr + url
    if(methods === 'GET'){
        option = {
            method: methods,
            headers: {
                // 'Content-Type': 'application/json',
                // 'Content-Type': 'application/x-www-form-urlencoded',
                'token': 'debug',
                'authToken': 'be9ef6200a3f42b4a9bf35451b179d1f-1'
            }
        }
        path += '?' + qs.stringify(data)
    }else{
        option = {
            method: methods,
            headers: {
                // 'Content-Type': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
                'token': 'debug',
            },
            body: qs.stringify(data)
        }
    }

    console.log(path)
    return new Promise(function(resolve, reject){
        // Call fetch to see your interceptors in action.
        fetch(path, option).then(function (response) {
            return response.json()
        }).then(function (body) {
            resolve(body)
        }).catch(function (error) {
            // console.log('request failed', error)
            reject(error)
        })
    })
}