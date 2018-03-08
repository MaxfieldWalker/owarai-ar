import Vue from "vue";
import VueRouter from "vue-router";
import TukkomiDetail from "./components/TukkomiDetail.vue";
import Home from "./components/Home.vue";
import New from "./components/AddTukkomi.vue";
import store from "./vuex/store";

Vue.use(VueRouter);


const router = new VueRouter({
    routes: [
        {
            path: "/", component: Home
        },
        {
            path: "/tukkomi/:id", component: TukkomiDetail
        },
        {
            path: "/new", component: New
        }
    ]
});

const app = new Vue({
    router,
    store
}).$mount("#app");