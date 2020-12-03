import Vue from 'vue';
import vuex from 'vuex';
import actions from './actions';
import getters from './getters';
import mutations from './mutations';

const state = {
    demo: 1
}

Vue.use(vuex);

export default new vuex.Store({ //store对象
    state,
    getters,
    actions,
    mutations,
    modules: {

    }
})
