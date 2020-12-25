import axios from 'axios';
// 创建 axios 实例
let http = axios.create({
    withCredentials: true,
    timeout: 50000
});
// request拦截器
http.interceptors.request.use(config => {
    if (config.method === 'post') {
        config.params = {}
    }
    return config;
}, error => {
    console.log(error);
});
// 添加响应拦截器
http.interceptors.response.use(
    response => {
        console.log(response);
        let { data } = response;
        return data;
    },
    error => {
        return error.response;
    }
);
export default http;
