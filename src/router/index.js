import { createRouter, createWebHistory } from 'vue-router'
import authMiddleware from './middlewares/auth'
import NotFound from '../pages/errors/NotFound.vue'
import Login from '../pages/auth/Login.vue'
import Register from '../pages/auth/Register.vue'
import LandingPage from '../pages/LandingPage.vue'
import Home from '../pages/app/Home.vue'

const routes = [
    {
        path: '/register',
        name: 'Register',
        component: Register
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/',
        name: 'LandingPage',
        component: LandingPage,
    },
    {
        path: '/home',
        name: 'Home',
        component: Home,
        meta: { requiresAuth: true }
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: NotFound
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach(authMiddleware)

export default router
