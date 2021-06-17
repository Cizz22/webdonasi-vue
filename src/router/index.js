import {createRouter, createWebHistory} from 'vue-router'
import store from '@/store'

const routes = [
    {
        path:'/login',
        name:'login',
        component: () => import('@/views/auth/Login.vue')
    },
    {
        path:'/register',
        name:'register',
        component: () => import('@/views/auth/Register.vue')
    },
    {
        path:'/dashboard',
        name:'dashboard',
        component: () => import('@/views/dashboard/Index.vue'),
        meta: {
            requiresAuth: true
        }
    },
    {
        path:'/donation',
        name:'donation.index',
        component: () => import('@/views/donation/Index.vue'),
        meta: {
            requiresAuth: true
        }
    },
    {
        path:'/profile',
        name:'profile.index',
        component: () => import('@/views/profile/Index.vue'),
        meta: {
            requiresAuth: true
        }
    },
    {
        path:'/profile/password',
        name:'profile.password',
        component: () => import('@/views/profile/password.vue'),
        meta: {
            requiresAuth: true
        }
    },
    {
        path:'/',
        name:'home.index',
        component: () => import('@/views/home/Index.vue'),
    },
    {
        path:'/category',
        name:'category.index',
        component: () => import('@/views/category/Index.vue'),
    },
    {
        path:'/category/:slug',
        name:'category.show',
        component: () => import('@/views/category/Show.vue'),
    },
    {
        path:'/campaign',
        name:'campaign.index',
        component: () => import('@/views/campaign/Index.vue'),
    },
    {
        path:'/campaign/:slug',
        name:'campaign.show',
        component: () => import('@/views/campaign/Show.vue'),
    },
    {
        path:'/donation/create/:slug',
        name:'donation.create',
        component: () => import('@/views/donation/create.vue'),
        meta: {
            requiresAuth: true
        }
    },


];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        //cek nilai dari getters isLoggedIn di module auth
        if (store.getters['auth/isLoggedIn']) {
        next()
        return
      }
      next('/login')
    } else {
      next()
    }
})



export default router