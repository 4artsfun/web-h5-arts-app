import store from "../../store";
import {loading} from "./ajax";
import config from "./config";
import {signMessage} from "@wagmi/core";
import {web3Config} from "./web3Config";

export const signEvm = async () => {
    let message = "Login Time " + new Date().getTime();
    const signature = await signMessage(web3Config, {message})
    return {message: message, sign: signature}
}

export const getSolProvider = () => {
    if ('solana' in window) {
        const provider = window.solana;
        if (provider.isPhantom) {
            return provider;
        }
    }
    return null;
}

let _debounceTimeout = null,
    _throttleRunning = false

export const getAddressFormat = (address) => {
    if(!address){
        return "";
    }
    if (address.length <= 6) {
        return address;
    }
    return address.substring(0,3) + "..." + address.substring(address.length - 3);
}
export const wait = () => {
    msg("coming soon")
}
export const debounce = (fn, delay = 1000) => {
    _debounceTimeout && clearTimeout(_debounceTimeout);
    _debounceTimeout = setTimeout(() => {
        fn();
        _debounceTimeout && clearTimeout(_debounceTimeout);
    }, delay);
}
export const throttle = (fn, delay = 500) => {
    if (_throttleRunning) {
        return;
    }
    _throttleRunning = true;
    fn();
    setTimeout(() => {
        _throttleRunning = false;
    }, delay);
}

export const msg = (title = '', param = {}) => {
    if (!title) return;
    uni.showToast({
        title,
        duration: param.duration || 3000,
        mask: param.mask || true,
        icon: param.icon || 'none'
    });
}

export const isEmpty = (str) => {
    if (str === undefined || str === null || str === "" || str === "null" || str === "undefined") return true;
    return (str + "").trim() === "";
}

export const date = (format, timeStamp) => {
    if(!timeStamp) return "";
    if (('' + timeStamp).length <= 10) {
        timeStamp = +timeStamp * 1000;
    } else {
        timeStamp = +timeStamp;
    }
    let _date = new Date(timeStamp),
        Y = _date.getFullYear(),
        m = _date.getMonth() + 1,
        d = _date.getDate(),
        H = _date.getHours(),
        i = _date.getMinutes(),
        s = _date.getSeconds();

    m = m < 10 ? '0' + m : m;
    d = d < 10 ? '0' + d : d;
    H = H < 10 ? '0' + H : H;
    i = i < 10 ? '0' + i : i;
    s = s < 10 ? '0' + s : s;

    return format.replace(/[YmdHis]/g, key => {
        return {
            Y,
            m,
            d,
            H,
            i,
            s
        } [key];
    });
}

export const copy = (str) => {
    if(!str){
        return;
    }
    uni.setClipboardData({
        data: str + "",
        success: () => {
            msg("copy successfully");
        },
        fail: (e) => {
            console.log(e)
        }
    });
}
export const navTo = (url, options = {}) => {
    throttle(async () => {
        if (!url) {
            return;
        }
        if (/^(http|https):\/\//.test(url)) {
            // #ifdef MP-WEIXIN
            await uni.setClipboardData({
                data: url
            })
            // #endif
            // #ifdef APP-PLUS
            plus.runtime.openURL(url, () => {
                msg("address link error");
            })
            // #endif
            // #ifdef H5
            window.open(url);
            // #endif
        } else {
            if ((~url.indexOf('login=1') || options.login) && !store.state.token) {
                await store.dispatch("openWallet");
                return;
            }
            if (~url.indexOf('type=switch')) {
                await uni.switchTab({
                    url
                })
            } else if (~url.indexOf('type=replace') || options.replace) {
                await uni.redirectTo({
                    url
                })
            } else {
                await uni.navigateTo({
                    url
                })
            }
        }

    }, 300)
}

export const chooseImage = (path, successCallback, count = 1) => {
    //path idCard || poster
    if (loading.value) return;
    uni.chooseImage({
        count: count,
        sizeType:['compressed'],
        success: (res) => {
            loading.value = true;
            res.tempFilePaths.forEach((file) => {
                upload(file, path, successCallback)
            })
        },
    })
}
export const upload = (file, path, successCallback) => {
    uni.uploadFile({
        url: config.prefix + '/file/upload',
        header: {
            'token': store.state.token,
            'Accept-Language': uni.getLocale()
        },
        filePath: file,
        formData: {
            type: path
        },
        name: 'file',
        success: async (res) => {
            loading.value = false;
            console.log("res", res);
            if(res.statusCode !== 200){
                if(res.statusCode === 401){
                    await store.dispatch("openWallet");
                }else{
                    msg("service error: " + res.statusCode)
                }
                return;
            }
            let result = res.data;
            if (typeof result === 'string') {
                result = JSON.parse(result);
            }
            if(result.code !== 0){
                msg(result.msg)
                return;
            }
            successCallback && successCallback(result.data);
        },
        fail: () => {
            loading.value = false;
            msg('network error');
        }
    });
}

export const back = () => {
    uni.navigateBack();
}
export const home = () => {
    uni.switchTab({url: '/pages/home/index'});
}
