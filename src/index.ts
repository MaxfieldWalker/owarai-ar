import Vue from "vue";
import AddTukkomi from "./components/addTukkomi.vue";
import store from "./vuex/store";

const v = new Vue({
    el: "#app",
    store,
    components: {
        AddTukkomi
    },
    template: `<add-tukkomi></add-tukkomi>`,
});
