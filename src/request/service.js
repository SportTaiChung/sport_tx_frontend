
import router from '../router'
//请求拦截和响应拦截
import axios from "axios";
import {getToken,getMbid,removeToken} from '../utils/auth.js'

let service = axios.create({
    baseURL:"https://demo.queen168.net/Api",//请求路径
    timeout:6000,//超时时间
    withCredentials:false,//允许跨域
    headers:{
        'Content-Type': 'application/json'
    }
})

//请求拦截
service.interceptors.request.use(
    async config =>{

        await axios.post('https://demo.queen168.net/Api/datafresh/token')
                .then(function (response) {
                    config.headers['RVfToken'] = response.data.token
                })
        if(getToken()){
            config.headers['SSSToken'] = getToken()
            config.headers['SSSMBID'] = getMbid()
        }
        return config
    },
    err=>{
      return Promise.reject(err)
    }
)
//响应拦截
service.interceptors.response.use(
    reponse =>{
        let res = reponse.data
        // 状态表 处理
        if(res.code == '-101'){
            removeToken()
            router.push('/login')
        }
        return Promise.resolve(res)
    },
    err=>{
        return Promise.reject(err)
    }
)
export default service
