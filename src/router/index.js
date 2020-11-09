import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);

import user from './user'

const router = new Router({
    mode:"hash", 
    routes: [
        {
            path: "/my",
            name: "My",
            component: resolve => require(['@/views/my/'], resolve),
        },
        ...user
    ]
});


router.beforeEach((to, from, next) => {
    const aa = localStorage.getItem("user")

   
        next()
    
    
})


export default router;