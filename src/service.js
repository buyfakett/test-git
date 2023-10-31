import axios from "axios";
import {getToken} from "@/utils/setToken";
import { Message } from "element-ui";

const service = axios.create({
    baseURL: '/api',
    timeout: 5000
    // timeout: 999999999
})

service.interceptors.request.use((config) => {
    // 设置请求前做什么
    config.headers['AUTHORIZATION'] = getToken();
    return config;
}, error => {
    return Promise.reject(error);
})

service.interceptors.response.use((response) => {
    // 对相应做什么操作
    let { code, message } =  response.data;
    if (code !== 0) {
        Message.error({message: message || 'Error', type: 'error'});
        return response.data;
    }else {
        Message.success({message: message || 'Success', type: 'success'});
        return response.data;
    }
}, error => {
    return Promise.reject(error);
})

export default service;