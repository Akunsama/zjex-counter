// 
//  contract-config.js
//  <project>
//  合约的名字、abi、 通过合约文档或者看合约代码得到
//	合约的address部署后得到
//  Created by yann_liang on 2017-08-10.
//  Copyright 2017 yann_liang. All rights reserved.
// 

const CONTRACT_CONFIG = {
	metaCoin: {
		name: 'MetaCoin',
		abi: [{
				"constant": false,
				"inputs": [{
						"name": "by",
						"type": "uint256"
					},
					{
						"name": "_value",
						"type": "uint256"
					}
				],
				"name": "Notify3LongString",
				"outputs": [{
					"name": "_ret",
					"type": "bool"
				}],
				"payable": false,
				"type": "function"
			},
			{
				"constant": true,
				"inputs": [],
				"name": "getErrno",
				"outputs": [{
					"name": "",
					"type": "uint256"
				}],
				"payable": false,
				"type": "function"
			},
			{
				"constant": true,
				"inputs": [{
						"name": "by",
						"type": "uint256"
					},
					{
						"name": "_value",
						"type": "uint256"
					}
				],
				"name": "mutiplyByWithConstant",
				"outputs": [{
					"name": "resutl",
					"type": "uint256"
				}],
				"payable": false,
				"type": "function"
			},
			{
				"constant": false,
				"inputs": [{
						"name": "_str",
						"type": "string"
					},
					{
						"name": "_addr",
						"type": "address"
					}
				],
				"name": "log",
				"outputs": [],
				"payable": false,
				"type": "function"
			},
			{
				"constant": false,
				"inputs": [{
						"name": "by",
						"type": "uint256"
					},
					{
						"name": "_value",
						"type": "uint256"
					}
				],
				"name": "mutiplyByWithEvent",
				"outputs": [{
					"name": "_ret",
					"type": "bool"
				}],
				"payable": false,
				"type": "function"
			},
			{
				"constant": false,
				"inputs": [{
						"name": "_str",
						"type": "string"
					},
					{
						"name": "_i",
						"type": "int256"
					}
				],
				"name": "log",
				"outputs": [],
				"payable": false,
				"type": "function"
			},
			{
				"constant": false,
				"inputs": [{
						"name": "_name",
						"type": "string"
					},
					{
						"name": "_version",
						"type": "string"
					}
				],
				"name": "register",
				"outputs": [],
				"payable": false,
				"type": "function"
			},
			{
				"constant": false,
				"inputs": [{
					"name": "_str",
					"type": "string"
				}],
				"name": "log",
				"outputs": [],
				"payable": false,
				"type": "function"
			},
			{
				"constant": false,
				"inputs": [],
				"name": "kill",
				"outputs": [],
				"payable": false,
				"type": "function"
			},
			{
				"constant": false,
				"inputs": [{
						"name": "_str",
						"type": "string"
					},
					{
						"name": "_str2",
						"type": "string"
					}
				],
				"name": "log",
				"outputs": [],
				"payable": false,
				"type": "function"
			},
			{
				"constant": false,
				"inputs": [{
					"name": "a",
					"type": "uint256"
				}],
				"name": "multiply7",
				"outputs": [{
					"name": "d",
					"type": "uint256"
				}],
				"payable": false,
				"type": "function"
			},
			{
				"constant": false,
				"inputs": [{
						"name": "by",
						"type": "uint256"
					},
					{
						"name": "_value",
						"type": "uint256"
					}
				],
				"name": "mutiplyByWithEventReturn99",
				"outputs": [{
					"name": "_ret",
					"type": "bool"
				}],
				"payable": false,
				"type": "function"
			},
			{
				"constant": false,
				"inputs": [],
				"name": "clearLog",
				"outputs": [],
				"payable": false,
				"type": "function"
			},
			{
				"constant": true,
				"inputs": [],
				"name": "getSender",
				"outputs": [{
					"name": "_ret",
					"type": "string"
				}],
				"payable": false,
				"type": "function"
			},
			{
				"constant": true,
				"inputs": [{
						"name": "by",
						"type": "uint256"
					},
					{
						"name": "_value",
						"type": "uint256"
					}
				],
				"name": "callWithLongString",
				"outputs": [{
					"name": "result",
					"type": "string"
				}],
				"payable": false,
				"type": "function"
			},
			{
				"constant": false,
				"inputs": [{
						"name": "by",
						"type": "uint256"
					},
					{
						"name": "stringValue",
						"type": "string"
					}
				],
				"name": "mutiplyConcatString",
				"outputs": [{
					"name": "_ret",
					"type": "bool"
				}],
				"payable": false,
				"type": "function"
			},
			{
				"constant": false,
				"inputs": [{
					"name": "addr",
					"type": "address"
				}],
				"name": "getBalanceInEth",
				"outputs": [{
					"name": "",
					"type": "uint256"
				}],
				"payable": false,
				"type": "function"
			},
			{
				"constant": false,
				"inputs": [{
					"name": "result",
					"type": "string"
				}],
				"name": "justReturnWhatUGet",
				"outputs": [{
					"name": "_ret",
					"type": "bool"
				}],
				"payable": false,
				"type": "function"
			},
			{
				"constant": true,
				"inputs": [],
				"name": "getOwner",
				"outputs": [{
					"name": "_ret",
					"type": "string"
				}],
				"payable": false,
				"type": "function"
			},
			{
				"constant": false,
				"inputs": [{
						"name": "by",
						"type": "uint256"
					},
					{
						"name": "_value",
						"type": "uint256"
					}
				],
				"name": "mutiplyBy",
				"outputs": [{
					"name": "resutl",
					"type": "uint256"
				}],
				"payable": false,
				"type": "function"
			},
			{
				"constant": false,
				"inputs": [{
					"name": "_value",
					"type": "uint256"
				}],
				"name": "Notify1LongString",
				"outputs": [{
					"name": "_ret",
					"type": "bool"
				}],
				"payable": false,
				"type": "function"
			},
			{
				"constant": true,
				"inputs": [],
				"name": "getLog",
				"outputs": [{
					"name": "_ret",
					"type": "string"
				}],
				"payable": false,
				"type": "function"
			},
			{
				"constant": false,
				"inputs": [{
						"name": "receiver",
						"type": "address"
					},
					{
						"name": "amount",
						"type": "uint256"
					}
				],
				"name": "sendCoin",
				"outputs": [{
					"name": "sufficient",
					"type": "bool"
				}],
				"payable": false,
				"type": "function"
			},
			{
				"constant": false,
				"inputs": [{
						"name": "_str",
						"type": "string"
					},
					{
						"name": "_ui",
						"type": "uint256"
					}
				],
				"name": "log",
				"outputs": [],
				"payable": false,
				"type": "function"
			},
			{
				"constant": false,
				"inputs": [{
					"name": "obj",
					"type": "uint256"
				}],
				"name": "setStoreObj",
				"outputs": [{
					"name": "result",
					"type": "bool"
				}],
				"payable": false,
				"type": "function"
			},
			{
				"constant": false,
				"inputs": [{
					"name": "addr",
					"type": "address"
				}],
				"name": "getBalance",
				"outputs": [{
					"name": "",
					"type": "uint256"
				}],
				"payable": false,
				"type": "function"
			},
			{
				"inputs": [],
				"payable": false,
				"type": "constructor"
			},
			{
				"anonymous": false,
				"inputs": [{
					"indexed": false,
					"name": "_info",
					"type": "string"
				}],
				"name": "Notify1",
				"type": "event"
			},
			{
				"anonymous": false,
				"inputs": [{
						"indexed": false,
						"name": "_errno",
						"type": "uint256"
					},
					{
						"indexed": false,
						"name": "_info",
						"type": "string"
					}
				],
				"name": "Notify",
				"type": "event"
			},
			{
				"anonymous": false,
				"inputs": [{
						"indexed": false,
						"name": "_errno",
						"type": "uint256"
					},
					{
						"indexed": false,
						"name": "_info",
						"type": "string"
					},
					{
						"indexed": false,
						"name": "_data",
						"type": "string"
					}
				],
				"name": "Notify3",
				"type": "event"
			},
			{
				"anonymous": false,
				"inputs": [{
						"indexed": true,
						"name": "_from",
						"type": "address"
					},
					{
						"indexed": true,
						"name": "_to",
						"type": "address"
					},
					{
						"indexed": false,
						"name": "_value",
						"type": "uint256"
					}
				],
				"name": "Transfer",
				"type": "event"
			}
		],
		address: '0x0c013b2c3678d628a01355b6fafce1115cd546d4',
	},
	//注册
	registerApplyManager: {
		name: 'RegisterApplyManager',
		abi: [{
			"constant": true,
			"inputs": [{
				"name": "_contractAddr",
				"type": "address"
			}],
			"name": "IfContractRegist",
			"outputs": [{
				"name": "",
				"type": "bool"
			}],
			"payable": false,
			"type": "function"
		}, {
			"constant": false,
			"inputs": [],
			"name": "unRegister",
			"outputs": [],
			"payable": false,
			"type": "function"
		}, {
			"constant": false,
			"inputs": [{
				"name": "_name",
				"type": "string"
			}, {
				"name": "_version",
				"type": "string"
			}],
			"name": "register",
			"outputs": [],
			"payable": false,
			"type": "function"
		}, {
			"constant": true,
			"inputs": [{
				"name": "_addr",
				"type": "address"
			}],
			"name": "findResNameByAddress",
			"outputs": [{
				"name": "_contractName",
				"type": "uint256"
			}],
			"payable": false,
			"type": "function"
		}, {
			"constant": true,
			"inputs": [{
				"name": "_name",
				"type": "string"
			}, {
				"name": "_version",
				"type": "string"
			}],
			"name": "getContractAddress",
			"outputs": [{
				"name": "_address",
				"type": "address"
			}],
			"payable": false,
			"type": "function"
		}],
		address: '',
	},
	//DAPP
	roleFilterManager: {
		name: 'RoleFilterManager',
		abi: [{
			"constant": true,
			"inputs": [{
				"name": "_moduleText",
				"type": "string"
			}],
			"name": "findContractByModText",
			"outputs": [{
				"name": "_json",
				"type": "string"
			}],
			"payable": false,
			"type": "function"
		}, {
			"constant": true,
			"inputs": [],
			"name": "getErrno",
			"outputs": [{
				"name": "",
				"type": "uint256"
			}],
			"payable": false,
			"type": "function"
		}, {
			"constant": true,
			"inputs": [{
				"name": "_moduleText",
				"type": "string"
			}],
			"name": "findByModuleText",
			"outputs": [{
				"name": "_json",
				"type": "string"
			}],
			"payable": false,
			"type": "function"
		}, {
			"constant": false,
			"inputs": [{
				"name": "_json",
				"type": "string"
			}],
			"name": "addAction",
			"outputs": [{
				"name": "",
				"type": "uint256"
			}],
			"payable": false,
			"type": "function"
		}, {
			"constant": false,
			"inputs": [{
				"name": "_cron",
				"type": "uint256"
			}, {
				"name": "_value",
				"type": "string"
			}],
			"name": "testInvokeSeq",
			"outputs": [{
				"name": "_ret",
				"type": "string"
			}],
			"payable": false,
			"type": "function"
		}, {
			"constant": true,
			"inputs": [],
			"name": "testGetFilterId",
			"outputs": [{
				"name": "_ret",
				"type": "string"
			}],
			"payable": false,
			"type": "function"
		}, {
			"constant": false,
			"inputs": [{
				"name": "_cron",
				"type": "uint256"
			}, {
				"name": "_value",
				"type": "string"
			}],
			"name": "testGetSeq",
			"outputs": [{
				"name": "_ret",
				"type": "uint256"
			}],
			"payable": false,
			"type": "function"
		}, {
			"constant": true,
			"inputs": [{
				"name": "_str",
				"type": "string"
			}, {
				"name": "_str2",
				"type": "string"
			}, {
				"name": "_str3",
				"type": "string"
			}],
			"name": "log",
			"outputs": [{
				"name": "_ret",
				"type": "uint256"
			}],
			"payable": false,
			"type": "function"
		}, {
			"constant": true,
			"inputs": [{
				"name": "_str",
				"type": "string"
			}, {
				"name": "_addr",
				"type": "address"
			}],
			"name": "log",
			"outputs": [{
				"name": "_ret",
				"type": "uint256"
			}],
			"payable": false,
			"type": "function"
		}, {
			"constant": true,
			"inputs": [{
				"name": "",
				"type": "address"
			}],
			"name": "cctAddrAndCctIdMapping",
			"outputs": [{
				"name": "",
				"type": "string"
			}],
			"payable": false,
			"type": "function"
		}, {
			"constant": false,
			"inputs": [{
				"name": "_moduleId",
				"type": "string"
			}],
			"name": "delModule",
			"outputs": [{
				"name": "",
				"type": "uint256"
			}],
			"payable": false,
			"type": "function"
		}, {
			"constant": true,
			"inputs": [{
				"name": "_str",
				"type": "string"
			}, {
				"name": "_i",
				"type": "int256"
			}],
			"name": "log",
			"outputs": [{
				"name": "_ret",
				"type": "uint256"
			}],
			"payable": false,
			"type": "function"
		}, {
			"constant": false,
			"inputs": [{
				"name": "_json",
				"type": "string"
			}],
			"name": "addRole",
			"outputs": [{
				"name": "",
				"type": "uint256"
			}],
			"payable": false,
			"type": "function"
		}, {
			"constant": false,
			"inputs": [{
				"name": "_name",
				"type": "string"
			}, {
				"name": "_version",
				"type": "string"
			}],
			"name": "register",
			"outputs": [],
			"payable": false,
			"type": "function"
		}, {
			"constant": true,
			"inputs": [{
				"name": "_str",
				"type": "string"
			}],
			"name": "log",
			"outputs": [{
				"name": "_ret",
				"type": "uint256"
			}],
			"payable": false,
			"type": "function"
		}, {
			"constant": false,
			"inputs": [],
			"name": "kill",
			"outputs": [],
			"payable": false,
			"type": "function"
		}, {
			"constant": true,
			"inputs": [{
				"name": "_str",
				"type": "string"
			}, {
				"name": "_str2",
				"type": "string"
			}],
			"name": "log",
			"outputs": [{
				"name": "_ret",
				"type": "uint256"
			}],
			"payable": false,
			"type": "function"
		}, {
			"constant": true,
			"inputs": [{
				"name": "_from",
				"type": "address"
			}, {
				"name": "_to",
				"type": "address"
			}, {
				"name": "_funcHash",
				"type": "string"
			}, {
				"name": "_extraData",
				"type": "string"
			}],
			"name": "authorizeProcessor",
			"outputs": [{
				"name": "",
				"type": "uint256"
			}],
			"payable": false,
			"type": "function"
		}, {
			"constant": true,
			"inputs": [],
			"name": "qryModules",
			"outputs": [{
				"name": "_json",
				"type": "string"
			}],
			"payable": false,
			"type": "function"
		}, {
			"constant": true,
			"inputs": [],
			"name": "getModuleCount",
			"outputs": [{
				"name": "_count",
				"type": "uint256"
			}],
			"payable": false,
			"type": "function"
		}, {
			"constant": true,
			"inputs": [{
				"name": "_moduleText",
				"type": "string"
			}, {
				"name": "_cttName",
				"type": "string"
			}, {
				"name": "_pageNum",
				"type": "uint256"
			}, {
				"name": "_pageSize",
				"type": "uint256"
			}],
			"name": "listContractByModTextAndCttName",
			"outputs": [{
				"name": "_json",
				"type": "string"
			}],
			"payable": false,
			"type": "function"
		}, {
			"constant": true,
			"inputs": [],
			"name": "getSender",
			"outputs": [{
				"name": "_ret",
				"type": "string"
			}],
			"payable": false,
			"type": "function"
		}, {
			"constant": true,
			"inputs": [{
				"name": "_moduleId",
				"type": "string"
			}],
			"name": "qryModuleDetail",
			"outputs": [{
				"name": "_json",
				"type": "string"
			}],
			"payable": false,
			"type": "function"
		}, {
			"constant": false,
			"inputs": [{
				"name": "_json",
				"type": "string"
			}],
			"name": "updModule",
			"outputs": [{
				"name": "",
				"type": "uint256"
			}],
			"payable": false,
			"type": "function"
		}, {
			"constant": true,
			"inputs": [{
				"name": "_moduleId",
				"type": "string"
			}],
			"name": "moduleIsExist",
			"outputs": [{
				"name": "",
				"type": "uint256"
			}],
			"payable": false,
			"type": "function"
		}, {
			"constant": true,
			"inputs": [],
			"name": "listAll",
			"outputs": [{
				"name": "_json",
				"type": "string"
			}],
			"payable": false,
			"type": "function"
		}, {
			"constant": true,
			"inputs": [{
				"name": "_name",
				"type": "string"
			}, {
				"name": "_key",
				"type": "string"
			}, {
				"name": "_value",
				"type": "string"
			}],
			"name": "writedb",
			"outputs": [{
				"name": "_ret",
				"type": "uint256"
			}],
			"payable": false,
			"type": "function"
		}, {
			"constant": true,
			"inputs": [],
			"name": "getOwner",
			"outputs": [{
				"name": "_ret",
				"type": "string"
			}],
			"payable": false,
			"type": "function"
		}, {
			"constant": false,
			"inputs": [{
				"name": "_contractId",
				"type": "string"
			}, {
				"name": "_enable",
				"type": "uint256"
			}],
			"name": "setConntractEnable",
			"outputs": [{
				"name": "",
				"type": "uint256"
			}],
			"payable": false,
			"type": "function"
		}, {
			"constant": false,
			"inputs": [{
				"name": "_filterJson",
				"type": "string"
			}],
			"name": "addFilter",
			"outputs": [{
				"name": "_filterId",
				"type": "uint256"
			}],
			"payable": false,
			"type": "function"
		}, {
			"constant": true,
			"inputs": [{
				"name": "_str",
				"type": "string"
			}, {
				"name": "_ui",
				"type": "uint256"
			}],
			"name": "log",
			"outputs": [{
				"name": "_ret",
				"type": "uint256"
			}],
			"payable": false,
			"type": "function"
		}, {
			"constant": false,
			"inputs": [{
				"name": "_json",
				"type": "string"
			}],
			"name": "addModule",
			"outputs": [{
				"name": "",
				"type": "uint256"
			}],
			"payable": false,
			"type": "function"
		}, {
			"constant": true,
			"inputs": [{
				"name": "_moduleId",
				"type": "string"
			}],
			"name": "listContractByModuleId",
			"outputs": [{
				"name": "_json",
				"type": "string"
			}],
			"payable": false,
			"type": "function"
		}, {
			"constant": false,
			"inputs": [{
				"name": "_json",
				"type": "string"
			}],
			"name": "addContract",
			"outputs": [{
				"name": "",
				"type": "uint256"
			}],
			"payable": false,
			"type": "function"
		}, {
			"constant": false,
			"inputs": [{
				"name": "_json",
				"type": "string"
			}],
			"name": "addMenu",
			"outputs": [{
				"name": "",
				"type": "uint256"
			}],
			"payable": false,
			"type": "function"
		}, {
			"constant": false,
			"inputs": [{
				"name": "_moduleId",
				"type": "string"
			}, {
				"name": "_enable",
				"type": "uint256"
			}],
			"name": "setModuleEnable",
			"outputs": [{
				"name": "",
				"type": "uint256"
			}],
			"payable": false,
			"type": "function"
		}, {
			"inputs": [],
			"payable": false,
			"type": "constructor"
		}, {
			"anonymous": false,
			"inputs": [{
				"indexed": false,
				"name": "_error",
				"type": "uint256"
			}, {
				"indexed": false,
				"name": "_info",
				"type": "string"
			}],
			"name": "Notify",
			"type": "event"
		}],
		address: '0xdd9f986967404d09c20deeeb5c9c3fa5d6841783',
	},
	//用户
	userManager: {
		name: 'UserManager',
		abi: [{
			"constant": true,
			"inputs": [{
				"name": "_account",
				"type": "string"
			}],
			"name": "getAccountState",
			"outputs": [{
				"name": "_state",
				"type": "uint256"
			}],
			"payable": false,
			"type": "function"
		}, {
			"constant": true,
			"inputs": [{
				"name": "_departmentId",
				"type": "string"
			}, {
				"name": "_pageNum",
				"type": "uint256"
			}, {
				"name": "_pageSize",
				"type": "uint256"
			}],
			"name": "findByDepartmentIdTree",
			"outputs": [{
				"name": "_strjson",
				"type": "string"
			}],
			"payable": false,
			"type": "function"
		}, {
			"constant": true,
			"inputs": [{
				"name": "_mobile",
				"type": "string"
			}],
			"name": "findByMobile",
			"outputs": [{
				"name": "_strjson",
				"type": "string"
			}],
			"payable": false,
			"type": "function"
		}, {
			"constant": true,
			"inputs": [{
				"name": "_userAddr",
				"type": "address"
			}],
			"name": "userExists",
			"outputs": [{
				"name": "_ret",
				"type": "uint256"
			}],
			"payable": false,
			"type": "function"
		}, {
			"constant": true,
			"inputs": [],
			"name": "getRevision",
			"outputs": [{
				"name": "_revision",
				"type": "uint256"
			}],
			"payable": false,
			"type": "function"
		}, {
			"constant": true,
			"inputs": [],
			"name": "getErrno",
			"outputs": [{
				"name": "",
				"type": "uint256"
			}],
			"payable": false,
			"type": "function"
		}, {
			"constant": true,
			"inputs": [{
				"name": "_userAddr",
				"type": "address"
			}, {
				"name": "_roleId",
				"type": "string"
			}],
			"name": "checkUserRole",
			"outputs": [{
				"name": "_ret",
				"type": "uint256"
			}],
			"payable": false,
			"type": "function"
		}, {
			"constant": false,
			"inputs": [{
				"name": "_userAddr",
				"type": "address"
			}, {
				"name": "_status",
				"type": "uint256"
			}],
			"name": "updatePasswordStatus",
			"outputs": [{
				"name": "_ret",
				"type": "bool"
			}],
			"payable": false,
			"type": "function"
		}, {
			"constant": true,
			"inputs": [{
				"name": "_actionId",
				"type": "string"
			}],
			"name": "actionUsed",
			"outputs": [{
				"name": "_used",
				"type": "uint256"
			}],
			"payable": false,
			"type": "function"
		}, {
			"constant": true,
			"inputs": [{
				"name": "_str",
				"type": "string"
			}, {
				"name": "_str2",
				"type": "string"
			}, {
				"name": "_str3",
				"type": "string"
			}],
			"name": "log",
			"outputs": [{
				"name": "_ret",
				"type": "uint256"
			}],
			"payable": false,
			"type": "function"
		}, {
			"constant": true,
			"inputs": [{
				"name": "_str",
				"type": "string"
			}, {
				"name": "_addr",
				"type": "address"
			}],
			"name": "log",
			"outputs": [{
				"name": "_ret",
				"type": "uint256"
			}],
			"payable": false,
			"type": "function"
		}, {
			"constant": false,
			"inputs": [{
				"name": "_account",
				"type": "string"
			}],
			"name": "login",
			"outputs": [{
				"name": "_json",
				"type": "string"
			}],
			"payable": false,
			"type": "function"
		}, {
			"constant": true,
			"inputs": [{
				"name": "_str",
				"type": "string"
			}, {
				"name": "_i",
				"type": "int256"
			}],
			"name": "log",
			"outputs": [{
				"name": "_ret",
				"type": "uint256"
			}],
			"payable": false,
			"type": "function"
		}, {
			"constant": true,
			"inputs": [{
				"name": "_accountStatus",
				"type": "uint256"
			}, {
				"name": "_pageNo",
				"type": "uint256"
			}, {
				"name": "_pageSize",
				"type": "uint256"
			}],
			"name": "pageByAccountStatus",
			"outputs": [{
				"name": "_strjson",
				"type": "string"
			}],
			"payable": false,
			"type": "function"
		}, {
			"constant": false,
			"inputs": [{
				"name": "_userJson",
				"type": "string"
			}],
			"name": "update",
			"outputs": [{
				"name": "",
				"type": "uint256"
			}],
			"payable": false,
			"type": "function"
		}, {
			"constant": false,
			"inputs": [{
				"name": "_name",
				"type": "string"
			}, {
				"name": "_version",
				"type": "string"
			}],
			"name": "register",
			"outputs": [],
			"payable": false,
			"type": "function"
		}, {
			"constant": true,
			"inputs": [{
				"name": "_str",
				"type": "string"
			}],
			"name": "log",
			"outputs": [{
				"name": "_ret",
				"type": "uint256"
			}],
			"payable": false,
			"type": "function"
		}, {
			"constant": true,
			"inputs": [{
				"name": "_userAddr",
				"type": "address"
			}],
			"name": "getUserState",
			"outputs": [{
				"name": "_state",
				"type": "uint256"
			}],
			"payable": false,
			"type": "function"
		}, {
			"constant": false,
			"inputs": [],
			"name": "kill",
			"outputs": [],
			"payable": false,
			"type": "function"
		}, {
			"constant": true,
			"inputs": [{
				"name": "_addr",
				"type": "address"
			}, {
				"name": "_departmentId",
				"type": "string"
			}],
			"name": "checkWritePermission",
			"outputs": [{
				"name": "_ret",
				"type": "uint256"
			}],
			"payable": false,
			"type": "function"
		}, {
			"constant": true,
			"inputs": [{
				"name": "_email",
				"type": "string"
			}],
			"name": "findByEmail",
			"outputs": [{
				"name": "_strjson",
				"type": "string"
			}],
			"payable": false,
			"type": "function"
		}, {
			"constant": true,
			"inputs": [{
				"name": "_str",
				"type": "string"
			}, {
				"name": "_str2",
				"type": "string"
			}],
			"name": "log",
			"outputs": [{
				"name": "_ret",
				"type": "uint256"
			}],
			"payable": false,
			"type": "function"
		}, {
			"constant": true,
			"inputs": [{
				"name": "_roleId",
				"type": "string"
			}, {
				"name": "_actionId",
				"type": "string"
			}],
			"name": "checkRoleAction",
			"outputs": [{
				"name": "_ret",
				"type": "uint256"
			}],
			"payable": false,
			"type": "function"
		}, {
			"constant": true,
			"inputs": [{
				"name": "_name",
				"type": "string"
			}],
			"name": "findByLoginName",
			"outputs": [{
				"name": "_strjson",
				"type": "string"
			}],
			"payable": false,
			"type": "function"
		}, {
			"constant": false,
			"inputs": [{
				"name": "_userAddr",
				"type": "address"
			}, {
				"name": "_status",
				"type": "uint256"
			}],
			"name": "updateUserStatus",
			"outputs": [{
				"name": "_ret",
				"type": "bool"
			}],
			"payable": false,
			"type": "function"
		}, {
			"constant": true,
			"inputs": [],
			"name": "getSender",
			"outputs": [{
				"name": "_ret",
				"type": "string"
			}],
			"payable": false,
			"type": "function"
		}, {
			"constant": true,
			"inputs": [{
				"name": "_roleId",
				"type": "string"
			}],
			"name": "getRoleModuleId",
			"outputs": [{
				"name": "_ret",
				"type": "uint256"
			}],
			"payable": false,
			"type": "function"
		}, {
			"constant": false,
			"inputs": [{
				"name": "_userAddr",
				"type": "address"
			}],
			"name": "eraseAdminByAddress",
			"outputs": [],
			"payable": false,
			"type": "function"
		}, {
			"constant": true,
			"inputs": [{
				"name": "_roleIds",
				"type": "string"
			}],
			"name": "getUserCountMappingByRoleIds",
			"outputs": [{
				"name": "_json",
				"type": "string"
			}],
			"payable": false,
			"type": "function"
		}, {
			"constant": true,
			"inputs": [{
				"name": "_departmentId",
				"type": "string"
			}, {
				"name": "_index",
				"type": "uint256"
			}],
			"name": "getChildIdByIndex",
			"outputs": [{
				"name": "_childDepartmentId",
				"type": "uint256"
			}],
			"payable": false,
			"type": "function"
		}, {
			"constant": true,
			"inputs": [{
				"name": "_departmentId",
				"type": "string"
			}],
			"name": "departmentExists",
			"outputs": [{
				"name": "_exists",
				"type": "uint256"
			}],
			"payable": false,
			"type": "function"
		}, {
			"constant": true,
			"inputs": [],
			"name": "listAll",
			"outputs": [{
				"name": "_userListJson",
				"type": "string"
			}],
			"payable": false,
			"type": "function"
		}, {
			"constant": true,
			"inputs": [{
				"name": "_userAddr",
				"type": "address"
			}, {
				"name": "_index",
				"type": "uint256"
			}],
			"name": "getUserRoleId",
			"outputs": [{
				"name": "_ret",
				"type": "uint256"
			}],
			"payable": false,
			"type": "function"
		}, {
			"constant": true,
			"inputs": [{
				"name": "_roleId",
				"type": "string"
			}],
			"name": "findByRoleId",
			"outputs": [{
				"name": "_strjson",
				"type": "string"
			}],
			"payable": false,
			"type": "function"
		}, {
			"constant": true,
			"inputs": [{
				"name": "_departmentId",
				"type": "string"
			}],
			"name": "getUserCountByDepartmentId",
			"outputs": [{
				"name": "_count",
				"type": "uint256"
			}],
			"payable": false,
			"type": "function"
		}, {
			"constant": true,
			"inputs": [{
				"name": "_name",
				"type": "string"
			}, {
				"name": "_key",
				"type": "string"
			}, {
				"name": "_value",
				"type": "string"
			}],
			"name": "writedb",
			"outputs": [{
				"name": "_ret",
				"type": "uint256"
			}],
			"payable": false,
			"type": "function"
		}, {
			"constant": true,
			"inputs": [],
			"name": "getOwner",
			"outputs": [{
				"name": "_ret",
				"type": "string"
			}],
			"payable": false,
			"type": "function"
		}, {
			"constant": true,
			"inputs": [{
				"name": "_actionId",
				"type": "string"
			}],
			"name": "checkActionExists",
			"outputs": [{
				"name": "_ret",
				"type": "uint256"
			}],
			"payable": false,
			"type": "function"
		}, {
			"constant": false,
			"inputs": [{
				"name": "_userAddr",
				"type": "address"
			}],
			"name": "deleteByAddress",
			"outputs": [],
			"payable": false,
			"type": "function"
		}, {
			"constant": false,
			"inputs": [{
				"name": "_userAddr",
				"type": "address"
			}, {
				"name": "_roleId",
				"type": "string"
			}],
			"name": "addUserRole",
			"outputs": [{
				"name": "",
				"type": "uint256"
			}],
			"payable": false,
			"type": "function"
		}, {
			"constant": true,
			"inputs": [{
				"name": "_userAddr",
				"type": "address"
			}],
			"name": "findByAddress",
			"outputs": [{
				"name": "_ret",
				"type": "string"
			}],
			"payable": false,
			"type": "function"
		}, {
			"constant": true,
			"inputs": [{
				"name": "_status",
				"type": "uint256"
			}, {
				"name": "_name",
				"type": "string"
			}, {
				"name": "_departmentId",
				"type": "string"
			}, {
				"name": "_pageNum",
				"type": "uint256"
			}, {
				"name": "_pageSize",
				"type": "uint256"
			}],
			"name": "findByDepartmentIdTreeAndContion",
			"outputs": [{
				"name": "_strjson",
				"type": "string"
			}],
			"payable": false,
			"type": "function"
		}, {
			"constant": true,
			"inputs": [{
				"name": "_account",
				"type": "string"
			}],
			"name": "findByAccount",
			"outputs": [{
				"name": "_strjson",
				"type": "string"
			}],
			"payable": false,
			"type": "function"
		}, {
			"constant": true,
			"inputs": [{
				"name": "_roleId",
				"type": "string"
			}],
			"name": "roleUsed",
			"outputs": [{
				"name": "_used",
				"type": "uint256"
			}],
			"payable": false,
			"type": "function"
		}, {
			"constant": true,
			"inputs": [{
				"name": "_actionId",
				"type": "string"
			}],
			"name": "actionExists",
			"outputs": [{
				"name": "_ret",
				"type": "uint256"
			}],
			"payable": false,
			"type": "function"
		}, {
			"constant": true,
			"inputs": [{
				"name": "_userAddr",
				"type": "address"
			}],
			"name": "getUserDepartmentId",
			"outputs": [{
				"name": "_departId",
				"type": "uint256"
			}],
			"payable": false,
			"type": "function"
		}, {
			"constant": true,
			"inputs": [{
				"name": "_userAddr",
				"type": "address"
			}, {
				"name": "_actionId",
				"type": "string"
			}],
			"name": "checkUserAction",
			"outputs": [{
				"name": "_ret",
				"type": "uint256"
			}],
			"payable": false,
			"type": "function"
		}, {
			"constant": true,
			"inputs": [{
				"name": "_userAddr",
				"type": "address"
			}],
			"name": "getUserAddrByAddr",
			"outputs": [{
				"name": "_address",
				"type": "address"
			}],
			"payable": false,
			"type": "function"
		}, {
			"constant": false,
			"inputs": [{
				"name": "_userJson",
				"type": "string"
			}],
			"name": "insert",
			"outputs": [{
				"name": "",
				"type": "uint256"
			}],
			"payable": false,
			"type": "function"
		}, {
			"constant": true,
			"inputs": [],
			"name": "getUserCount",
			"outputs": [{
				"name": "_count",
				"type": "uint256"
			}],
			"payable": false,
			"type": "function"
		}, {
			"constant": true,
			"inputs": [{
				"name": "_str",
				"type": "string"
			}, {
				"name": "_ui",
				"type": "uint256"
			}],
			"name": "log",
			"outputs": [{
				"name": "_ret",
				"type": "uint256"
			}],
			"payable": false,
			"type": "function"
		}, {
			"constant": true,
			"inputs": [{
				"name": "_userAddr",
				"type": "address"
			}],
			"name": "getOwnerAddrByAddr",
			"outputs": [{
				"name": "_address",
				"type": "address"
			}],
			"payable": false,
			"type": "function"
		}, {
			"constant": true,
			"inputs": [{
				"name": "_actionId",
				"type": "string"
			}],
			"name": "getUserCountByActionId",
			"outputs": [{
				"name": "_count",
				"type": "uint256"
			}],
			"payable": false,
			"type": "function"
		}, {
			"constant": false,
			"inputs": [{
				"name": "_userAddr",
				"type": "address"
			}, {
				"name": "_ownerAddr",
				"type": "address"
			}, {
				"name": "_publilcKey",
				"type": "string"
			}, {
				"name": "_cipherGroupKey",
				"type": "string"
			}, {
				"name": "_uuid",
				"type": "string"
			}],
			"name": "resetPasswd",
			"outputs": [{
				"name": "_ret",
				"type": "bool"
			}],
			"payable": false,
			"type": "function"
		}, {
			"constant": true,
			"inputs": [{
				"name": "_roleId",
				"type": "string"
			}],
			"name": "roleExists",
			"outputs": [{
				"name": "_ret",
				"type": "uint256"
			}],
			"payable": false,
			"type": "function"
		}, {
			"constant": true,
			"inputs": [{
				"name": "_departmentId",
				"type": "string"
			}],
			"name": "findByDepartmentId",
			"outputs": [{
				"name": "_strjson",
				"type": "string"
			}],
			"payable": false,
			"type": "function"
		}, {
			"constant": true,
			"inputs": [{
				"name": "_uuid",
				"type": "string"
			}],
			"name": "findByUuid",
			"outputs": [{
				"name": "_strjson",
				"type": "string"
			}],
			"payable": false,
			"type": "function"
		}, {
			"constant": true,
			"inputs": [{
				"name": "_userAddr",
				"type": "address"
			}, {
				"name": "_contractAddr",
				"type": "address"
			}, {
				"name": "_funcSha3",
				"type": "string"
			}],
			"name": "checkUserPrivilege",
			"outputs": [{
				"name": "_ret",
				"type": "uint256"
			}],
			"payable": false,
			"type": "function"
		}, {
			"constant": true,
			"inputs": [{
				"name": "_departmentId",
				"type": "string"
			}],
			"name": "getAdmin",
			"outputs": [{
				"name": "_admin",
				"type": "uint256"
			}],
			"payable": false,
			"type": "function"
		}, {
			"constant": true,
			"inputs": [{
				"name": "_actionId",
				"type": "string"
			}, {
				"name": "_index",
				"type": "uint256"
			}],
			"name": "getRoleIdByActionIdAndIndex",
			"outputs": [{
				"name": "_roleId",
				"type": "uint256"
			}],
			"payable": false,
			"type": "function"
		}, {
			"constant": true,
			"inputs": [{
				"name": "_actionId",
				"type": "string"
			}, {
				"name": "_resKey",
				"type": "address"
			}, {
				"name": "_opSha3Key",
				"type": "string"
			}],
			"name": "checkActionWithKey",
			"outputs": [{
				"name": "_ret",
				"type": "uint256"
			}],
			"payable": false,
			"type": "function"
		}, {
			"constant": false,
			"inputs": [{
				"name": "_userAddr",
				"type": "address"
			}, {
				"name": "_status",
				"type": "uint256"
			}],
			"name": "updateAccountStatus",
			"outputs": [{
				"name": "_ret",
				"type": "bool"
			}],
			"payable": false,
			"type": "function"
		}, {
			"inputs": [],
			"payable": false,
			"type": "constructor"
		}, {
			"anonymous": false,
			"inputs": [{
				"indexed": false,
				"name": "_errno",
				"type": "uint256"
			}, {
				"indexed": false,
				"name": "_info",
				"type": "string"
			}],
			"name": "Notify",
			"type": "event"
		}],
		address: '0x3dcc62732aa829ba28fe08da1cb5f2872935e442',
	},
	//组织
	departmentManager: {
		name: 'DepartmentManager',
		abi: [{
			"constant": false,
			"inputs": [{
				"name": "_departmentId",
				"type": "string"
			}, {
				"name": "_adminAddr",
				"type": "address"
			}],
			"name": "setAdmin",
			"outputs": [{
				"name": "",
				"type": "uint256"
			}],
			"payable": false,
			"type": "function"
		}, {
			"constant": true,
			"inputs": [{
				"name": "_userAddr",
				"type": "address"
			}],
			"name": "userExists",
			"outputs": [{
				"name": "_ret",
				"type": "uint256"
			}],
			"payable": false,
			"type": "function"
		}, {
			"constant": true,
			"inputs": [],
			"name": "getRevision",
			"outputs": [{
				"name": "_revision",
				"type": "uint256"
			}],
			"payable": false,
			"type": "function"
		}, {
			"constant": true,
			"inputs": [{
				"name": "_departmentId",
				"type": "string"
			}],
			"name": "departmentEmpty",
			"outputs": [{
				"name": "_empty",
				"type": "bool"
			}],
			"payable": false,
			"type": "function"
		}, {
			"constant": true,
			"inputs": [],
			"name": "getErrno",
			"outputs": [{
				"name": "",
				"type": "uint256"
			}],
			"payable": false,
			"type": "function"
		}, {
			"constant": false,
			"inputs": [{
				"name": "_departmentId",
				"type": "string"
			}],
			"name": "deleteById",
			"outputs": [],
			"payable": false,
			"type": "function"
		}, {
			"constant": true,
			"inputs": [{
				"name": "_actionId",
				"type": "string"
			}],
			"name": "actionUsed",
			"outputs": [{
				"name": "_used",
				"type": "uint256"
			}],
			"payable": false,
			"type": "function"
		}, {
			"constant": true,
			"inputs": [{
				"name": "_str",
				"type": "string"
			}, {
				"name": "_str2",
				"type": "string"
			}, {
				"name": "_str3",
				"type": "string"
			}],
			"name": "log",
			"outputs": [{
				"name": "_ret",
				"type": "uint256"
			}],
			"payable": false,
			"type": "function"
		}, {
			"constant": true,
			"inputs": [{
				"name": "_str",
				"type": "string"
			}, {
				"name": "_addr",
				"type": "address"
			}],
			"name": "log",
			"outputs": [{
				"name": "_ret",
				"type": "uint256"
			}],
			"payable": false,
			"type": "function"
		}, {
			"constant": true,
			"inputs": [{
				"name": "_commonName",
				"type": "string"
			}],
			"name": "departmentExistsByCN",
			"outputs": [{
				"name": "_ret",
				"type": "uint256"
			}],
			"payable": false,
			"type": "function"
		}, {
			"constant": true,
			"inputs": [{
				"name": "_str",
				"type": "string"
			}, {
				"name": "_i",
				"type": "int256"
			}],
			"name": "log",
			"outputs": [{
				"name": "_ret",
				"type": "uint256"
			}],
			"payable": false,
			"type": "function"
		}, {
			"constant": false,
			"inputs": [{
				"name": "_json",
				"type": "string"
			}],
			"name": "update",
			"outputs": [{
				"name": "",
				"type": "uint256"
			}],
			"payable": false,
			"type": "function"
		}, {
			"constant": false,
			"inputs": [{
				"name": "_name",
				"type": "string"
			}, {
				"name": "_version",
				"type": "string"
			}],
			"name": "register",
			"outputs": [],
			"payable": false,
			"type": "function"
		}, {
			"constant": true,
			"inputs": [{
				"name": "_str",
				"type": "string"
			}],
			"name": "log",
			"outputs": [{
				"name": "_ret",
				"type": "uint256"
			}],
			"payable": false,
			"type": "function"
		}, {
			"constant": true,
			"inputs": [{
				"name": "_parentId",
				"type": "string"
			}],
			"name": "findByParentId",
			"outputs": [{
				"name": "_json",
				"type": "string"
			}],
			"payable": false,
			"type": "function"
		}, {
			"constant": false,
			"inputs": [],
			"name": "kill",
			"outputs": [],
			"payable": false,
			"type": "function"
		}, {
			"constant": true,
			"inputs": [{
				"name": "_addr",
				"type": "address"
			}, {
				"name": "_departmentId",
				"type": "string"
			}],
			"name": "checkWritePermission",
			"outputs": [{
				"name": "_ret",
				"type": "uint256"
			}],
			"payable": false,
			"type": "function"
		}, {
			"constant": true,
			"inputs": [{
				"name": "_name",
				"type": "string"
			}, {
				"name": "_pageNum",
				"type": "uint256"
			}, {
				"name": "_pageSize",
				"type": "uint256"
			}],
			"name": "pageByName",
			"outputs": [{
				"name": "_json",
				"type": "string"
			}],
			"payable": false,
			"type": "function"
		}, {
			"constant": true,
			"inputs": [{
				"name": "_str",
				"type": "string"
			}, {
				"name": "_str2",
				"type": "string"
			}],
			"name": "log",
			"outputs": [{
				"name": "_ret",
				"type": "uint256"
			}],
			"payable": false,
			"type": "function"
		}, {
			"constant": true,
			"inputs": [{
				"name": "_id",
				"type": "string"
			}],
			"name": "findById",
			"outputs": [{
				"name": "_json",
				"type": "string"
			}],
			"payable": false,
			"type": "function"
		}, {
			"constant": true,
			"inputs": [{
				"name": "_roleId",
				"type": "string"
			}, {
				"name": "_actionId",
				"type": "string"
			}],
			"name": "checkRoleAction",
			"outputs": [{
				"name": "_ret",
				"type": "uint256"
			}],
			"payable": false,
			"type": "function"
		}, {
			"constant": true,
			"inputs": [{
				"name": "_name",
				"type": "string"
			}],
			"name": "findByName",
			"outputs": [{
				"name": "_json",
				"type": "string"
			}],
			"payable": false,
			"type": "function"
		}, {
			"constant": true,
			"inputs": [],
			"name": "getSender",
			"outputs": [{
				"name": "_ret",
				"type": "string"
			}],
			"payable": false,
			"type": "function"
		}, {
			"constant": true,
			"inputs": [{
				"name": "_roleId",
				"type": "string"
			}],
			"name": "getRoleModuleId",
			"outputs": [{
				"name": "_ret",
				"type": "uint256"
			}],
			"payable": false,
			"type": "function"
		}, {
			"constant": false,
			"inputs": [{
				"name": "_userAddr",
				"type": "address"
			}],
			"name": "eraseAdminByAddress",
			"outputs": [],
			"payable": false,
			"type": "function"
		}, {
			"constant": true,
			"inputs": [{
				"name": "_departmentId",
				"type": "string"
			}, {
				"name": "_index",
				"type": "uint256"
			}],
			"name": "getChildIdByIndex",
			"outputs": [{
				"name": "_childDepartmentId",
				"type": "uint256"
			}],
			"payable": false,
			"type": "function"
		}, {
			"constant": true,
			"inputs": [{
				"name": "_departmentId",
				"type": "string"
			}],
			"name": "departmentExists",
			"outputs": [{
				"name": "_exists",
				"type": "uint256"
			}],
			"payable": false,
			"type": "function"
		}, {
			"constant": true,
			"inputs": [],
			"name": "listAll",
			"outputs": [{
				"name": "_json",
				"type": "string"
			}],
			"payable": false,
			"type": "function"
		}, {
			"constant": true,
			"inputs": [{
				"name": "_userAddr",
				"type": "address"
			}, {
				"name": "index",
				"type": "uint256"
			}],
			"name": "getUserRoleId",
			"outputs": [{
				"name": "_ret",
				"type": "uint256"
			}],
			"payable": false,
			"type": "function"
		}, {
			"constant": true,
			"inputs": [{
				"name": "_parentId",
				"type": "string"
			}, {
				"name": "_status",
				"type": "uint256"
			}, {
				"name": "_name",
				"type": "string"
			}, {
				"name": "_pageNum",
				"type": "uint256"
			}, {
				"name": "_pageSize",
				"type": "uint256"
			}],
			"name": "pageByNameAndStatus",
			"outputs": [{
				"name": "_json",
				"type": "string"
			}],
			"payable": false,
			"type": "function"
		}, {
			"constant": true,
			"inputs": [{
				"name": "_departmentId",
				"type": "string"
			}],
			"name": "getUserCountByDepartmentId",
			"outputs": [{
				"name": "_count",
				"type": "uint256"
			}],
			"payable": false,
			"type": "function"
		}, {
			"constant": true,
			"inputs": [{
				"name": "_name",
				"type": "string"
			}, {
				"name": "_key",
				"type": "string"
			}, {
				"name": "_value",
				"type": "string"
			}],
			"name": "writedb",
			"outputs": [{
				"name": "_ret",
				"type": "uint256"
			}],
			"payable": false,
			"type": "function"
		}, {
			"constant": true,
			"inputs": [],
			"name": "getOwner",
			"outputs": [{
				"name": "_ret",
				"type": "string"
			}],
			"payable": false,
			"type": "function"
		}, {
			"constant": true,
			"inputs": [{
				"name": "_actionId",
				"type": "string"
			}],
			"name": "checkActionExists",
			"outputs": [{
				"name": "_ret",
				"type": "uint256"
			}],
			"payable": false,
			"type": "function"
		}, {
			"constant": true,
			"inputs": [{
				"name": "_roleId",
				"type": "string"
			}],
			"name": "roleUsed",
			"outputs": [{
				"name": "_used",
				"type": "uint256"
			}],
			"payable": false,
			"type": "function"
		}, {
			"constant": true,
			"inputs": [{
				"name": "_actionId",
				"type": "string"
			}],
			"name": "actionExists",
			"outputs": [{
				"name": "_ret",
				"type": "uint256"
			}],
			"payable": false,
			"type": "function"
		}, {
			"constant": true,
			"inputs": [{
				"name": "_userAddr",
				"type": "address"
			}],
			"name": "getUserDepartmentId",
			"outputs": [{
				"name": "_departId",
				"type": "uint256"
			}],
			"payable": false,
			"type": "function"
		}, {
			"constant": true,
			"inputs": [{
				"name": "_userAddr",
				"type": "address"
			}, {
				"name": "_actionId",
				"type": "string"
			}],
			"name": "checkUserAction",
			"outputs": [{
				"name": "_ret",
				"type": "uint256"
			}],
			"payable": false,
			"type": "function"
		}, {
			"constant": true,
			"inputs": [{
				"name": "_userAddr",
				"type": "address"
			}],
			"name": "getUserAddrByAddr",
			"outputs": [{
				"name": "_address",
				"type": "address"
			}],
			"payable": false,
			"type": "function"
		}, {
			"constant": false,
			"inputs": [{
				"name": "_json",
				"type": "string"
			}],
			"name": "insert",
			"outputs": [{
				"name": "",
				"type": "uint256"
			}],
			"payable": false,
			"type": "function"
		}, {
			"constant": true,
			"inputs": [{
				"name": "_str",
				"type": "string"
			}, {
				"name": "_ui",
				"type": "uint256"
			}],
			"name": "log",
			"outputs": [{
				"name": "_ret",
				"type": "uint256"
			}],
			"payable": false,
			"type": "function"
		}, {
			"constant": false,
			"inputs": [{
				"name": "_departmentId",
				"type": "string"
			}, {
				"name": "_status",
				"type": "uint256"
			}],
			"name": "setDepartmentStatus",
			"outputs": [{
				"name": "",
				"type": "uint256"
			}],
			"payable": false,
			"type": "function"
		}, {
			"constant": true,
			"inputs": [{
				"name": "_roleId",
				"type": "string"
			}],
			"name": "roleExists",
			"outputs": [{
				"name": "_ret",
				"type": "uint256"
			}],
			"payable": false,
			"type": "function"
		}, {
			"constant": true,
			"inputs": [{
				"name": "_userAddr",
				"type": "address"
			}, {
				"name": "_resKey",
				"type": "address"
			}, {
				"name": "_opKey",
				"type": "string"
			}],
			"name": "checkUserPrivilege",
			"outputs": [{
				"name": "_ret",
				"type": "uint256"
			}],
			"payable": false,
			"type": "function"
		}, {
			"constant": true,
			"inputs": [{
				"name": "_departmentId",
				"type": "string"
			}],
			"name": "getAdmin",
			"outputs": [{
				"name": "_admin",
				"type": "uint256"
			}],
			"payable": false,
			"type": "function"
		}, {
			"constant": true,
			"inputs": [{
				"name": "_actionId",
				"type": "string"
			}, {
				"name": "_index",
				"type": "uint256"
			}],
			"name": "getRoleIdByActionIdAndIndex",
			"outputs": [{
				"name": "_roleId",
				"type": "uint256"
			}],
			"payable": false,
			"type": "function"
		}, {
			"constant": true,
			"inputs": [{
				"name": "_actionId",
				"type": "string"
			}, {
				"name": "_resKey",
				"type": "address"
			}, {
				"name": "_opSha3Key",
				"type": "string"
			}],
			"name": "checkActionWithKey",
			"outputs": [{
				"name": "_ret",
				"type": "uint256"
			}],
			"payable": false,
			"type": "function"
		}, {
			"inputs": [],
			"payable": false,
			"type": "constructor"
		}, {
			"anonymous": false,
			"inputs": [{
				"indexed": false,
				"name": "_errno",
				"type": "uint256"
			}, {
				"indexed": false,
				"name": "_info",
				"type": "string"
			}],
			"name": "Notify",
			"type": "event"
		}],
		address: '0x4e7a7f23ca72bd8149ab601d6ed1608f8e6ee8e8',
	},

	//节点申请
	nodeApplyManager: {
		name: 'NodeApplyManager',
		abi: [{
			"constant": true,
			"inputs": [],
			"name": "getErrno",
			"outputs": [{
				"name": "",
				"type": "uint256"
			}],
			"payable": false,
			"type": "function"
		}, {
			"constant": false,
			"inputs": [{
				"name": "_nodeApplyId",
				"type": "string"
			}],
			"name": "deleteById",
			"outputs": [{
				"name": "",
				"type": "bool"
			}],
			"payable": false,
			"type": "function"
		}, {
			"constant": true,
			"inputs": [{
				"name": "_str",
				"type": "string"
			}, {
				"name": "_str2",
				"type": "string"
			}, {
				"name": "_str3",
				"type": "string"
			}],
			"name": "log",
			"outputs": [{
				"name": "_ret",
				"type": "uint256"
			}],
			"payable": false,
			"type": "function"
		}, {
			"constant": true,
			"inputs": [{
				"name": "_str",
				"type": "string"
			}, {
				"name": "_addr",
				"type": "address"
			}],
			"name": "log",
			"outputs": [{
				"name": "_ret",
				"type": "uint256"
			}],
			"payable": false,
			"type": "function"
		}, {
			"constant": false,
			"inputs": [{
				"name": "_json",
				"type": "string"
			}],
			"name": "auditing",
			"outputs": [{
				"name": "",
				"type": "uint256"
			}],
			"payable": false,
			"type": "function"
		}, {
			"constant": true,
			"inputs": [{
				"name": "_str",
				"type": "string"
			}, {
				"name": "_i",
				"type": "int256"
			}],
			"name": "log",
			"outputs": [{
				"name": "_ret",
				"type": "uint256"
			}],
			"payable": false,
			"type": "function"
		}, {
			"constant": false,
			"inputs": [{
				"name": "_json",
				"type": "string"
			}],
			"name": "update",
			"outputs": [{
				"name": "",
				"type": "uint256"
			}],
			"payable": false,
			"type": "function"
		}, {
			"constant": false,
			"inputs": [{
				"name": "_name",
				"type": "string"
			}, {
				"name": "_version",
				"type": "string"
			}],
			"name": "register",
			"outputs": [],
			"payable": false,
			"type": "function"
		}, {
			"constant": true,
			"inputs": [{
				"name": "_str",
				"type": "string"
			}],
			"name": "log",
			"outputs": [{
				"name": "_ret",
				"type": "uint256"
			}],
			"payable": false,
			"type": "function"
		}, {
			"constant": false,
			"inputs": [],
			"name": "kill",
			"outputs": [],
			"payable": false,
			"type": "function"
		}, {
			"constant": true,
			"inputs": [{
				"name": "_str",
				"type": "string"
			}, {
				"name": "_str2",
				"type": "string"
			}],
			"name": "log",
			"outputs": [{
				"name": "_ret",
				"type": "uint256"
			}],
			"payable": false,
			"type": "function"
		}, {
			"constant": true,
			"inputs": [{
				"name": "_status",
				"type": "uint256"
			}, {
				"name": "_deptName",
				"type": "string"
			}, {
				"name": "_pageNum",
				"type": "uint256"
			}, {
				"name": "_pageSize",
				"type": "uint256"
			}],
			"name": "pageByNameAndStatus",
			"outputs": [{
				"name": "_json",
				"type": "string"
			}],
			"payable": false,
			"type": "function"
		}, {
			"constant": true,
			"inputs": [],
			"name": "getSender",
			"outputs": [{
				"name": "_ret",
				"type": "string"
			}],
			"payable": false,
			"type": "function"
		}, {
			"constant": true,
			"inputs": [],
			"name": "listAll",
			"outputs": [{
				"name": "_json",
				"type": "string"
			}],
			"payable": false,
			"type": "function"
		}, {
			"constant": true,
			"inputs": [{
				"name": "_name",
				"type": "string"
			}, {
				"name": "_key",
				"type": "string"
			}, {
				"name": "_value",
				"type": "string"
			}],
			"name": "writedb",
			"outputs": [{
				"name": "_ret",
				"type": "uint256"
			}],
			"payable": false,
			"type": "function"
		}, {
			"constant": true,
			"inputs": [],
			"name": "getOwner",
			"outputs": [{
				"name": "_ret",
				"type": "string"
			}],
			"payable": false,
			"type": "function"
		}, {
			"constant": true,
			"inputs": [{
				"name": "_nodeApplyId",
				"type": "string"
			}],
			"name": "findByApplyId",
			"outputs": [{
				"name": "_json",
				"type": "string"
			}],
			"payable": false,
			"type": "function"
		}, {
			"constant": false,
			"inputs": [{
				"name": "_json",
				"type": "string"
			}],
			"name": "insert",
			"outputs": [{
				"name": "",
				"type": "uint256"
			}],
			"payable": false,
			"type": "function"
		}, {
			"constant": true,
			"inputs": [{
				"name": "_str",
				"type": "string"
			}, {
				"name": "_ui",
				"type": "uint256"
			}],
			"name": "log",
			"outputs": [{
				"name": "_ret",
				"type": "uint256"
			}],
			"payable": false,
			"type": "function"
		}, {
			"constant": true,
			"inputs": [{
				"name": "_nodeApplyId",
				"type": "string"
			}],
			"name": "nodeApplyExists",
			"outputs": [{
				"name": "_exists",
				"type": "uint256"
			}],
			"payable": false,
			"type": "function"
		}, {
			"constant": true,
			"inputs": [{
				"name": "_state",
				"type": "uint256"
			}],
			"name": "findByState",
			"outputs": [{
				"name": "_strjson",
				"type": "string"
			}],
			"payable": false,
			"type": "function"
		}, {
			"inputs": [],
			"payable": false,
			"type": "constructor"
		}, {
			"anonymous": false,
			"inputs": [{
				"indexed": false,
				"name": "_error",
				"type": "uint256"
			}, {
				"indexed": false,
				"name": "_info",
				"type": "string"
			}],
			"name": "Notify",
			"type": "event"
		}],
		address: '',
	},
	
	//-------
	TransferOwnershipManager: {
		name: 'TransferOwnershipManager',
		abi: [{
			"constant": true,
			"inputs": [],
			"name": "getErrno",
			"outputs": [{
				"name": "",
				"type": "uint256"
			}],
			"payable": false,
			"type": "function"
		}, {
			"constant": false,
			"inputs": [{
				"name": "_str",
				"type": "string"
			}, {
				"name": "_addr",
				"type": "address"
			}],
			"name": "log",
			"outputs": [],
			"payable": false,
			"type": "function"
		}, {
			"constant": false,
			"inputs": [{
				"name": "_str",
				"type": "string"
			}, {
				"name": "_i",
				"type": "int256"
			}],
			"name": "log",
			"outputs": [],
			"payable": false,
			"type": "function"
		}, {
			"constant": false,
			"inputs": [{
				"name": "_name",
				"type": "string"
			}, {
				"name": "_version",
				"type": "string"
			}],
			"name": "register",
			"outputs": [],
			"payable": false,
			"type": "function"
		}, {
			"constant": false,
			"inputs": [{
				"name": "_str",
				"type": "string"
			}],
			"name": "log",
			"outputs": [],
			"payable": false,
			"type": "function"
		}, {
			"constant": false,
			"inputs": [],
			"name": "kill",
			"outputs": [],
			"payable": false,
			"type": "function"
		}, {
			"constant": false,
			"inputs": [{
				"name": "_str",
				"type": "string"
			}, {
				"name": "_str2",
				"type": "string"
			}],
			"name": "log",
			"outputs": [],
			"payable": false,
			"type": "function"
		}, {
			"constant": true,
			"inputs": [{
				"name": "_str",
				"type": "string"
			}],
			"name": "asciiStrLength",
			"outputs": [{
				"name": "_length",
				"type": "uint256"
			}],
			"payable": false,
			"type": "function"
		}, {
			"constant": false,
			"inputs": [],
			"name": "clearLog",
			"outputs": [],
			"payable": false,
			"type": "function"
		}, {
			"constant": true,
			"inputs": [],
			"name": "getSender",
			"outputs": [{
				"name": "_ret",
				"type": "string"
			}],
			"payable": false,
			"type": "function"
		}, {
			"constant": true,
			"inputs": [{
				"name": "_json",
				"type": "string"
			}],
			"name": "pageTransferOwnershipInfoByCond",
			"outputs": [{
				"name": "_ret",
				"type": "string"
			}],
			"payable": false,
			"type": "function"
		}, {
			"constant": true,
			"inputs": [],
			"name": "getOwner",
			"outputs": [{
				"name": "_ret",
				"type": "string"
			}],
			"payable": false,
			"type": "function"
		}, {
			"constant": true,
			"inputs": [],
			"name": "getLog",
			"outputs": [{
				"name": "_ret",
				"type": "string"
			}],
			"payable": false,
			"type": "function"
		}, {
			"constant": false,
			"inputs": [{
				"name": "_str",
				"type": "string"
			}, {
				"name": "_ui",
				"type": "uint256"
			}],
			"name": "log",
			"outputs": [],
			"payable": false,
			"type": "function"
		}, {
			"constant": false,
			"inputs": [{
				"name": "_json",
				"type": "string"
			}],
			"name": "insertTransferOwnershipInfo",
			"outputs": [],
			"payable": false,
			"type": "function"
		}, {
			"constant": true,
			"inputs": [{
				"name": "_json",
				"type": "string"
			}],
			"name": "selectTransferOwnershipInfoById",
			"outputs": [{
				"name": "_ret",
				"type": "string"
			}],
			"payable": false,
			"type": "function"
		}, {
			"constant": false,
			"inputs": [{
				"name": "_json",
				"type": "string"
			}],
			"name": "finishTransferOwnership",
			"outputs": [],
			"payable": false,
			"type": "function"
		}, {
			"inputs": [],
			"payable": false,
			"type": "constructor"
		}, {
			"anonymous": false,
			"inputs": [{
				"indexed": false,
				"name": "_errno",
				"type": "uint256"
			}, {
				"indexed": false,
				"name": "_info",
				"type": "string"
			}],
			"name": "Notify",
			"type": "event"
		}],
		address: '',
	}


}

export default CONTRACT_CONFIG;