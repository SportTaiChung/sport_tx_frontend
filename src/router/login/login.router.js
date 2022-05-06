export default{
    path: '/login',
    name: 'login',
    meta:{
      token:false
    },
    component: () => import('@/views/login/login.vue')
}
