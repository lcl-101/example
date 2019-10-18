import Vue from 'vue';
import Vuex from 'vuex';
import actions from './actions.js';
import mutations from './mutations.js'
import getters from './getters.js'

Vue.use(Vuex);
const state = {
    pagData:null,
    isSuccess:false
}

export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters
});

