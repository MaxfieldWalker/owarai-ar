import Vue from "vue";
import App from "./components/app.vue";
import store from "./vuex/store";

const v = new Vue({
    el: "#app",
    store,
    components: {
        App
    },
    template: `<app></app>`,
});
