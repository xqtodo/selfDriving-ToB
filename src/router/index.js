import { createRouter,createWebHistory } from "vue-router";

import NotFound from '../views/NotFound.vue'
import index from '../pages/index.vue'
import login from '../pages/login.vue'
import register from '../pages/register.vue'

const router = createRouter({
    history:createWebHistory(),
    routes:[
        {
            path:'/login',
            component:login
        },
        {
            path:'/index',
            component:index
        },
        {
            path:'/',
            component: login
        },
        {
            path: '/register',
            component: register
        },
        {
            path: '/:pathMatch(.*)*', 
            name: 'NotFound', 
            component: NotFound
        }
    ]
})
export default router