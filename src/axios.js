import axios from 'axios'
import { ElMessage } from 'element-plus'
import { useCookies } from '@vueuse/integrations/useCookies'

const service = axios.create({
    baseURL:"/api"
})

// 添加请求拦截器
service.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    // const cookie = useCookies()
    // const token = cookie.get('token') 
    // if(token){
    //     config.headers['token'] = token
    // }
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
service.interceptors.response.use(function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    console.log(response.data)
    if(response.data.code !== 1){
        ElMessage.error(response.data.msg)
    }
    return response.data;
}, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error);
})


export default service