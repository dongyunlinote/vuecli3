export default {
    namespaced: true,
    state: {
        myName:"赵四",
        myLevel:"村长"
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