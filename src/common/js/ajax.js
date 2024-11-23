import store from '../../store'
import {msg} from './util.js'
import config from './config.js'
import { ref } from 'vue';
export const loading = ref(false);
const stop = () => {
    if (loading.value) {
        loading.value = false;
    }
}

const ajax = (url, data = {}, method = 'GET', ext = {}, failedCallback) => {
    return new Promise((resolve) => {
        if (method === 'POST' || ext.showLoading) {
            // if (loading.value) return;
            loading.value = true;
        }
        let header = method === 'GET' ? {} : {
            'Content-Type': 'application/json'
        }
        header['token'] = localStorage.getItem("userToken") || '';
        let prefix = config.prefix;
        uni.request({
            url: prefix + url,
            data,
            method,
            header,
            success: async (res) => {
                stop();
                if(res.statusCode !== 200){
                    if(res.statusCode === 401){
                        await store.dispatch("openWallet");
                    }else{
                        msg("service error: " + res.statusCode)
                    }
                    return;
                }
                let result = res.data;
                if(result.code !== 0){
                    if(result.code === 30001 || result.code === 30002){
                        await store.dispatch("openWallet");
                    }else{
                        if(ext.skipToast){
                            resolve(result.data);
                        }else{
                            msg(result.msg);
                        }
                    }
                    resolve(result);
                }
                resolve(result.data);
            },
            fail: (error) => {
                console.log(error);
                stop();
                failedCallback && failedCallback();
            }
        })
    }).catch(err => {
        stop();
        msg("unknown error");
        console.log(err);
        failedCallback && failedCallback();
    })
}

export const get = (url, data = {}, ext = {}, failedCallback) => {
    return new Promise((resolve) => {
        ajax(url, data, 'GET', ext, failedCallback).then(result => {
            resolve(result);
        })
    })
}
export const post = (url, data = {}, ext = {}, failedCallback) => {
    return new Promise((resolve) => {
        ajax(url, data, 'POST', ext, failedCallback).then(result => {
            resolve(result);
        })
    })
}
