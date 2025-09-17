import Cookie from "js-cookie";

export default function authMiddleware(to, from, next) {
    const isAuthenticated = !!Cookie.get('_my_token')

    if (to.meta.requiresAuth && !isAuthenticated) {
        next({ name: 'Login' })
    } else {
        next()
    }
}