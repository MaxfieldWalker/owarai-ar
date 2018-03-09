"use strict";
import Vue from "vue";
import Vuex from "vuex";
// import * as  Vuex from "vuex";
import { Store, StoreOptions } from "vuex";

Vue.use(Vuex);
export interface AppState {
    newTukkomiState: {
        selectedPhoto: string;
    };

}
const options: StoreOptions<AppState> = {
    state: {
        newTukkomiState: {
            selectedPhoto: ""
        }
    },
    mutations: {
        updateSelectedPhoto(state, photo) {
            state.newTukkomiState.selectedPhoto = photo;
        }
    },
    actions: {
    }
};

const store: Store<AppState> = new Store(options);

export default store;
