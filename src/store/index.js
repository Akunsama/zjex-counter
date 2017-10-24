import Vue from 'vue';
import Vuex from 'vuex';
import getters from './getters';

import user from './modules/user';
import AccountManagement from './modules/AccountManagement';//账户管理
import businessDealt from './modules/businessDealt';//业务办理


Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    user: user,
    AccountManagement:AccountManagement,
    businessDealt:businessDealt,
  },
  getters
});

export default store
