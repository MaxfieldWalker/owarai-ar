import Vue from "vue";
import TukkomiDetail from "./components/TukkomiDetail.vue";
import store from "./vuex/store";

const v = new Vue({
    el: "#app",
    store,
    components: {
        TukkomiDetail
    },
    template: `<tukkomi-detail></tukkomi-detail>`,
});
