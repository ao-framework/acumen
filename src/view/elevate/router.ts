import Vue from "vue"
import Router from "vue-router"

Vue.use(Router)

export default new Router({
    routes: [{
        name: "menu",
        path: "/",
        component: () => import(/* webpackChunkName: "elevate-menu" */ "./views/menu/menu.vue")
    }, {
        name: "coverage",
        path: "/coverage/:entryPoint",
        component: () => import(/* webpackChunkName: "elevate-coverage" */ "./views/coverage/coverage.vue")
    }, {
        name: "schema",
        path: "/schema/:entryPoint",
        component: () => import(/* webpackChunkName: "elevate-schema" */ "./views/schema/schema.vue")
    }, {
        name: "snapshot",
        path: "/snapshot/:entryPoint",
        component: () => import(/* webpackChunkName: "elevate-snapshot" */ "./views/snapshot/snapshot.vue")
    }]
})
