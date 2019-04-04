import axios from 'axios'

import store from '../store'

axios.defaults.timeout = 5000;

axios.defaults.baseURL = process.env.VUE_APP_BASE_URL;
//http request 拦截器
axios.interceptors.request.use(
    config => {
        config.headers.Authorization = store.state.token
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);


//http response 拦截器
axios.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        return Promise.reject(error)
    }
)

/**
 * 封装request请求
 * @param type
 * @param url
 * @param data
 * @param callback
 * @returns {Promise}
 */
export default (url = "", type = "GET", data = {}, callback = function () {}) => {
    type = type.toUpperCase();
    if (type == "GET") {
        if (Object.keys(data).length) {
            let dataStr = "" //数据拼接字符串
            Object.keys(data).forEach(key => {
                dataStr += '?' + key + '=' + data[key] + "&";
            })
            if (dataStr !== '') {
                dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'));
                url = url + dataStr;
            }
        }
    }
    let requestConfig = {

    };
    if (type == 'POST') {

        requestConfig = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        Object.assign(requestConfig, {
            data: data
        })
    }
    if (callback) {
        requestConfig.onUploadProgress = (progressEvent) => { //原生获取上传进度的事件
            if (progressEvent.lengthComputable) {
                //属性lengthComputable主要表明总共需要完成的工作量和已经完成的工作是否可以被测量
                //如果lengthComputable为false，就获取不到progressEvent.total和progressEvent.loaded
                callback(progressEvent);
            }
        }
    }
    return new Promise((resolve, reject) => {
        axios(Object.assign({
            url: url,
            method: type,
        }, requestConfig)).
        then((res) => {
            resolve(res)
        }).
        catch((err) => {
            reject(err)
        })

    })
}