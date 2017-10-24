// 业务办理vuex文件
import Cookies from 'js-cookie';

const businessDealt = {
  state: {
   businessType:Cookies.get('businessType'),
   stockNatureName:Cookies.get('stockNatureName'),
   valMinNum:Cookies.get('valMinNum'),
  },
  mutations: {
    SET_BUSINESSTYPE: (state, businessType) => {
      state.businessType = businessType;
      Cookies.set('businessType', businessType);//防止刷新
    },
    SET_STOCKNATURENAME: (state, stockNatureName) => {
      state.stockNatureName = stockNatureName;
      Cookies.set('stockNatureName', stockNatureName);//防止刷新
    },
    SET_VALMINNUM: (state, valMinNum) => {
      state.valMinNum = valMinNum;
      Cookies.set('valMinNum', valMinNum);
    },
  }
};

export default businessDealt;


