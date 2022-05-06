import Vue from 'vue'
import VueRouter from 'vue-router'
let routerList = []
//工程化
function importAll(r){
  r.keys().forEach(item=>{
    routerList.push(r(item).default)
  })
}
//require.context( '路径','布尔值','正则' ) =>  同级目录、往下查找子级、正则命名规范 ***.router.js
importAll(require.context('./',true,/\.router\.js/))
Vue.use(VueRouter)
const routes = [
    ...routerList,
  {
    path: '/',
    name: 'index',
    redirect: '/games',
    component: () => import('@/views/index.vue'),
    meta:{
      token:true
    },
    children:[
      {
        path: '/games',
        name: 'Games',
        meta:{
          token:true
        },
        component: () => import('@/views/games/index'),
      },
    ],

  },

]

const router = new VueRouter({
  routes
})
export default router
