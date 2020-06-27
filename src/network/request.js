import axios from "axios";
import { Message } from "element-ui";
import store from "../store";

const BASEURL = process.env.NODE_ENV === "production" ? "" : "/devApi";
const instance = axios.create({
  baseURL: BASEURL,
  timeout: 15 * 1000 // 15s timeout
});

instance.interceptors.request.use(
  function(config) {
   
    // 在发送请求之前做些什么
    let token = store.state.token;
    let username = store.state.username;
    if (token) config.headers["Tokey"] = token;
    if (username) config.headers["UserName"] = username;
    return config;
  },
  function(error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
instance.interceptors.response.use(
  function(response) {
   
    
    // 对响应数据做点什么
    const data = response.data;
    if (data.resCode != 0) {
      Message.error(data.message);
      return Promise.reject(data); //人为走catch代码
    }
    return response.data;
  },
  function(error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);

export function get(url, params) {
  return instance.get(url, {
    params: params
  });
}
export function post(url, params) {
  instance.defaults.headers.post["Content-Type"] = "application/json";
  return instance.post(url, JSON.stringify(params));
}
