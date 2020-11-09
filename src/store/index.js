import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex)

import user from "@/store/user"
import my from "@/store/my"

export default new Vuex.Store({
    modules: {
        user,
        my
    }
})