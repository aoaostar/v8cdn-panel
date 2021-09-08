import axios from 'axios'
import Vue from 'vue';
import router from '@/router'
import V8CDN from "@/config"
import {
    logout
} from "@utils/functions"
var instance = axios.create({
    baseURL: V8CDN.apiUrl,
    timeout: '10000',
    //请求头设置
    headers: {
        "accept": "application/json",
        'Content-Type': 'application/json',
    }
});

instance.interceptors.request.use((config) => {
    let token = localStorage.getItem("token")
    if (token) {
        config.headers.common['Authorization'] = "Bearer " + token
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

//返回状态判断(添加响应拦截器)
instance.interceptors.response.use((res) => {
    //对响应数据做些事
    return res;
}, (error) => {
    if (error.response.status == 401) {
        logout()
        router.push({
            name: 'Login'
        })
    }
    Vue.prototype.$message.error(error)
    return Promise.reject(error);
});

//返回一个Promise(发送post请求)
export function fetchPost(url, params) {
    return new Promise((resolve, reject) => {
        instance.post(url, params)
            .then(response => {
                resolve(response.data);
            }, err => {
                reject(err);
            })
            .catch((error) => {
                reject(error)
            })
    })
}
// 返回一个Promise(发送get请求)
export function fetchGet(url, params) {
    return new Promise((resolve, reject) => {
        instance.get(url, {
                params: params
            })
            .then(response => {
                resolve(response.data)
            }, err => {
                reject(err)
            })
            .catch((error) => {
                reject(error)
            })
    })
}
// 返回一个Promise(发送delete请求)
export function fetchDelete(url, params) {
    return new Promise((resolve, reject) => {
        instance.delete(url, {
                params: params
            })
            .then(response => {
                resolve(response.data);
            }, err => {
                reject(err);
            })
            .catch((error) => {
                reject(error)
            })
    })
}
// 返回一个Promise(发送put请求)
export function fetchPut(url, params) {
    return new Promise((resolve, reject) => {
        instance.put(url, params)
            .then(response => {
                resolve(response.data);
            }, err => {
                reject(err);
            })
            .catch((error) => {
                reject(error)
            })
    })
}