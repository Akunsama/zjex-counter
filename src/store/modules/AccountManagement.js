// 账户管理vuex文件
import Cookies from 'js-cookie';

const AccountManagement = {
  state: {
    loginName: Cookies.get('loginName'),
    moblie: Cookies.get('moblie'),
    registerTime: Cookies.get('registerTime'),
    registerDate: Cookies.get('registerDate'),
  },
  mutations: {
    SET_LOGINNAME: (state, loginName) => {
      state.loginName = loginName;
      Cookies.set('loginName', loginName);//防止刷新
    },
    SET_MOBILE: (state, moblie) => {
      state.moblie = moblie;
      Cookies.set('moblie', moblie);
    },
    SET_REGISTERTIME: (state, registerTime) => {
      state.registerTime = registerTime;
      Cookies.set('registerTime', registerTime);
    },
     SET_REGISTERDATE: (state, registerDate) => {
      state.registerDate = registerDate;
      Cookies.set('registerDate', registerDate);
    },
  }
};

export default AccountManagement;


