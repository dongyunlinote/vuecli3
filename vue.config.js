const path = require("path");
console.log(process.env.VUE_APP_TITLE)
console.log(process.env.VUE_APP_NODE_ENV)

module.exports = {
    publicPath: "./",
    pages: {
        app: {
            entry: "./src/entry/app.js",
            template: path.join(__dirname, "public/index.html"),
            filename: "index.html",
            title: "首页",
        },
    },
    devServer: {
        proxy: {
            '/user': {
                target: "http://127.0.0.1:7001",
                changeOrigin: true, //是否跨域
                pathRewrite: {
                    '^/user': '' //需要rewrite重写的
                },
            }
        },
    },
    
}