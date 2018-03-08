"use strict";
import Vue from "vue";
import Vuex from "vuex";
// import * as  Vuex from "vuex";
import { Store, StoreOptions } from "vuex";

Vue.use(Vuex);
export interface AppState {

}
const options: StoreOptions<AppState> = {
    state: {
    },
    mutations: {
    },
    actions: {
    }
};

const store: Store<AppState> = new Store(options);

export default store;
