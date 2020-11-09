export default {
    namespaced: true,
    state: {
        name:"张三",
        userLevel:"架构师"
    },
    mutations: {
        MSetUserLevel(state, data) {
            state.level = data
        },
    },
    actions: {
        ASetUserLevel({
            commit
        }, data) {
            console.log("ASetUserLevel",data)
            commit("MSetUserLevel", data);
        },
    }
};