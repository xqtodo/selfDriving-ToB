import { createRouter,createWebHistory } from "vue-router";

import NotFound from '../views/NotFound.vue'
import index from '../pages/index.vue'
import login from '../pages/login.vue'
import register from '../pages/register.vue'
import addSpot from '../pages/ScenicSpots/addSpots.vue'
import addRoutes from '../pages/RouteManage/addRoutes.vue'
import addCar from '../pages/CarManage/addCar.vue'
import addUser from '../pages/UserManage/addUser.vue'
import dashboard from '../pages/dashboard.vue'

const router = createRouter({
    history:createWebHistory(),
    routes:[
        {
            path:'/login',
            component:login
        },
        {
            path:'/index',
            component:index,
            children:[
                {
                    path:'',
                    component: dashboard
                },
                {
                    path:'addSpots',
                    component:addSpot
                },
                {
                    path: 'addRoutes',
                    component: addRoutes
                },
                {
                    path: 'addCar',
                    component: addCar
                },
                {
                    path: 'addUser',
                    component: addUser
                }
                
            ]
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