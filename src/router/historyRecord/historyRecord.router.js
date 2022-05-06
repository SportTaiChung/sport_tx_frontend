export default{
    path: '/historyRecord',
    name: 'login',
    meta:{
        token:false
    },
    component: () => import('@/views/historyRecord/index')
}
