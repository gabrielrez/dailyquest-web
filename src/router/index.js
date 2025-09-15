import { createRouter, createWebHistory } from 'vue-router'
import NotFound from '../pages/errors/NotFound.vue'
import Home from '../pages/Home.vue'

const routes = [
    { path: '/', name: 'Home', component: Home },
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
