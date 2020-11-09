export default [
    {
        path: "/",
        name: "User",
        component: resolve => require(['@/views/user/'], resolve),
    },    
]