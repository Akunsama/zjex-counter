const getters = {
	loginName: state => state.AccountManagement.loginName,
  	moblie: state => state.AccountManagement.moblie,
  	registerTime: state => state.AccountManagement.registerTime,
    registerDate: state => state.AccountManagement.registerDate,

  	businessType: state => state.businessDealt.businessType,
  	stockNatureName: state => state.businessDealt.stockNatureName,
  	
  	valMinNum: state => state.businessDealt.valMinNum,
    
  	operId: state => state.user.operId,
  	userId: state => state.user.userId,
  	custType: state => state.user.custType,
    account: state => state.user.account,
    operName: state => state.user.operName,
};
export default getters
