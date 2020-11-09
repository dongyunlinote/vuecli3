
import Vue from "vue"
import axios from 'axios';

const config = {
    baseURL:"/user",
    withCredentials: true,
    headers:{
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "PUT,POST,GET,DELETE,OPTIONS",
    }
}

const _axios = axios.create(config);

_axios.interceptors.request.use((config)=> {

    Object.assign(config.headers,{
        "userID":"23456789"
    })
    // console.log("config: ",config)
    return config;
  }, (error)=> {
    return Promise.reject(error);
  });

_axios.interceptors.response.use( (response) =>{
    // console.log("response: ",response.data)
    return response.data;
}, (error)=> {
    return Promise.reject(error);
  });


  Plugin.install = (Vue, options)=> {
    Vue.axios = _axios;
    window.axios = _axios;

    Object.defineProperties(Vue.prototype, {
        axios: {
            get() {
                return _axios;
            }
        },
        $axios: {
            get() {
                return _axios;
            }
        }
    });
};

Vue.use(Plugin);
export default Plugin;