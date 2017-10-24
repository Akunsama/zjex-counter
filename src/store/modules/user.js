import Cookies from 'js-cookie';
import { getToken, setToken, removeToken } from '@/utils/auth';
import ApiService from '@/services/API-servies'

const user = {
  state: {
    operId : getToken(),
    custType: Cookies.get('custType'),
    userId: Cookies.get('userId'),
    account: Cookies.get('account'),
    operName: Cookies.get('operName'),//只有柜台登陆返回该字段
  },

  mutations: {
    SET_OPENID: (state, operId) => {
      state.operId = operId;
      Cookies.set('operId', operId);
    },
     SET_CUSTYPE: (state, custType) => {
      state.custType = custType;
      Cookies.set('custType', custType);
    },
     SET_USERID: (state, userId) => {
      state.userId = userId;
      Cookies.set('userId', userId);
    },
     SET_ACCOUNT: (state, account) => {
      state.account = account;
      Cookies.set('account', account);
    },
     SET_OPERNAME: (state, operName) => {
      state.operName = operName;
      Cookies.set('operName', operName);
    },
  },

  actions: {
    // 中心登录
    LoginByCen({ commit }, data) {
      return new Promise((resolve, reject) => {
        ApiService.common.loginUser(data).then(response => {
           resolve(response);
          if (response.ret==0) {
            const data = response.data;
            //登陆返回
            setToken(response.data.custMerno);
            commit('SET_OPENID', data.custMerno);
            commit('SET_CUSTYPE', data.custType);//游客类型
            commit('SET_USERID', data.userId);//游客id
            commit('SET_ACCOUNT', data.account);//游客id
            commit('SET_OPERNAME', data.name);//游客id
          }
        }).catch(error => {
          reject(error);
        });
      });
    },
    // 后端登出
    LogOut({ commit }) {
      return new Promise((resolve, reject) => {
        ApiService.common.logout({}).then(() => {
          commit('SET_OPENID', '');
          removeToken();
          resolve();
        }).catch(error => {
          reject(error);
        });
      });
    },

    // 前端 登出
    // FedLogOut({ commit }) {
    //   return new Promise(resolve => {
    //     commit('SET_OPENID', '');
    //     removeToken();
    //     resolve();
    //   });
    // },
  }
};

export default user;


