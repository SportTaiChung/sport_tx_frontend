import router  from "./index";
import {getToken} from '@/utils/auth.js'

//路由守卫
router.beforeEach((to,from,next)=>{

    if(!getToken()){
        //未登入
        if(to.meta.token){
            next({
                path:'/login'
            })
        }else {
            next()
        }
    }else {
        if(to.path === '/login'){
            next({
                path:'/'
            })
        }else {
            next()
        }
    }
})
