import App from '@/App'

// const home = r => require.ensure([], () => r(require('./views/home/Home.vue')), 'home')
// const approve = r => require.ensure([], () => r(require('./views/approve/Approve.vue')), 'approve')

export default {
    path: '',
    component: App, // 顶层路由，对应index.html
    children: [ // 二级路由。对应App.vue  跳转的页面在这里配置
        

    ]
}