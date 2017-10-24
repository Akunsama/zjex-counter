var Web3 = require("web3");
var SolidityEvent = require("web3/lib/web3/event.js");

(function() {
  // Planned for future features, logging, etc.
  function Provider(provider) {
    this.provider = provider;
  }

  Provider.prototype.send = function() {
    this.provider.send.apply(this.provider, arguments);
  };

  Provider.prototype.sendAsync = function() {
    this.provider.sendAsync.apply(this.provider, arguments);
  };

  var BigNumber = (new Web3()).toBigNumber(0).constructor;

  var Utils = {
    is_object: function(val) {
      return typeof val == "object" && !Array.isArray(val);
    },
    is_big_number: function(val) {
      if (typeof val != "object") return false;

      // Instanceof won't work because we have multiple versions of Web3.
      try {
        new BigNumber(val);
        return true;
      } catch (e) {
        return false;
      }
    },
    merge: function() {
      var merged = {};
      var args = Array.prototype.slice.call(arguments);

      for (var i = 0; i < args.length; i++) {
        var object = args[i];
        var keys = Object.keys(object);
        for (var j = 0; j < keys.length; j++) {
          var key = keys[j];
          var value = object[key];
          merged[key] = value;
        }
      }

      return merged;
    },
    promisifyFunction: function(fn, C) {
      var self = this;
      return function() {
        var instance = this;

        var args = Array.prototype.slice.call(arguments);
        var tx_params = {};
        var last_arg = args[args.length - 1];

        // It's only tx_params if it's an object and not a BigNumber.
        if (Utils.is_object(last_arg) && !Utils.is_big_number(last_arg)) {
          tx_params = args.pop();
        }

        tx_params = Utils.merge(C.class_defaults, tx_params);

        return new Promise(function(accept, reject) {
          var callback = function(error, result) {
            if (error != null) {
              reject(error);
            } else {
              accept(result);
            }
          };
          args.push(tx_params, callback);
          fn.apply(instance.contract, args);
        });
      };
    },
    synchronizeFunction: function(fn, instance, C) {
      var self = this;
      return function() {
        var args = Array.prototype.slice.call(arguments);
        var tx_params = {};
        var last_arg = args[args.length - 1];

        // It's only tx_params if it's an object and not a BigNumber.
        if (Utils.is_object(last_arg) && !Utils.is_big_number(last_arg)) {
          tx_params = args.pop();
        }

        tx_params = Utils.merge(C.class_defaults, tx_params);

        return new Promise(function(accept, reject) {

          var decodeLogs = function(logs) {
            return logs.map(function(log) {
              var logABI = C.events[log.topics[0]];

              if (logABI == null) {
                return null;
              }

              var decoder = new SolidityEvent(null, logABI, instance.address);
              return decoder.decode(log);
            }).filter(function(log) {
              return log != null;
            });
          };

          var callback = function(error, tx) {
            if (error != null) {
              reject(error);
              return;
            }

            var timeout = C.synchronization_timeout || 240000;
            var start = new Date().getTime();

            var make_attempt = function() {
              C.web3.eth.getTransactionReceipt(tx, function(err, receipt) {
                if (err) return reject(err);

                if (receipt != null) {
                  // If they've opted into next gen, return more information.
                  if (C.next_gen == true) {
                    return accept({
                      tx: tx,
                      receipt: receipt,
                      logs: decodeLogs(receipt.logs)
                    });
                  } else {
                    return accept(tx);
                  }
                }

                if (timeout > 0 && new Date().getTime() - start > timeout) {
                  return reject(new Error("Transaction " + tx + " wasn't processed in " + (timeout / 1000) + " seconds!"));
                }

                setTimeout(make_attempt, 1000);
              });
            };

            make_attempt();
          };

          args.push(tx_params, callback);
          fn.apply(self, args);
        });
      };
    }
  };

  function instantiate(instance, contract) {
    instance.contract = contract;
    var constructor = instance.constructor;

    // Provision our functions.
    for (var i = 0; i < instance.abi.length; i++) {
      var item = instance.abi[i];
      if (item.type == "function") {
        if (item.constant == true) {
          instance[item.name] = Utils.promisifyFunction(contract[item.name], constructor);
        } else {
          instance[item.name] = Utils.synchronizeFunction(contract[item.name], instance, constructor);
        }

        instance[item.name].call = Utils.promisifyFunction(contract[item.name].call, constructor);
        instance[item.name].sendTransaction = Utils.promisifyFunction(contract[item.name].sendTransaction, constructor);
        instance[item.name].request = contract[item.name].request;
        instance[item.name].estimateGas = Utils.promisifyFunction(contract[item.name].estimateGas, constructor);
      }

      if (item.type == "event") {
        instance[item.name] = contract[item.name];
      }
    }

    instance.allEvents = contract.allEvents;
    instance.address = contract.address;
    instance.transactionHash = contract.transactionHash;
  };

  // Use inheritance to create a clone of this contract,
  // and copy over contract's static functions.
  function mutate(fn) {
    var temp = function Clone() { return fn.apply(this, arguments); };

    Object.keys(fn).forEach(function(key) {
      temp[key] = fn[key];
    });

    temp.prototype = Object.create(fn.prototype);
    bootstrap(temp);
    return temp;
  };

  function bootstrap(fn) {
    fn.web3 = new Web3();
    fn.class_defaults  = fn.prototype.defaults || {};

    // Set the network iniitally to make default data available and re-use code.
    // Then remove the saved network id so the network will be auto-detected on first use.
    fn.setNetwork("default");
    fn.network_id = null;
    return fn;
  };

  // Accepts a contract object created with web3.eth.contract.
  // Optionally, if called without `new`, accepts a network_id and will
  // create a new version of the contract abstraction with that network_id set.
  function Contract() {
    if (this instanceof Contract) {
      instantiate(this, arguments[0]);
    } else {
      var C = mutate(Contract);
      var network_id = arguments.length > 0 ? arguments[0] : "default";
      C.setNetwork(network_id);
      return C;
    }
  };

  Contract.currentProvider = null;

  Contract.setProvider = function(provider) {
    var wrapped = new Provider(provider);
    this.web3.setProvider(wrapped);
    this.currentProvider = provider;
  };

  Contract.new = function() {
    if (this.currentProvider == null) {
      throw new Error("DepartmentManager error: Please call setProvider() first before calling new().");
    }

    var args = Array.prototype.slice.call(arguments);

    if (!this.unlinked_binary) {
      throw new Error("DepartmentManager error: contract binary not set. Can't deploy new instance.");
    }

    var regex = /__[^_]+_+/g;
    var unlinked_libraries = this.binary.match(regex);

    if (unlinked_libraries != null) {
      unlinked_libraries = unlinked_libraries.map(function(name) {
        // Remove underscores
        return name.replace(/_/g, "");
      }).sort().filter(function(name, index, arr) {
        // Remove duplicates
        if (index + 1 >= arr.length) {
          return true;
        }

        return name != arr[index + 1];
      }).join(", ");

      throw new Error("DepartmentManager contains unresolved libraries. You must deploy and link the following libraries before you can deploy a new version of DepartmentManager: " + unlinked_libraries);
    }

    var self = this;

    return new Promise(function(accept, reject) {
      var contract_class = self.web3.eth.contract(self.abi);
      var tx_params = {};
      var last_arg = args[args.length - 1];

      // It's only tx_params if it's an object and not a BigNumber.
      if (Utils.is_object(last_arg) && !Utils.is_big_number(last_arg)) {
        tx_params = args.pop();
      }

      tx_params = Utils.merge(self.class_defaults, tx_params);

      if (tx_params.data == null) {
        tx_params.data = self.binary;
      }

      // web3 0.9.0 and above calls new twice this callback twice.
      // Why, I have no idea...
      var intermediary = function(err, web3_instance) {
        if (err != null) {
          reject(err);
          return;
        }

        if (err == null && web3_instance != null && web3_instance.address != null) {
          accept(new self(web3_instance));
        }
      };

      args.push(tx_params, intermediary);
      contract_class.new.apply(contract_class, args);
    });
  };

  Contract.at = function(address) {
    if (address == null || typeof address != "string" || address.length != 42) {
      throw new Error("Invalid address passed to DepartmentManager.at(): " + address);
    }

    var contract_class = this.web3.eth.contract(this.abi);
    var contract = contract_class.at(address);

    return new this(contract);
  };

  Contract.deployed = function() {
    if (!this.address) {
      throw new Error("Cannot find deployed address: DepartmentManager not deployed or address not set.");
    }

    return this.at(this.address);
  };

  Contract.defaults = function(class_defaults) {
    if (this.class_defaults == null) {
      this.class_defaults = {};
    }

    if (class_defaults == null) {
      class_defaults = {};
    }

    var self = this;
    Object.keys(class_defaults).forEach(function(key) {
      var value = class_defaults[key];
      self.class_defaults[key] = value;
    });

    return this.class_defaults;
  };

  Contract.extend = function() {
    var args = Array.prototype.slice.call(arguments);

    for (var i = 0; i < arguments.length; i++) {
      var object = arguments[i];
      var keys = Object.keys(object);
      for (var j = 0; j < keys.length; j++) {
        var key = keys[j];
        var value = object[key];
        this.prototype[key] = value;
      }
    }
  };

  Contract.all_networks = {
  "default": {
    "abi": [
      {
        "constant": false,
        "inputs": [
          {
            "name": "_pubkey",
            "type": "string"
          }
        ],
        "name": "ActivateEnode",
        "outputs": [],
        "payable": false,
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "_departmentId",
            "type": "string"
          },
          {
            "name": "_adminAddr",
            "type": "address"
          }
        ],
        "name": "setAdmin",
        "outputs": [
          {
            "name": "",
            "type": "uint256"
          }
        ],
        "payable": false,
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "_userAddr",
            "type": "address"
          }
        ],
        "name": "userExists",
        "outputs": [
          {
            "name": "_ret",
            "type": "uint256"
          }
        ],
        "payable": false,
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "getRevision",
        "outputs": [
          {
            "name": "_revision",
            "type": "uint256"
          }
        ],
        "payable": false,
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "_departmentId",
            "type": "string"
          }
        ],
        "name": "departmentEmpty",
        "outputs": [
          {
            "name": "_empty",
            "type": "bool"
          }
        ],
        "payable": false,
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "getErrno",
        "outputs": [
          {
            "name": "",
            "type": "uint256"
          }
        ],
        "payable": false,
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "_departmentId",
            "type": "string"
          }
        ],
        "name": "deleteById",
        "outputs": [],
        "payable": false,
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "_actionId",
            "type": "string"
          }
        ],
        "name": "actionUsed",
        "outputs": [
          {
            "name": "_used",
            "type": "uint256"
          }
        ],
        "payable": false,
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
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
        "inputs": [
          {
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
        "inputs": [
          {
            "name": "_json",
            "type": "string"
          }
        ],
        "name": "update",
        "outputs": [
          {
            "name": "",
            "type": "uint256"
          }
        ],
        "payable": false,
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
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
        "inputs": [
          {
            "name": "_str",
            "type": "string"
          }
        ],
        "name": "log",
        "outputs": [],
        "payable": false,
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "_parentId",
            "type": "string"
          }
        ],
        "name": "findByParentId",
        "outputs": [
          {
            "name": "_json",
            "type": "string"
          }
        ],
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
        "constant": true,
        "inputs": [
          {
            "name": "_addr",
            "type": "address"
          },
          {
            "name": "_departmentId",
            "type": "string"
          }
        ],
        "name": "checkWritePermission",
        "outputs": [
          {
            "name": "_ret",
            "type": "uint256"
          }
        ],
        "payable": false,
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "_name",
            "type": "string"
          },
          {
            "name": "_pageNum",
            "type": "uint256"
          },
          {
            "name": "_pageSize",
            "type": "uint256"
          }
        ],
        "name": "pageByName",
        "outputs": [
          {
            "name": "_json",
            "type": "string"
          }
        ],
        "payable": false,
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
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
        "constant": true,
        "inputs": [
          {
            "name": "_id",
            "type": "string"
          }
        ],
        "name": "findById",
        "outputs": [
          {
            "name": "_json",
            "type": "string"
          }
        ],
        "payable": false,
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "_roleId",
            "type": "string"
          },
          {
            "name": "_actionId",
            "type": "string"
          }
        ],
        "name": "checkRoleAction",
        "outputs": [
          {
            "name": "_ret",
            "type": "uint256"
          }
        ],
        "payable": false,
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "_name",
            "type": "string"
          }
        ],
        "name": "findByName",
        "outputs": [
          {
            "name": "_json",
            "type": "string"
          }
        ],
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
        "outputs": [
          {
            "name": "_ret",
            "type": "string"
          }
        ],
        "payable": false,
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "_userAddr",
            "type": "address"
          }
        ],
        "name": "eraseAdminByAddress",
        "outputs": [],
        "payable": false,
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "_departmentId",
            "type": "string"
          },
          {
            "name": "_index",
            "type": "uint256"
          }
        ],
        "name": "getChildIdByIndex",
        "outputs": [
          {
            "name": "_childDepartmentId",
            "type": "uint256"
          }
        ],
        "payable": false,
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "_commonName",
            "type": "string"
          },
          {
            "name": "_ip",
            "type": "string"
          }
        ],
        "name": "isInWhiteList",
        "outputs": [
          {
            "name": "_json",
            "type": "string"
          }
        ],
        "payable": false,
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "_departmentId",
            "type": "string"
          },
          {
            "name": "_actionId",
            "type": "string"
          }
        ],
        "name": "checkDepartmentAction",
        "outputs": [
          {
            "name": "_ret",
            "type": "uint256"
          }
        ],
        "payable": false,
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "_departmentId",
            "type": "string"
          }
        ],
        "name": "departmentExists",
        "outputs": [
          {
            "name": "_exists",
            "type": "uint256"
          }
        ],
        "payable": false,
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "listAll",
        "outputs": [
          {
            "name": "_json",
            "type": "string"
          }
        ],
        "payable": false,
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "_userAddr",
            "type": "address"
          },
          {
            "name": "index",
            "type": "uint256"
          }
        ],
        "name": "getUserRoleId",
        "outputs": [
          {
            "name": "_ret",
            "type": "uint256"
          }
        ],
        "payable": false,
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "_departmentId",
            "type": "string"
          }
        ],
        "name": "getUserCountByDepartmentId",
        "outputs": [
          {
            "name": "_count",
            "type": "uint256"
          }
        ],
        "payable": false,
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "getOwner",
        "outputs": [
          {
            "name": "_ret",
            "type": "string"
          }
        ],
        "payable": false,
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "_actionId",
            "type": "string"
          }
        ],
        "name": "checkActionExists",
        "outputs": [
          {
            "name": "_ret",
            "type": "uint256"
          }
        ],
        "payable": false,
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "_departmentId",
            "type": "string"
          },
          {
            "name": "index",
            "type": "uint256"
          }
        ],
        "name": "getDepartmentRoleId",
        "outputs": [
          {
            "name": "_ret",
            "type": "uint256"
          }
        ],
        "payable": false,
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "getLog",
        "outputs": [
          {
            "name": "_ret",
            "type": "string"
          }
        ],
        "payable": false,
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "_roleId",
            "type": "string"
          }
        ],
        "name": "roleUsed",
        "outputs": [
          {
            "name": "_used",
            "type": "uint256"
          }
        ],
        "payable": false,
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "_actionId",
            "type": "string"
          }
        ],
        "name": "actionExists",
        "outputs": [
          {
            "name": "_ret",
            "type": "uint256"
          }
        ],
        "payable": false,
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "_userAddr",
            "type": "address"
          }
        ],
        "name": "getUserDepartmentId",
        "outputs": [
          {
            "name": "_departId",
            "type": "uint256"
          }
        ],
        "payable": false,
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "_userAddr",
            "type": "address"
          },
          {
            "name": "_actionId",
            "type": "string"
          }
        ],
        "name": "checkUserAction",
        "outputs": [
          {
            "name": "_ret",
            "type": "uint256"
          }
        ],
        "payable": false,
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "_json",
            "type": "string"
          }
        ],
        "name": "insert",
        "outputs": [
          {
            "name": "",
            "type": "uint256"
          }
        ],
        "payable": false,
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
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
        "constant": true,
        "inputs": [
          {
            "name": "_departmentId",
            "type": "string"
          },
          {
            "name": "_roleId",
            "type": "string"
          }
        ],
        "name": "checkDepartmentRole",
        "outputs": [
          {
            "name": "_ret",
            "type": "uint256"
          }
        ],
        "payable": false,
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "getMiningInfo",
        "outputs": [
          {
            "name": "_json",
            "type": "string"
          }
        ],
        "payable": false,
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "_roleId",
            "type": "string"
          }
        ],
        "name": "roleExists",
        "outputs": [
          {
            "name": "_ret",
            "type": "uint256"
          }
        ],
        "payable": false,
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "_userAddr",
            "type": "address"
          },
          {
            "name": "_resKey",
            "type": "address"
          },
          {
            "name": "_opKey",
            "type": "string"
          }
        ],
        "name": "checkUserPrivilege",
        "outputs": [
          {
            "name": "_ret",
            "type": "uint256"
          }
        ],
        "payable": false,
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "getEnodeList",
        "outputs": [
          {
            "name": "_json",
            "type": "string"
          }
        ],
        "payable": false,
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "_departmentId",
            "type": "string"
          }
        ],
        "name": "getAdmin",
        "outputs": [
          {
            "name": "_admin",
            "type": "uint256"
          }
        ],
        "payable": false,
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "_actionId",
            "type": "string"
          },
          {
            "name": "_index",
            "type": "uint256"
          }
        ],
        "name": "getRoleIdByActionIdAndIndex",
        "outputs": [
          {
            "name": "_roleId",
            "type": "uint256"
          }
        ],
        "payable": false,
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "_actionId",
            "type": "string"
          },
          {
            "name": "_resKey",
            "type": "address"
          },
          {
            "name": "_opSha3Key",
            "type": "string"
          }
        ],
        "name": "checkActionWithKey",
        "outputs": [
          {
            "name": "_ret",
            "type": "uint256"
          }
        ],
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
        "inputs": [
          {
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
      }
    ],
    "unlinked_binary": "0x606060405260006002553462000000575b5b600080546c0100000000000000000000000033810204600160a060020a0319918216179091556001805490911660111790555b6000601855604080518082018252601181527f4465706172746d656e744d616e616765720000000000000000000000000000006020808301919091528251808401909352600783527f302e302e312e300000000000000000000000000000000000000000000000000090830152620000ca91640100000000620054be620000d182021704565b5b62000209565b600160009054906101000a9004600160a060020a0316600160a060020a0316633ffbd47f8383604051837c01000000000000000000000000000000000000000000000000000000000281526004018080602001806020018381038352858181518152602001915080519060200190808383829060006004602084601f0104600302600f01f150905090810190601f168015620001815780820380516001836020036101000a031916815260200191505b508381038252848181518152602001915080519060200190808383829060006004602084601f0104600302600f01f150905090810190601f168015620001db5780820380516001836020036101000a031916815260200191505b50945050505050600060405180830381600087803b15620000005760325a03f11562000000575050505b5050565b62011cab80620002196000396000f360606040523615620002615760e060020a600035046303959c1b811462000267578063081db42914620002bf5780630e666e4914620003295780631316529d146200034e57806317af93fd1462000370578063180db1b414620003da578063276e647214620003fc578063297c4ac21462000454578063319af33314620004bc5780633ca6268e14620005165780633d7403a314620005705780633ffbd47f14620005d857806341304fac146200066d5780634194fee814620006c557806341c0e1b5146200078a578063468e10f2146200079c5780634b3e617f14620008055780634b5c427714620008d15780634bd304d014620009665780634cf024a61462000a2b5780634d9a31361462000ad05780635c50745e1462000b955780635e01eb5a1462000ba757806361e1d9561462000c2657806367224fdf1462000c3b5780636b7a29601462000ca557806370ae76f01462000da7578063758ed2fd1462000e4c57806378a9eeed1462000eb4578063791edf331462000f33578063864359ec1462000454578063893d20e81462000fc35780638ca482de14620004545780638d9a4b8014620010aa578063909e4ab61462001114578063aa70b0d41462001193578063aaa5cb2a1462000454578063aebcd8dc1462000329578063b040d8e91462001288578063b1498e2914620012f1578063b60e72cc1462001359578063bf93fc1a14620013b3578063c9186ddc1462001458578063d00cce411462000454578063dccca16c146200153f578063e2c1012414620015ab578063e6d218d9146200162a578063f4f818901462001692578063f6bfc76314620016fc575b62000000565b346200000057620002bd600480803590602001908201803590602001908080601f01602080910402602001604051908101604052809392919081815260200183838082843750949650620017a695505050505050565b005b34620000005762000317600480803590602001908201803590602001908080601f016020809104026020016040519081016040528093929190818152602001838380828437509496505093359350620019c592505050565b60408051918252519081900360200190f35b3462000000576200031760043562001c8e565b60408051918252519081900360200190f35b3462000000576200031762001c96565b60408051918252519081900360200190f35b346200000057620003c6600480803590602001908201803590602001908080601f0160208091040260200160405190810160405280939291908181526020018383808284375094965062001c9d95505050505050565b604080519115158252519081900360200190f35b3462000000576200031762001de9565b60408051918252519081900360200190f35b346200000057620002bd600480803590602001908201803590602001908080601f0160208091040260200160405190810160405280939291908181526020018383808284375094965062001df095505050505050565b005b34620000005762000317600480803590602001908201803590602001908080601f0160208091040260200160405190810160405280939291908181526020018383808284375094965062001c8e95505050505050565b60408051918252519081900360200190f35b346200000057620002bd600480803590602001908201803590602001908080601f0160208091040260200160405190810160405280939291908181526020018383808284375094965050933593506200222e92505050565b005b346200000057620002bd600480803590602001908201803590602001908080601f016020809104026020016040519081016040528093929190818152602001838380828437509496505093359350620023ab92505050565b005b34620000005762000317600480803590602001908201803590602001908080601f016020809104026020016040519081016040528093929190818152602001838380828437509496506200251f95505050505050565b60408051918252519081900360200190f35b346200000057620002bd600480803590602001908201803590602001908080601f0160208091040260200160405190810160405280939291908181526020018383808284375050604080516020601f89358b01803591820183900483028401830190945280835297999881019791965091820194509250829150840183828082843750949650620054be95505050505050565b005b346200000057620002bd600480803590602001908201803590602001908080601f01602080910402602001604051908101604052809392919081815260200183838082843750949650620055dd95505050505050565b005b3462000000576200071b600480803590602001908201803590602001908080601f016020809104026020016040519081016040528093929190818152602001838380828437509496506200574695505050505050565b60405180806020018281038252838181518152602001915080519060200190808383829060006004602084601f0104600302600f01f150905090810190601f1680156200077c5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b346200000057620002bd6200576a565b005b34620000005760408051602060046024803582810135601f8101859004850286018501909652858552620003179583359593946044949392909201918190840183828082843750949650620057f195505050505050565b60408051918252519081900360200190f35b3462000000576200071b600480803590602001908201803590602001908080601f01602080910402602001604051908101604052809392919081815260200183838082843750949650508435946020013593506200595792505050565b60405180806020018281038252838181518152602001915080519060200190808383829060006004602084601f0104600302600f01f150905090810190601f1680156200077c5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b346200000057620002bd600480803590602001908201803590602001908080601f0160208091040260200160405190810160405280939291908181526020018383808284375050604080516020601f89358b0180359182018390048302840183019094528083529799988101979196509182019450925082915084018382808284375094965062005cf695505050505050565b005b3462000000576200071b600480803590602001908201803590602001908080601f0160208091040260200160405190810160405280939291908181526020018383808284375094965062005e6595505050505050565b60405180806020018281038252838181518152602001915080519060200190808383829060006004602084601f0104600302600f01f150905090810190601f1680156200077c5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b34620000005762000317600480803590602001908201803590602001908080601f0160208091040260200160405190810160405280939291908181526020018383808284375050604080516020601f89358b0180359182018390048302840183019094528083529799988101979196509182019450925082915084018382808284375094965062005e8995505050505050565b60408051918252519081900360200190f35b3462000000576200071b600480803590602001908201803590602001908080601f0160208091040260200160405190810160405280939291908181526020018383808284375094965062005e9295505050505050565b60405180806020018281038252838181518152602001915080519060200190808383829060006004602084601f0104600302600f01f150905090810190601f1680156200077c5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b346200000057620002bd62005eb6565b005b3462000000576200071b62005f7b565b60405180806020018281038252838181518152602001915080519060200190808383829060006004602084601f0104600302600f01f150905090810190601f1680156200077c5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b346200000057620002bd60043562005faa565b005b34620000005762000317600480803590602001908201803590602001908080601f0160208091040260200160405190810160405280939291908181526020018383808284375094965050933593506200643692505050565b60408051918252519081900360200190f35b3462000000576200071b600480803590602001908201803590602001908080601f0160208091040260200160405190810160405280939291908181526020018383808284375050604080516020601f89358b018035918201839004830284018301909452808352979998810197919650918201945092508291508401838280828437509496506200662d95505050505050565b60405180806020018281038252838181518152602001915080519060200190808383829060006004602084601f0104600302600f01f150905090810190601f1680156200077c5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b34620000005762000317600480803590602001908201803590602001908080601f0160208091040260200160405190810160405280939291908181526020018383808284375050604080516020601f89358b01803591820183900483028401830190945280835297999881019791965091820194509250829150840183828082843750949650620069f995505050505050565b60408051918252519081900360200190f35b34620000005762000317600480803590602001908201803590602001908080601f0160208091040260200160405190810160405280939291908181526020018383808284375094965062006dd295505050505050565b60408051918252519081900360200190f35b3462000000576200071b62006eff565b60405180806020018281038252838181518152602001915080519060200190808383829060006004602084601f0104600302600f01f150905090810190601f1680156200077c5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b3462000000576200031760043560243562005e89565b60408051918252519081900360200190f35b34620000005762000317600480803590602001908201803590602001908080601f0160208091040260200160405190810160405280939291908181526020018383808284375094965062001c8e95505050505050565b60408051918252519081900360200190f35b3462000000576200071b62006f3e565b60405180806020018281038252838181518152602001915080519060200190808383829060006004602084601f0104600302600f01f150905090810190601f1680156200077c5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b34620000005762000317600480803590602001908201803590602001908080601f0160208091040260200160405190810160405280939291908181526020018383808284375094965062001c8e95505050505050565b60408051918252519081900360200190f35b34620000005762000317600480803590602001908201803590602001908080601f01602080910402602001604051908101604052809392919081815260200183838082843750949650509335935062006f7792505050565b60408051918252519081900360200190f35b3462000000576200071b620071d5565b60405180806020018281038252838181518152602001915080519060200190808383829060006004602084601f0104600302600f01f150905090810190601f1680156200077c5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b34620000005762000317600480803590602001908201803590602001908080601f016020809104026020016040519081016040528093929190818152602001838380828437509496506200727795505050505050565b60408051918252519081900360200190f35b34620000005762000317600480803590602001908201803590602001908080601f0160208091040260200160405190810160405280939291908181526020018383808284375094965062001c8e95505050505050565b60408051918252519081900360200190f35b3462000000576200031760043562001c8e565b60408051918252519081900360200190f35b34620000005760408051602060046024803582810135601f810185900485028601850190965285855262000317958335959394604494939290920191819084018382808284375094965062005e8995505050505050565b60408051918252519081900360200190f35b34620000005762000317600480803590602001908201803590602001908080601f016020809104026020016040519081016040528093929190818152602001838380828437509496506200741895505050505050565b60408051918252519081900360200190f35b346200000057620002bd600480803590602001908201803590602001908080601f0160208091040260200160405190810160405280939291908181526020018383808284375094965050933593506200a56e92505050565b005b34620000005762000317600480803590602001908201803590602001908080601f0160208091040260200160405190810160405280939291908181526020018383808284375050604080516020601f89358b018035918201839004830284018301909452808352979998810197919650918201945092508291508401838280828437509496506200a6e295505050505050565b60408051918252519081900360200190f35b3462000000576200071b6200a949565b60405180806020018281038252838181518152602001915080519060200190808383829060006004602084601f0104600302600f01f150905090810190601f1680156200077c5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b34620000005762000317600480803590602001908201803590602001908080601f0160208091040260200160405190810160405280939291908181526020018383808284375094965062001c8e95505050505050565b60408051918252519081900360200190f35b346200000057604080516020600460443581810135601f8101849004840285018401909552848452620003179482359460248035956064949293919092019181908401838280828437509496506200ad3d95505050505050565b60408051918252519081900360200190f35b3462000000576200071b6200ad47565b60405180806020018281038252838181518152602001915080519060200190808383829060006004602084601f0104600302600f01f150905090810190601f1680156200077c5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b34620000005762000317600480803590602001908201803590602001908080601f016020809104026020016040519081016040528093929190818152602001838380828437509496506200b70d95505050505050565b60408051918252519081900360200190f35b34620000005762000317600480803590602001908201803590602001908080601f01602080910402602001604051908101604052809392919081815260200183838082843750949650509335935062005e8992505050565b60408051918252519081900360200190f35b34620000005762000317600480803590602001908201803590602001908080601f0160208091040260200160405190810160405280939291908181526020018383808284375050604080516020601f818a01358b0180359182018390048302840183018552818452989a8a359a9099940197509195509182019350915081908401838280828437509496506200ad3d95505050505050565b60408051918252519081900360200190f35b6000805b600454821015620019bf5760048281548110156200000057906000526020600020906012020160005b50600e015460a060020a900460ff1615801562001812575060048281548110156200000057906000526020600020906012020160005b50600201546001145b15620019b1575060005b60048281548110156200000057906000526020600020906012020160005b50600f0154811015620019b15760048281548110156200000057906000526020600020906012020160005b50600c01546001148015620019555750620019558360048481548110156200000057906000526020600020906012020160005b50600f018381548110156200000057906000526020600020906004020160005b50805460408051602060026001851615610100026000190190941693909304601f81018490048402820184019092528181529291830182828015620019415780601f10620019155761010080835404028352916020019162001941565b820191906000526020600020905b8154815290600101906020018083116200192357829003601f168201915b50505050506200b88490919063ffffffff16565b5b15620019a757600160048381548110156200000057906000526020600020906012020160005b50600f018281548110156200000057906000526020600020906004020160005b5060030155620019bf565b5b6001016200181c565b5b5b816001019150620017aa565b5b505050565b604080518082018252600881527f73657441646d696e00000000000000000000000000000000000000000000000060208083019190915282518084019093526011835260008051602062011c4b83398151915290830152600091829162001a2c9162005cf6565b62001a383285620057f1565b151562001ab157604080518082018252600c81527f4e6f207065726d6973736f6e000000000000000000000000000000000000000060208083019190915282518084019093526011835260008051602062011c4b8339815191529083015262001aa19162005cf6565b613c336002819055915062001c87565b62001abc846200ba14565b905060001981141562001b3b57604080518082018252601881527f6465706172746d656e74206964206e6f7420657869737473000000000000000060208083019190915282518084019093526011835260008051602062011c4b8339815191529083015262001b2b9162005cf6565b613c2b6002819055915062001c87565b62001b588462001b4b856200bb41565b9063ffffffff6200bc8b16565b151562001bd157604080518082018252601e81527f61646d696e206e6f74206d656d626572206f66206465706172746d656e74000060208083019190915282518084019093526011835260008051602062011c4b8339815191529083015262001bc19162005cf6565b613c326002819055915062001c87565b8260048281548110156200000057906000526020600020906012020160005b50600d018054600160a060020a031916606060020a92830292909204919091179055604080518082018252600b81527f73657441646d696e204f4b00000000000000000000000000000000000000000060208083019190915282518084019093526011835260008051602062011c4b8339815191529083015262001c749162005cf6565b6000600281905560188054600101905591505b5092915050565b60005b919050565b6018545b90565b6000805b60045481101562001dc05760048181548110156200000057906000526020600020906012020160005b50600e015460a060020a900460ff1615801562001da5575062001da58360048381548110156200000057906000526020600020906012020160005b50600401805460408051602060026001851615610100026000190190941693909304601f8101849004840282018401909252818152929183018282801562001d915780601f1062001d655761010080835404028352916020019162001d91565b820191906000526020600020905b81548152906001019060200180831162001d7357829003601f168201915b50505050506200bc8b90919063ffffffff16565b5b1562001db6576000915062001de3565b5b60010162001ca1565b600062001dcd846200bd28565b111562001dde576000915062001de3565b600191505b50919050565b6002545b90565b600062001dfd826200ba14565b905060001981141562001e7857604080518082018252601881527f6465706172746d656e74206964206e6f7420657869737473000000000000000060208083019190915282518084019093526011835260008051602062011c4b8339815191529083015262001e6c9162005cf6565b613c2b60025562002222565b60005433600160a060020a039081169116146200203a5760408051808201909152601981527f6d73672e73656e646572206973206e6f74206f776e65723a2000000000000000602082015262001ecf90336200222e565b62001f893360048381548110156200000057906000526020600020906012020160005b50600401805460408051602060026001851615610100026000190190941693909304601f8101849004840282018401909252818152929183018282801562001f7e5780601f1062001f525761010080835404028352916020019162001f7e565b820191906000526020600020905b81548152906001019060200180831162001f6057829003601f168201915b5050505050620057f1565b15156200203a57604080518082018252600d8152609960020a6c3737903832b936b4b9b9b4b7b70260208083019190915282518084019093526011835260008051602062011c4b8339815191529083015262001fe59162005cf6565b613c3360028190556040805191825260208201819052600d82820152609960020a6c3737903832b936b4b9b9b4b7b70260608301525160008051602062011c8b8339815191529181900360800190a162002222565b5b620020468262001c9d565b15156200211157604080518082018252601481527f6465706172746d656e74206e6f7420656d70747900000000000000000000000060208083019190915282518084019093526011835260008051602062011c4b83398151915290830152620020af9162005cf6565b613c3d600281905560408051918252602082018190526014828201527f6465706172746d656e74206e6f7420656d70747900000000000000000000000060608301525160008051602062011c8b8339815191529181900360800190a162002222565b600160048281548110156200000057906000526020600020906012020160005b50600e01805460f860020a9283029290920460a060020a0260a060020a60ff0219909216919091179055604080518082018252600b81527f64656c657465207375636300000000000000000000000000000000000000000060208083019190915282518084019093526011835260008051602062011c4b83398151915290830152620021bd9162005cf6565b600060028190556040805191825260208201819052600b828201527f64656c657465207375636300000000000000000000000000000000000000000060608301525160008051602062011c8b8339815191529181900360800190a16018805460010190555b5050565b60005b919050565b62002303826200224783600160a060020a03166200bea9565b604080518082018252600380825260ed60020a620103e1026020808401919091528154845160026001831615610100026000190190921691909104601f8101839004830282018301909552848152929390830182828015620022ed5780601f10620022c157610100808354040283529160200191620022ed565b820191906000526020600020905b815481529060010190602001808311620022cf57829003601f168201915b50505050506200bfe4909392919063ffffffff16565b60039080519060200190828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106200235057805160ff191683800117855562002380565b8280016001018555821562002380579182015b828111156200238057825182559160200191906001019062002363565b5b50620023a49291505b80821115620023a057600081556001016200238a565b5090565b50505b5050565b620023038262002247836200c0b6565b604080518082018252600380825260ed60020a620103e1026020808401919091528154845160026001831615610100026000190190921691909104601f8101839004830282018301909552848152929390830182828015620022ed5780601f10620022c157610100808354040283529160200191620022ed565b820191906000526020600020905b815481529060010190602001808311620022cf57829003601f168201915b50505050506200bfe4909392919063ffffffff16565b60039080519060200190828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106200235057805160ff191683800117855562002380565b8280016001018555821562002380579182015b828111156200238057825182559160200191906001019062002363565b5b50620023a49291505b80821115620023a057600081556001016200238a565b5090565b50505b5050565b600060006000600060006000600060006200259c604060405190810160405280600d81526020017f75706461746520616374696f6e000000000000000000000000000000000000008152602001506040604051908101604052806011815260200160008051602062011c4b83398151915281526020015062005cf6565b620025af60068a63ffffffff6200c1f816565b15156200266357604080518082018252600c815260a260020a6b1a9cdbdb881a5b9d985b1a590260208083019190915282518084019093526011835260008051602062011c4b833981519152908301526200260a9162005cf6565b613c2960028190556040805191825260208201819052600c8282015260a260020a6b1a9cdbdb881a5b9d985b1a590260608301525160008051602062011c8b8339815191529181900360800190a16002549750620054b2565b60068054604080516020601f60026000196101006001881615020190951694909404938401819004810282018101909252828152620027009390929091830182828015620026f55780601f10620026c957610100808354040283529160200191620026f5565b820191906000526020600020905b815481529060010190602001808311620026d757829003601f168201915b50505050506200ba14565b9650600019871415620027d657604080518082018252601581527f6465706172746d656e74206e6f7420657869737473000000000000000000000060208083019190915282518084019093526011835260008051602062011c4b833981519152908301526200276f9162005cf6565b613c2b60028190556040805191825260208201819052601d828201527f6465706172746d656e7420696420646f7365206e6f742065786973747300000060608301525160008051602062011c8b8339815191529181900360800190a16002549750620054b2565b60408051808201909152600a815260b060020a69636f6d6d6f6e4e616d650260208201526200280d908a9063ffffffff6200cf8a16565b1562002a3657600e54600260001961010060018416150201909116041515620028d7576040805180820182526013815260008051602062011c6b83398151915260208083019190915282518084019093526011835260008051602062011c4b83398151915290830152620028819162005cf6565b613c2d6002819055604080519182526020820181905260138282015260008051602062011c6b83398151915260608301525160008051602062011c8b8339815191529181900360800190a16002549750620054b2565b600e8054604080516020601f60026000196101006001881615020190951694909404938401819004810282018101909252828152620029749390929091830182828015620029695780601f106200293d5761010080835404028352916020019162002969565b820191906000526020600020905b8154815290600101906020018083116200294b57829003601f168201915b50505050506200d1bb565b95506000198614158015620029895750868614155b1562002a36576040805180820182526015815260008051602062011c2b83398151915260208083019190915282518084019093526011835260008051602062011c4b83398151915290830152620029e09162005cf6565b613c2e6002819055604080519182526020820181905260158282015260008051602062011c2b83398151915260608301525160008051602062011c8b8339815191529181900360800190a16002549750620054b2565b5b604080518082019091526008815260c260020a671c185c995b9d125902602082015262002a6c908a9063ffffffff6200cf8a16565b801562002bca575062002bc860048881548110156200000057906000526020600020906012020160005b50600401805460408051602060026001851615610100026000190190941693909304601f8101849004840282018401909252818152929183018282801562002b225780601f1062002af65761010080835404028352916020019162002b22565b820191906000526020600020905b81548152906001019060200180831162002b0457829003601f168201915b5050600a8054604080516020601f600260001961010060018816150201909516949094049384018190048102820181019092528281529550919350915083018282801562001d915780601f1062001d655761010080835404028352916020019162001d91565b820191906000526020600020905b81548152906001019060200180831162001d7357829003601f168201915b50505050506200bc8b90919063ffffffff16565b155b1562002c765760408051808201909152601781527f63616e206e6f742075706461746520706172656e744964000000000000000000602082015262002c0f90620055dd565b613c38600281905560408051918252602082018190526017828201527f63616e206e6f742075706461746520706172656e74496400000000000000000060608301525160008051602062011c8b8339815191529181900360800190a16002549750620054b2565b601354600160a060020a03161562002e545762002d5e60048881548110156200000057906000526020600020906012020160005b50805460408051602060026001851615610100026000190190941693909304601f8101849004840282018401909252818152929183018282801562002d335780601f1062002d075761010080835404028352916020019162002d33565b820191906000526020600020905b81548152906001019060200180831162002d1557829003601f168201915b505060135462001b4b9350600160a060020a031691506200bb419050565b9063ffffffff6200bc8b16565b151562002e5457604080518082018252601e81527f61646d696e206e6f74206d656d626572206f66206465706172746d656e74000060208083019190915282518084019093526011835260008051602062011c4b8339815191529083015262002dc79162005cf6565b613c3260028190556040805191825260208201819052602b828201527f61646d696e206973206e6f742061206d656d626572206f662063757272656e7460608301527f206465706172746d656e7400000000000000000000000000000000000000000060808301525160008051602062011c8b8339815191529181900360a00190a16002549750620054b2565b5b600094505b6016548510156200300a5762002f1b60066010018681548110156200000057906000526020600020900160005b50805460408051602060026001851615610100026000190190941693909304601f8101849004840282018401909252818152929183018282801562002f105780601f1062002ee45761010080835404028352916020019162002f10565b820191906000526020600020905b81548152906001019060200180831162002ef257829003601f168201915b50505050506200d2eb565b151562002ffd57604080518082018252601781527f726f6c65206e6f7420696e20526f6c654d616e6167657200000000000000000060208083019190915282518084019093526011835260008051602062011c4b8339815191529083015262002f849162005cf6565b613c34600281905560408051918252602082018190526026828201527f726f6c6520696420646f6573206e6f742065786973747320696e20526f6c654d606083015260d160020a6530b730b3b2b90260808301525160008051602062011c8b8339815191529181900360a00190a16002549750620054b2565b5b84600101945062002e5a565b60005432600160a060020a03908116911614620031e85760408051808201909152601281527f73656e646572206e6f74206f776e65723a20000000000000000000000000000060208201526200306190326200222e565b620031183260048981548110156200000057906000526020600020906012020160005b50805460408051602060026001851615610100026000190190941693909304601f8101849004840282018401909252818152929183018282801562001f7e5780601f1062001f525761010080835404028352916020019162001f7e565b820191906000526020600020905b81548152906001019060200180831162001f6057829003601f168201915b5050505050620057f1565b1515620031e857604080518082018252601281527f75736572206e6f7420616e636573746f7273000000000000000000000000000060208083019190915282518084019093526011835260008051602062011c4b83398151915290830152620031819162005cf6565b613c3360028190556040805191825260208201819052601e828201527f75736572206973206e6f7420746865206e6577206465706172746d656e74000060608301525160008051602062011c8b8339815191529181900360800190a16002549750620054b2565b5b620032d06040604051908101604052806005815260200160d960020a6430b236b4b70281526020015060048981548110156200000057906000526020600020906012020160005b50600401805460408051602060026001851615610100026000190190941693909304601f8101849004840282018401909252818152929183018282801562001d915780601f1062001d655761010080835404028352916020019162001d91565b820191906000526020600020905b81548152906001019060200180831162001d7357829003601f168201915b50505050506200bc8b90919063ffffffff16565b151562003586576200339060048881548110156200000057906000526020600020906012020160005b50600401805460408051602060026001851615610100026000190190941693909304601f81018490048402820184019092528181529291830182828015620026f55780601f10620026c957610100808354040283529160200191620026f5565b820191906000526020600020905b815481529060010190602001808311620026d757829003601f168201915b50505050506200ba14565b9350600094505b60165485101562003586576200348360048581548110156200000057906000526020600020906012020160005b5060100160066010018781548110156200000057906000526020600020900160005b50805460408051602060026001851615610100026000190190941693909304601f810184900484028201840190925281815292918301828280156200346f5780601f1062003443576101008083540402835291602001916200346f565b820191906000526020600020905b8154815290600101906020018083116200345157829003601f168201915b50505050506200d47b90919063ffffffff16565b15156200357957604080518082018252601c81527f726f6c65206964206e6f7420696e2070726172656e7420726f6c65730000000060208083019190915282518084019093526011835260008051602062011c4b83398151915290830152620034ec9162005cf6565b613c3560028190556040805191825260208201819052602d828201527f726f6c6520696420646f6573206e6f742065786973747320696e20707261726560608301527f6e74206465706172746d656e740000000000000000000000000000000000000060808301525160008051602062011c8b8339815191529181900360a00190a16002549750620054b2565b5b84600101945062003397565b5b60408051808201909152600a815260b260020a691c9bdb195259131a5cdd026020820152620035be908a9063ffffffff6200cf8a16565b156200398a57600094505b6004548510156200398a5760048581548110156200000057906000526020600020906012020160005b50600e015460a060020a900460ff16156200360d576200397c565b60068054604080516020601f600260001961010060018816150201909516949094049384018190048102820181019092528281526200376293909290918301828280156200369f5780601f1062003673576101008083540402835291602001916200369f565b820191906000526020600020905b8154815290600101906020018083116200368157829003601f168201915b505050505060048781548110156200000057906000526020600020906012020160005b50600401805460408051602060026001851615610100026000190190941693909304601f8101849004840282018401909252818152929183018282801562001d915780601f1062001d655761010080835404028352916020019162001d91565b820191906000526020600020905b81548152906001019060200180831162001d7357829003601f168201915b50505050506200bc8b90919063ffffffff16565b156200397c57600092505b60048581548110156200000057906000526020600020906012020160005b50601001548310156200397c5762003879600660100160048781548110156200000057906000526020600020906012020160005b506010018581548110156200000057906000526020600020900160005b50805460408051602060026001851615610100026000190190941693909304601f810184900484028201840190925281815292918301828280156200346f5780601f1062003443576101008083540402835291602001916200346f565b820191906000526020600020905b8154815290600101906020018083116200345157829003601f168201915b50505050506200d47b90919063ffffffff16565b15156200396f57604080518082018252601481527f726f6c6520696420696e73756666696369656e7400000000000000000000000060208083019190915282518084019093526011835260008051602062011c4b83398151915290830152620038e29162005cf6565b613c37600281905560408051918252602082018190526032828201527f726f6c6520696420696e73756666696369656e742e207265737472696374656460608301527f20627920737562206465706172746d656e74000000000000000000000000000060808301525160008051602062011c8b8339815191529181900360a00190a16002549750620054b2565b5b8260010192506200376d565b5b5b846001019450620035c9565b5b604080518082019091526009815260ba60020a68195b9bd919531a5cdd026020820152620039c1908a9063ffffffff6200cf8a16565b15620045ef5760048781548110156200000057906000526020600020906012020160005b50600201546001141562003ab857601554151562003ab25760408051808201825260108152608060020a6f656e6f6465206c69737420656d7074790260208083019190915282518084019093526011835260008051602062011c4b8339815191529083015262003a559162005cf6565b613c3960028190556040805191825260208201819052601082820152608060020a6f656e6f6465206c69737420656d7074790260608301525160008051602062011c8b8339815191529181900360800190a16002549750620054b2565b62003be1565b6015805460008083559190915262003bde906004027f55f448fdea98c4d29eb340757ef0a66cd03dbb9538908a6a81d96026b71ec475908101905b80821115620023a057600060008201805460018160011615610100020316600290046000825580601f1062003b29575062003b5e565b601f01602090049060005260206000209081019062003b5e91905b80821115620023a057600081556001016200238a565b5090565b5b5060018201805460018160011615610100020316600290046000825580601f1062003b8b575062003bc0565b601f01602090049060005260206000209081019062003bc091905b80821115620023a057600081556001016200238a565b5090565b5b5050600060028201819055600382015560040162003af3565b5090565b5b505b600094505b601554851015620042b1576015805486908110156200000057906000526020600020906004020160005b505460026000196101006001841615020190911604158062003c67575060806006600f018681548110156200000057906000526020600020906004020160005b505460026000196101006001841615020190911604115b8062003caa57506015805486908110156200000057906000526020600020906004020160005b506001018054600181600116156101000203166002900490506000145b8062003cd757506015805486908110156200000057906000526020600020906004020160005b5060020154155b8062003d09575061ffff6006600f018681548110156200000057906000526020600020906004020160005b5060020154115b1562003ded57604080518082018252601c81527f656e6f6465207075626b65792c69702c706f727420696e76616c69640000000060208083019190915282518084019093526011835260008051602062011c4b8339815191529083015262003d719162005cf6565b613c3a600281905560408051918252602082018190526029828201527f656e6f6465207075626b6579206f72206970206f7220706f727420666f726d61606083015260ba60020a681d081a5b9d985b1a590260808301525160008051602062011c8b8339815191529181900360a00190a16002549750620054b2565b60806006600f018681548110156200000057906000526020600020906004020160005b505460026000196101006001841615020190911604101562004021576015805486908110156200000057906000526020600020906004020160005b5054600093506002600019610100600184161502019091160460800391505b81831015620040215762003f506006600f018681548110156200000057906000526020600020906004020160005b50805460408051602060026001851615610100026000190190941693909304601f8101849004840282018401909252818152929183018282801562003f215780601f1062003ef55761010080835404028352916020019162003f21565b820191906000526020600020905b81548152906001019060200180831162003f0357829003601f168201915b5050604080518082019091526001815260fc60020a60030260208201529392505063ffffffff6200d56b169050565b6015805487908110156200000057906000526020600020906004020160005b506000019080519060200190828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1062003fbe57805160ff191683800117855562003fee565b8280016001018555821562003fee579182015b8281111562003fee57825182559160200191906001019062003fd1565b5b50620040129291505b80821115620023a057600081556001016200238a565b5090565b50505b84600101945062003e6a565b5b600092505b601554831015620042a45784831415620040415762004297565b620041b26006600f018681548110156200000057906000526020600020906004020160005b50805460408051602060026001851615610100026000190190941693909304601f81018490048402820184019092528181529291830182828015620040ef5780601f10620040c357610100808354040283529160200191620040ef565b820191906000526020600020905b815481529060010190602001808311620040d157829003601f168201915b50505050506006600f018581548110156200000057906000526020600020906004020160005b50805460408051602060026001851615610100026000190190941693909304601f81018490048402820184019092528181529291830182828015620019415780601f10620019155761010080835404028352916020019162001941565b820191906000526020600020905b8154815290600101906020018083116200192357829003601f168201915b50505050506200b88490919063ffffffff16565b156200429757604080518082018252601781527f656e6f6465207075626b6579206475706c69636174656400000000000000000060208083019190915282518084019093526011835260008051602062011c4b833981519152908301526200421a9162005cf6565b613c3b60028190556040805191825260208201819052602a828201527f656e6f6465207075626b6579206475706c69636174656420696e2073656c6620606083015260b260020a69195b9bd919481b1a5cdd0260808301525160008051602062011c8b8339815191529181900360a00190a16002549750620054b2565b5b82600101925062004027565b5b84600101945062003be6565b600094505b601554851015620045ef57600092505b600454831015620045e25760048381548110156200000057906000526020600020906012020160005b50600e015460a060020a900460ff16156200430a57620045d5565b868314156200431957620045d5565b5060005b60048381548110156200000057906000526020600020906012020160005b50600f0154811015620045d557620044d660048481548110156200000057906000526020600020906012020160005b50600f018281548110156200000057906000526020600020906004020160005b50805460408051602060026001851615610100026000190190941693909304601f81018490048402820184019092528181529291830182828015620044135780601f10620043e75761010080835404028352916020019162004413565b820191906000526020600020905b815481529060010190602001808311620043f557829003601f168201915b50505050506006600f018781548110156200000057906000526020600020906004020160005b50805460408051602060026001851615610100026000190190941693909304601f81018490048402820184019092528181529291830182828015620019415780601f10620019155761010080835404028352916020019162001941565b820191906000526020600020905b8154815290600101906020018083116200192357829003601f168201915b50505050506200b88490919063ffffffff16565b15620045cb57604080518082018252601d81527f656e6f646520636f6e666c6963746564206f7468657220646570746d7400000060208083019190915282518084019093526011835260008051602062011c4b833981519152908301526200453e9162005cf6565b613c3c60028190556040805191825260208201819052602d828201527f656e6f6465207075626b657920636f6e666c69637465642077697468206f746860608301527f6572206465706172746d656e740000000000000000000000000000000000000060808301525160008051602062011c8b8339815191529181900360a00190a16002549750620054b2565b5b6001016200431d565b5b826001019250620042c6565b5b846001019450620042b6565b5b604080518082019091526004815260e060020a636e616d6502602082015262004621908a9063ffffffff6200cf8a16565b156200470357600660010160048881548110156200000057906000526020600020906012020160005b506001019080546001816001161561010002031660029004828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106200469d5780548555620046dc565b82800160010185558215620046dc57600052602060002091601f016020900482015b82811115620046dc578254825591600101919060010190620046bf565b5b50620047009291505b80821115620023a057600081556001016200238a565b5090565b50505b604080518082019091526009815260b860020a6873657269616c4e756d02602082015262004739908a9063ffffffff6200cf8a16565b1562004767576009546004805489908110156200000057906000526020600020906012020160005b50600301555b60408051808201909152600b815260a960020a6a3232b9b1b934b83a34b7b70260208201526200479f908a9063ffffffff6200cf8a16565b156200488157600660050160048881548110156200000057906000526020600020906012020160005b506005019080546001816001161561010002031660029004828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106200481b57805485556200485a565b828001600101855582156200485a57600052602060002091601f016020900482015b828111156200485a5782548255916001019190600101906200483d565b5b506200487e9291505b80821115620023a057600081556001016200238a565b5090565b50505b60408051808201909152600a815260b060020a69636f6d6d6f6e4e616d65026020820152620048b8908a9063ffffffff6200cf8a16565b156200499a57600660080160048881548110156200000057906000526020600020906012020160005b506008019080546001816001161561010002031660029004828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1062004934578054855562004973565b828001600101855582156200497357600052602060002091601f016020900482015b828111156200497357825482559160010191906001019062004956565b5b50620049979291505b80821115620023a057600081556001016200238a565b5090565b50505b604080518082019091526009815260b860020a6873746174654e616d65026020820152620049d0908a9063ffffffff6200cf8a16565b1562004ab257600660090160048881548110156200000057906000526020600020906012020160005b506009019080546001816001161561010002031660029004828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1062004a4c578054855562004a8b565b8280016001018555821562004a8b57600052602060002091601f016020900482015b8281111562004a8b57825482559160010191906001019062004a6e565b5b5062004aaf9291505b80821115620023a057600081556001016200238a565b5090565b50505b60408051808201909152600b815260a860020a6a636f756e7472794e616d6502602082015262004aea908a9063ffffffff6200cf8a16565b1562004bcc576006600a0160048881548110156200000057906000526020600020906012020160005b50600a019080546001816001161561010002031660029004828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1062004b66578054855562004ba5565b8280016001018555821562004ba557600052602060002091601f016020900482015b8281111562004ba557825482559160010191906001019062004b88565b5b5062004bc99291505b80821115620023a057600081556001016200238a565b5090565b50505b604080518082019091526005815260da60020a64195b585a5b02602082015262004bfe908a9063ffffffff6200cf8a16565b1562004ce0576006600b0160048881548110156200000057906000526020600020906012020160005b50600b019080546001816001161561010002031660029004828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1062004c7a578054855562004cb9565b8280016001018555821562004cb957600052602060002091601f016020900482015b8281111562004cb957825482559160010191906001019062004c9c565b5b5062004cdd9291505b80821115620023a057600081556001016200238a565b5090565b50505b604080518082019091526004815260e060020a637479706502602082015262004d11908a9063ffffffff6200cf8a16565b1562004d3f576012546004805489908110156200000057906000526020600020906012020160005b50600c01555b604080518082019091526005815260d960020a6430b236b4b702602082015262004d71908a9063ffffffff6200cf8a16565b1562004dc85760135460048054600160a060020a039092169189908110156200000057906000526020600020906012020160005b50600d018054600160a060020a031916606060020a928302929092049190911790555b604080518082019091526009815260ba60020a68195b9bd919531a5cdd02602082015262004dfe908a9063ffffffff6200cf8a16565b15620050fb576006600f0160048881548110156200000057906000526020600020906012020160005b50600f01908054828054828255906000526020600020906004028101928215620050035760005260206000209160040282015b828111156200500357828260008201816000019080546001816001161561010002031660029004828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1062004ebc578054855562004efb565b8280016001018555821562004efb57600052602060002091601f016020900482015b8281111562004efb57825482559160010191906001019062004ede565b5b5062004f1f9291505b80821115620023a057600081556001016200238a565b5090565b505060018201816001019080546001816001161561010002031660029004828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1062004f78578054855562004fb7565b8280016001018555821562004fb757600052602060002091601f016020900482015b8281111562004fb757825482559160010191906001019062004f9a565b5b5062004fdb9291505b80821115620023a057600081556001016200238a565b5090565b5050600282015481600201556003820154816003015550509160040191906004019062004e5a565b5b50620050f89291505b80821115620023a057600060008201805460018160011615610100020316600290046000825580601f1062005043575062005078565b601f0160209004906000526020600020908101906200507891905b80821115620023a057600081556001016200238a565b5090565b5b5060018201805460018160011615610100020316600290046000825580601f10620050a55750620050da565b601f016020900490600052602060002090810190620050da91905b80821115620023a057600081556001016200238a565b5090565b5b505060006002820181905560038201556004016200500d565b5090565b50505b60408051808201909152600a815260b260020a691c9bdb195259131a5cdd02602082015262005132908a9063ffffffff6200cf8a16565b15620052dc57600660100160048881548110156200000057906000526020600020906012020160005b50601001908054828054828255906000526020600020908101928215620052575760005260206000209182015b82811115620052575782829080546001816001161561010002031660029004828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f10620051e2578054855562005221565b828001600101855582156200522157600052602060002091601f016020900482015b828111156200522157825482559160010191906001019062005204565b5b50620052459291505b80821115620023a057600081556001016200238a565b5090565b50509160010191906001019062005188565b5b50620052d99291505b80821115620023a057600081805460018160011615610100020316600290046000825580601f10620052945750620052c9565b601f016020900490600052602060002090810190620052c991905b80821115620023a057600081556001016200238a565b5090565b5b505060010162005261565b5090565b50505b60408051808201909152600a81527f66696c6549644c69737400000000000000000000000000000000000000000000602082015262005323908a9063ffffffff6200cf8a16565b15620053bd57600660110160048881548110156200000057906000526020600020906012020160005b50601101908054828054828255906000526020600020908101928215620053965760005260206000209182015b828111156200539657825482559160010191906001019062005379565b5b50620053ba9291505b80821115620023a057600081556001016200238a565b5090565b50505b426103e80260048881548110156200000057906000526020600020906012020160005b50600701556000600255601880546001019055604080518082018252601681527f757064617465206465706172746d656e7420737563630000000000000000000060208083019190915282518084019093526011835260008051602062011c4b83398151915290830152620054559162005cf6565b6002546040805191825260208201819052600b828201527f757064617465207375636300000000000000000000000000000000000000000060608301525160008051602062011c8b8339815191529181900360800190a160025497505b50505050505050919050565b600160009054906101000a9004600160a060020a0316600160a060020a0316633ffbd47f83836040518360e060020a0281526004018080602001806020018381038352858181518152602001915080519060200190808383829060006004602084601f0104600302600f01f150905090810190601f168015620055555780820380516001836020036101000a031916815260200191505b508381038252848181518152602001915080519060200190808383829060006004602084601f0104600302600f01f150905090810190601f168015620055af5780820380516001836020036101000a031916815260200191505b50945050505050600060405180830381600087803b15620000005760325a03f11562000000575050505b5050565b604080518082018252600380825260ed60020a620103e1026020808401919091528154845160026001831615610100026000190190921691909104601f81018390048302820183019095528481526200569f9486949391928301828280156200568a5780601f106200565e576101008083540402835291602001916200568a565b820191906000526020600020905b8154815290600101906020018083116200566c57829003601f168201915b50505050506200d5e69092919063ffffffff16565b60039080519060200190828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f10620056ec57805160ff19168380011785556200571c565b828001600101855582156200571c579182015b828111156200571c578251825591602001919060010190620056ff565b5b50620019bf9291505b80821115620023a057600081556001016200238a565b5090565b50505b50565b604080516020810190915260008152620057626003836200d695565b90505b919050565b60005433600160a060020a039081169116146200578757620057ef565b600154604080517f26d7b3b40000000000000000000000000000000000000000000000000000000081529051600160a060020a03909216916326d7b3b49160048082019260009290919082900301818387803b15620000005760325a03f11562000000575050505b565b600080548190600160a060020a038581169116141562005815576001915062001c87565b62005820836200ba14565b905060001981141562005837576000915062001c87565b5b60048181548110156200000057906000526020600020906012020160005b50600d0154600160a060020a038581169116141562005879576001915062001c87565b6200593260048281548110156200000057906000526020600020906012020160005b50600401805460408051602060026001851615610100026000190190941693909304601f81018490048402820184019092528181529291830182828015620026f55780601f10620026c957610100808354040283529160200191620026f5565b820191906000526020600020905b815481529060010190602001808311620026d757829003601f168201915b50505050506200ba14565b905060001981141562005949576000915062001c87565b62005837565b5b5092915050565b6040805160208181018352600080835283518085019094526001845260f860020a607b02918401919091529091819081906200599b90859063ffffffff6200d56b16565b604080518082019091526003815260ea60020a621c995d026020820152909450620059fe90620059d49060009063ffffffff6200dc2716565b604080518082019091526001815260fa60020a600b02602082015286919063ffffffff6200d5e616565b604080518082019091526008815260c060020a672264617461223a7b02602082015290945062005a3690859063ffffffff6200d56b16565b604080518082019091526005815260da60020a641d1bdd185b02602082015260045491955062005a9b91620059d49163ffffffff6200dc2716565b604080518082019091526001815260fa60020a600b02602082015286919063ffffffff6200d5e616565b604080518082019091526009815260b860020a68226974656d73223a5b02602082015290945062005ad490859063ffffffff6200d56b16565b93506000925060009150600090505b60045481101562005cb9578651158062005bbb575062005bbb8760048381548110156200000057906000526020600020906012020160005b5060019081018054604080516020600295841615610100026000190190931694909404601f81018390048302850183019091528084529083018282801562001d915780601f1062001d655761010080835404028352916020019162001d91565b820191906000526020600020905b81548152906001019060200180831162001d7357829003601f168201915b50505050506200bc8b90919063ffffffff16565b5b801562005bf3575060048181548110156200000057906000526020600020906012020160005b50600e015460a060020a900460ff16155b1562005caf57848602831015801562005c10575084866001010283105b1562005c9557600082111562005c5157604080518082019091526001815260fa60020a600b02602082015262005c4e90859063ffffffff6200d56b16565b93505b62005c8c62005c7e60048381548110156200000057906000526020600020906012020160005b506200de2d565b859063ffffffff6200d56b16565b93506001909101905b600186018502831062005ca85762005cb9565b6001909201915b5b60010162005ae3565b604080518082019091526003815260e860020a625d7d7d02602082015262005ce990859063ffffffff6200d56b16565b93505b5050509392505050565b604080518082018252600380825260ed60020a620103e1026020808401919091528154845160026001831615610100026000190190921691909104601f81018390048302820183019095528481526200230394879487949093909190830182828015620022ed5780601f10620022c157610100808354040283529160200191620022ed565b820191906000526020600020905b815481529060010190602001808311620022cf57829003601f168201915b50505050506200bfe4909392919063ffffffff16565b60039080519060200190828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106200235057805160ff191683800117855562002380565b8280016001018555821562002380579182015b828111156200238057825182559160200191906001019062002363565b5b50620023a49291505b80821115620023a057600081556001016200238a565b5090565b50505b5050565b604080516020810190915260008152620057626001836200d695565b90505b919050565b60005b92915050565b604080516020810190915260008152620057626002836200d695565b90505b919050565b6040805160208082019283905260009182905260038054818452845160ff1916825590937fc2575a0e9e593c00f959f8c92f12db2869c3395a3b0502d05e2516446f71f85b60026001841615610100026000190190931692909204601f01929092048101929162005f52565b8280016001018555821562005f52579182015b8281111562005f5257825182559160200191906001019062005f35565b5b50620022229291505b80821115620023a057600081556001016200238a565b5090565b50505b565b60408051602081019091526000815262005fa4600160a060020a03331663ffffffff6200edd816565b90505b90565b604080518082018252601381527f657261736541646d696e4279416464726573730000000000000000000000000060208083019190915282518084019093526011835260008051602062011c4b833981519152908301526000918291620060119162005cf6565b50600019905060005b600454811015620060ae5760048181548110156200000057906000526020600020906012020160005b50600e015460a060020a900460ff16156200605e57620060a4565b82600160a060020a031660048281548110156200000057906000526020600020906012020160005b50600d0154600160a060020a03161415620060a457809150620060ae565b5b6001016200601a565b6000198214156200612757604080518082018252601881527f6465706172746d656e74206964206e6f7420657869737473000000000000000060208083019190915282518084019093526011835260008051602062011c4b833981519152908301526200611b9162005cf6565b613c2b600255620019bf565b60005433600160a060020a039081169116146200637c5760408051808201909152601981527f6d73672e73656e646572206973206e6f74206f776e65723a200000000000000060208201526200617e90336200222e565b6001546040805160006020918201819052825160e160020a637c2fc09302815260048101849052600b604482015260a960020a6a2ab9b2b926b0b730b3b2b9026064820152608060248201526007608482015260cc60020a660302e302e312e30260a48201529251600160a060020a039094169363f85f81269360c48082019493918390030190829087803b15620000005760325a03f115620000005750506040515133600160a060020a0390811691161490506200637c57620062ee3360048481548110156200000057906000526020600020906012020160005b50805460408051602060026001851615610100026000190190941693909304601f8101849004840282018401909252818152929183018282801562001f7e5780601f1062001f525761010080835404028352916020019162001f7e565b820191906000526020600020905b81548152906001019060200180831162001f6057829003601f168201915b5050505050620057f1565b15156200637c5760408051808201909152600d8152609960020a6c3737903832b936b4b9b9b4b7b70260208201526200632790620055dd565b613c3360028190556040805191825260208201819052600d82820152609960020a6c3737903832b936b4b9b9b4b7b70260608301525160008051602062011c8b8339815191529181900360800190a1620019bf565b5b5b600060048381548110156200000057906000526020600020906012020160005b50600d018054600160a060020a031916606060020a92830292909204919091179055604080518082018252601681527f657261736541646d696e427941646472657373204f4b0000000000000000000060208083019190915282518084019093526011835260008051602062011c4b83398151915290830152620064229162005cf6565b60006002556018805460010190555b505050565b600080805b600454811015620066205760048181548110156200000057906000526020600020906012020160005b50600e015460a060020a900460ff16156200647f5762006616565b620065428560048381548110156200000057906000526020600020906012020160005b50600401805460408051602060026001851615610100026000190190941693909304601f8101849004840282018401909252818152929183018282801562001d915780601f1062001d655761010080835404028352916020019162001d91565b820191906000526020600020905b81548152906001019060200180831162001d7357829003601f168201915b50505050506200bc8b90919063ffffffff16565b156200661657838214156200660f576200660760048281548110156200000057906000526020600020906012020160005b50805460408051602060026001851615610100026000190190941693909304601f81018490048402820184019092528181529291830182828015620065fc5780601f10620065d057610100808354040283529160200191620065fc565b820191906000526020600020905b815481529060010190602001808311620065de57829003601f168201915b50505050506200eefd565b925062006625565b6001909101905b5b6001016200643b565b600092505b505092915050565b6040805160208101909152600080825280805b6004548210156200688c5760048281548110156200000057906000526020600020906012020160005b50600e015460a060020a900460ff161562006684576200687f565b620067478660048481548110156200000057906000526020600020906012020160005b50600801805460408051602060026001851615610100026000190190941693909304601f8101849004840282018401909252818152929183018282801562001d915780601f1062001d655761010080835404028352916020019162001d91565b820191906000526020600020905b81548152906001019060200180831162001d7357829003601f168201915b50505050506200bc8b90919063ffffffff16565b156200687f575060005b60048281548110156200000057906000526020600020906012020160005b50600f015481101562006879576200685f8560048481548110156200000057906000526020600020906012020160005b50600f018381548110156200000057906000526020600020906004020160005b5060019081018054604080516020600295841615610100026000190190931694909404601f81018390048302850183019091528084529083018282801562001d915780601f1062001d655761010080835404028352916020019162001d91565b820191906000526020600020905b81548152906001019060200180831162001d7357829003601f168201915b50505050506200bc8b90919063ffffffff16565b156200686f576001925062006879565b5b60010162006751565b6200688c565b5b81600101915062006640565b604080518082019091526001815260f860020a607b026020820152620068ba90859063ffffffff6200d56b16565b604080518082019091526003815260ea60020a621c995d0260208201529094506200691d90620059d49060009063ffffffff6200dc2716565b604080518082019091526001815260fa60020a600b02602082015286919063ffffffff6200d5e616565b93508215620069755760408051808201909152600b81527f2264617461223a7472756500000000000000000000000000000000000000000060208201526200696d90859063ffffffff6200d56b16565b9350620069bf565b60408051808201909152600c81527f2264617461223a66616c736500000000000000000000000000000000000000006020820152620069bc90859063ffffffff6200d56b16565b93505b604080518082019091526001815260f860020a607d026020820152620069ed90859063ffffffff6200d56b16565b93505b50505092915050565b60006000198180805b60045483101562006b1d5760048381548110156200000057906000526020600020906012020160005b50600e015460a060020a900460ff161562006a465762006b10565b62006b068760048581548110156200000057906000526020600020906012020160005b50805460408051602060026001851615610100026000190190941693909304601f8101849004840282018401909252818152929183018282801562001d915780601f1062001d655761010080835404028352916020019162001d91565b820191906000526020600020905b81548152906001019060200180831162001d7357829003601f168201915b50505050506200bc8b90919063ffffffff16565b1562006b10578293505b5b82600101925062006a02565b60001984141562006b32576000945062006dc8565b6001546040805160006020918201819052825160e160020a637c2fc09302815260048101849052600b60448201527f526f6c654d616e616765720000000000000000000000000000000000000000006064820152608060248201526007608482015260cc60020a660302e302e312e30260a48201529251600160a060020a039094169363f85f81269360c48082019493918390030190829087803b15620000005760325a03f1156200000057505060405151925050600160a060020a038216151562006c02576000945062006dc8565b5060009150805b60048481548110156200000057906000526020600020906012020160005b506010015483101562006dc35780600160a060020a0316634cf024a660048681548110156200000057906000526020600020906012020160005b506010018581548110156200000057906000526020600020900160005b50604080516000602090910152805160e060020a8402815260048101918252825460026000196101006001841615020190911604604482018190528b929182916024820191606401908690801562006d1a5780601f1062006cee5761010080835404028352916020019162006d1a565b820191906000526020600020905b81548152906001019060200180831162006cfc57829003601f168201915b50508381038252848181518152602001915080519060200190808383829060006004602084601f0104600302600f01f150905090810190601f16801562006d755780820380516001836020036101000a031916815260200191505b50945050505050602060405180830381600087803b15620000005760325a03f115620000005750506040515160011415905062006db6576001945062006dc8565b5b82600101925062006c09565b600094505b5050505092915050565b6000805b60045481101562006ef45760048181548110156200000057906000526020600020906012020160005b50600e015460a060020a900460ff161562006e1a5762006eea565b62006eda8360048381548110156200000057906000526020600020906012020160005b50805460408051602060026001851615610100026000190190941693909304601f8101849004840282018401909252818152929183018282801562001d915780601f1062001d655761010080835404028352916020019162001d91565b820191906000526020600020905b81548152906001019060200180831162001d7357829003601f168201915b50505050506200bc8b90919063ffffffff16565b1562006eea576001915062001de3565b5b60010162006dd6565b600091505b50919050565b604080516020818101835260008083528351918201909352828152909162005fa4916200d695565b90505b90565b60005b92915050565b60005b919050565b604080516020810190915260008082525462005fa490600160a060020a031663ffffffff6200edd816565b90505b90565b60005b919050565b6000805b600454811015620070955760048181548110156200000057906000526020600020906012020160005b50600e015460a060020a900460ff161562006fbf576200708b565b6200707f8460048381548110156200000057906000526020600020906012020160005b50805460408051602060026001851615610100026000190190941693909304601f8101849004840282018401909252818152929183018282801562001d915780601f1062001d655761010080835404028352916020019162001d91565b820191906000526020600020905b81548152906001019060200180831162001d7357829003601f168201915b50505050506200bc8b90919063ffffffff16565b156200708b5762007095565b5b60010162006f7b565b600454811415620070aa576000915062001c87565b60008310158015620070dd575060048181548110156200000057906000526020600020906012020160005b506010015483105b15620071c357620071b660048281548110156200000057906000526020600020906012020160005b506010018481548110156200000057906000526020600020900160005b50805460408051602060026001851615610100026000190190941693909304601f81018490048402820184019092528181529291830182828015620065fc5780601f10620065d057610100808354040283529160200191620065fc565b820191906000526020600020905b815481529060010190602001808311620065de57829003601f168201915b50505050506200eefd565b915062001c875662001c87565b6000915062001c87565b5b5092915050565b60408051602080820183526000825260038054845160026001831615610100026000190190921691909104601f8101849004840282018401909552848152929390918301828280156200726c5780601f1062007240576101008083540402835291602001916200726c565b820191906000526020600020905b8154815290600101906020018083116200724e57829003601f168201915b505050505090505b90565b600080805b600454821015620073f35760048281548110156200000057906000526020600020906012020160005b50600e015460a060020a900460ff1615620072c057620073e6565b5060005b60048281548110156200000057906000526020600020906012020160005b5060100154811015620073e657620073cc8460048481548110156200000057906000526020600020906012020160005b506010018381548110156200000057906000526020600020900160005b50805460408051602060026001851615610100026000190190941693909304601f8101849004840282018401909252818152929183018282801562001d915780601f1062001d655761010080835404028352916020019162001d91565b820191906000526020600020905b81548152906001019060200180831162001d7357829003601f168201915b50505050506200bc8b90919063ffffffff16565b15620073dc5760019250620073f8565b5b600101620072c4565b5b8160010191506200727c565b600092505b5050919050565b60005b919050565b60005b919050565b60005b92915050565b60006000600060006000600062007491604060405190810160405280601181526020017f696e73657274206465706172746d656e740000000000000000000000000000008152602001506040604051908101604052806011815260200160008051602062011c4b83398151915281526020015062005cf6565b620074a460068863ffffffff6200c1f816565b15156200755857604080518082018252600c815260a260020a6b1a9cdbdb881a5b9d985b1a590260208083019190915282518084019093526011835260008051602062011c4b83398151915290830152620074ff9162005cf6565b613c2960028190556040805191825260208201819052600c8282015260a260020a6b1a9cdbdb881a5b9d985b1a590260608301525160008051602062011c8b8339815191529181900360800190a160025495506200a564565b600680546040805160206002600019600186161561010002810190951604601f81018290048202830182019093528282529293620075f49391929091830182828015620026f55780601f10620026c957610100808354040283529160200191620026f5565b820191906000526020600020905b815481529060010190602001808311620026d757829003601f168201915b50505050506200ba14565b14620076c357604080518082018252600d81527f696420636f6e666c69637465640000000000000000000000000000000000000060208083019190915282518084019093526011835260008051602062011c4b833981519152908301526200765c9162005cf6565b613c2c60028190556040805191825260208201819052600d828201527f696420636f6e666c69637465640000000000000000000000000000000000000060608301525160008051602062011c8b8339815191529181900360800190a160025495506200a564565b600e5460026000196101006001841615020190911604151562007787576040805180820182526013815260008051602062011c6b83398151915260208083019190915282518084019093526011835260008051602062011c4b83398151915290830152620077319162005cf6565b613c2d6002819055604080519182526020820181905260138282015260008051602062011c6b83398151915260608301525160008051602062011c8b8339815191529181900360800190a160025495506200a564565b600e80546040805160206002600019600186161561010002810190951604601f81018290048202830182019093528282529293620078239391929091830182828015620029695780601f106200293d5761010080835404028352916020019162002969565b820191906000526020600020905b8154815290600101906020018083116200294b57829003601f168201915b50505050506200d1bb565b14620078d0576040805180820182526015815260008051602062011c2b83398151915260208083019190915282518084019093526011835260008051602062011c4b833981519152908301526200787a9162005cf6565b613c2e6002819055604080519182526020820181905260158282015260008051602062011c2b83398151915260608301525160008051602062011c8b8339815191529181900360800190a160025495506200a564565b600754600260001961010060018416150201909116041515620079b657604080518082018252600d81527f6e616d6520697320656d7074790000000000000000000000000000000000000060208083019190915282518084019093526011835260008051602062011c4b833981519152908301526200794f9162005cf6565b613c2a60028190556040805191825260208201819052600d828201527f6e616d6520697320656d7074790000000000000000000000000000000000000060608301525160008051602062011c8b8339815191529181900360800190a160025495506200a564565b600a8054604080516020601f6002600019610100600188161502019095169490940493840181900481028201810190925282815262007a539390929091830182828015620026f55780601f10620026c957610100808354040283529160200191620026f5565b820191906000526020600020905b815481529060010190602001808311620026d757829003601f168201915b50505050506200ba14565b945060001985141562007cc35760005433600160a060020a03908116911614801562007b3b57506040805180820182526005815260d960020a6430b236b4b702602080830191909152600680548451601f6002600019610100600186161502019093169290920491820184900484028101840190955280855262007b3b949283018282801562001d915780601f1062001d655761010080835404028352916020019162001d91565b820191906000526020600020905b81548152906001019060200180831162001d7357829003601f168201915b50505050506200bc8b90919063ffffffff16565b5b801562007bf25750604080516020818101835260008252600a80548451601f6002600019610100600186161502019093169290920491820184900484028101840190955280855262007bf2949283018282801562001d915780601f1062001d655761010080835404028352916020019162001d91565b820191906000526020600020905b81548152906001019060200180831162001d7357829003601f168201915b50505050506200bc8b90919063ffffffff16565b5b151562007cc357604080518082018252601481527f706172656e74206964206e6f742065786973747300000000000000000000000060208083019190915282518084019093526011835260008051602062011c4b8339815191529083015262007c5c9162005cf6565b613c2f600281905560408051918252602082018190526014828201527f706172656e74206964206e6f742065786973747300000000000000000000000060608301525160008051602062011c8b8339815191529181900360800190a160025495506200a564565b5b601354600160a060020a03161562007dc557604080518082018252601a81527f6e6f206d656d6265722c2063616e6e6f742062652061646d696e00000000000060208083019190915282518084019093526011835260008051602062011c4b8339815191529083015262007d389162005cf6565b613c31600281905560408051918252602082018190526033828201527f6e6577206465706172746d656e7420686173206e6f206d656d6265722c20636160608301527f6e206e6f7420737065636966792061646d696e0000000000000000000000000060808301525160008051602062011c8b8339815191529181900360a00190a160025495506200a564565b600093505b60165484101562007f7a5762007e8b60066010018581548110156200000057906000526020600020900160005b50805460408051602060026001851615610100026000190190941693909304601f8101849004840282018401909252818152929183018282801562002f105780601f1062002ee45761010080835404028352916020019162002f10565b820191906000526020600020905b81548152906001019060200180831162002ef257829003601f168201915b50505050506200d2eb565b151562007f6d57604080518082018252601881527f726f6c65206964206e6f742065786973747320696e20524d000000000000000060208083019190915282518084019093526011835260008051602062011c4b8339815191529083015262007ef49162005cf6565b613c34600281905560408051918252602082018190526026828201527f726f6c6520696420646f6573206e6f742065786973747320696e20526f6c654d606083015260d160020a6530b730b3b2b90260808301525160008051602062011c8b8339815191529181900360a00190a160025495506200a564565b5b83600101935062007dca565b6000198514620081a25760048581548110156200000057906000526020600020906012020160005b50600201541515620080735760155415156200806d5760408051808201825260108152608060020a6f656e6f6465206c69737420656d7074790260208083019190915282518084019093526011835260008051602062011c4b83398151915290830152620080109162005cf6565b613c3960028190556040805191825260208201819052601082820152608060020a6f656e6f6465206c69737420656d7074790260608301525160008051602062011c8b8339815191529181900360800190a160025495506200a564565b6200819c565b6015805460008083559190915262008199906004027f55f448fdea98c4d29eb340757ef0a66cd03dbb9538908a6a81d96026b71ec475908101905b80821115620023a057600060008201805460018160011615610100020316600290046000825580601f10620080e4575062008119565b601f0160209004906000526020600020908101906200811991905b80821115620023a057600081556001016200238a565b5090565b5b5060018201805460018160011615610100020316600290046000825580601f106200814657506200817b565b601f0160209004906000526020600020908101906200817b91905b80821115620023a057600081556001016200238a565b5090565b5b50506000600282018190556003820155600401620080ae565b5090565b5b505b620082cb565b60158054600080835591909152620082c8906004027f55f448fdea98c4d29eb340757ef0a66cd03dbb9538908a6a81d96026b71ec475908101905b80821115620023a057600060008201805460018160011615610100020316600290046000825580601f1062008213575062008248565b601f0160209004906000526020600020908101906200824891905b80821115620023a057600081556001016200238a565b5090565b5b5060018201805460018160011615610100020316600290046000825580601f10620082755750620082aa565b601f016020900490600052602060002090810190620082aa91905b80821115620023a057600081556001016200238a565b5090565b5b50506000600282018190556003820155600401620081dd565b5090565b5b505b600093505b60155484101562008996576015805485908110156200000057906000526020600020906004020160005b505460026000196101006001841615020190911604158062008351575060806006600f018581548110156200000057906000526020600020906004020160005b505460026000196101006001841615020190911604115b806200839457506015805485908110156200000057906000526020600020906004020160005b506001018054600181600116156101000203166002900490506000145b80620083c157506015805485908110156200000057906000526020600020906004020160005b5060020154155b80620083f3575061ffff6006600f018581548110156200000057906000526020600020906004020160005b5060020154115b15620084d257604080518082018252601f81527f656e6f6465207075626b65792c69702c706f727420697320696e76616c69640060208083019190915282518084019093526011835260008051602062011c4b833981519152908301526200845b9162005cf6565b613c3a600281905560408051918252602082018190526029828201527f656e6f6465207075626b6579206f72206970206f7220706f727420666f726d61606083015260ba60020a681d081a5b9d985b1a590260808301525160008051602062011c8b8339815191529181900360a00190a16200a564565b60806006600f018581548110156200000057906000526020600020906004020160005b505460026000196101006001841615020190911604101562008706576015805485908110156200000057906000526020600020906004020160005b5054600260001961010060018416150201909116046080039250600091505b828210156200870657620086356006600f018581548110156200000057906000526020600020906004020160005b50805460408051602060026001851615610100026000190190941693909304601f8101849004840282018401909252818152929183018282801562003f215780601f1062003ef55761010080835404028352916020019162003f21565b820191906000526020600020905b81548152906001019060200180831162003f0357829003601f168201915b5050604080518082019091526001815260fc60020a60030260208201529392505063ffffffff6200d56b169050565b6015805486908110156200000057906000526020600020906004020160005b506000019080519060200190828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f10620086a357805160ff1916838001178555620086d3565b82800160010185558215620086d3579182015b82811115620086d3578251825591602001919060010190620086b6565b5b50620086f79291505b80821115620023a057600081556001016200238a565b5090565b50505b8360010193506200854f565b5b600091505b60155482101562008989578382141562008726576200897c565b620088976006600f018581548110156200000057906000526020600020906004020160005b50805460408051602060026001851615610100026000190190941693909304601f81018490048402820184019092528181529291830182828015620087d45780601f10620087a857610100808354040283529160200191620087d4565b820191906000526020600020905b815481529060010190602001808311620087b657829003601f168201915b50505050506006600f018481548110156200000057906000526020600020906004020160005b50805460408051602060026001851615610100026000190190941693909304601f81018490048402820184019092528181529291830182828015620019415780601f10620019155761010080835404028352916020019162001941565b820191906000526020600020905b8154815290600101906020018083116200192357829003601f168201915b50505050506200b88490919063ffffffff16565b156200897c57604080518082018252601781527f656e6f6465207075626b6579206475706c69636174656400000000000000000060208083019190915282518084019093526011835260008051602062011c4b83398151915290830152620088ff9162005cf6565b613c3b60028190556040805191825260208201819052602a828201527f656e6f6465207075626b6579206475706c69636174656420696e2073656c6620606083015260b260020a69195b9bd919481b1a5cdd0260808301525160008051602062011c8b8339815191529181900360a00190a160025495506200a564565b5b8160010191506200870c565b5b836001019350620082d0565b600093505b60155484101562008cc557600091505b60045482101562008cb85760048281548110156200000057906000526020600020906012020160005b50600e015460a060020a900460ff1615620089ef5762008cab565b5060005b60048281548110156200000057906000526020600020906012020160005b50600f015481101562008cab5762008bac60048381548110156200000057906000526020600020906012020160005b50600f018281548110156200000057906000526020600020906004020160005b50805460408051602060026001851615610100026000190190941693909304601f8101849004840282018401909252818152929183018282801562008ae95780601f1062008abd5761010080835404028352916020019162008ae9565b820191906000526020600020905b81548152906001019060200180831162008acb57829003601f168201915b50505050506006600f018681548110156200000057906000526020600020906004020160005b50805460408051602060026001851615610100026000190190941693909304601f81018490048402820184019092528181529291830182828015620019415780601f10620019155761010080835404028352916020019162001941565b820191906000526020600020905b8154815290600101906020018083116200192357829003601f168201915b50505050506200b88490919063ffffffff16565b1562008ca157604080518082018252601b81527f656e6f646520636f6e666c696374206f7468657220646570746d74000000000060208083019190915282518084019093526011835260008051602062011c4b8339815191529083015262008c149162005cf6565b613c3c60028190556040805191825260208201819052602d828201527f656e6f6465207075626b657920636f6e666c69637465642077697468206f746860608301527f6572206465706172746d656e740000000000000000000000000000000000000060808301525160008051602062011c8b8339815191529181900360a00190a160025495506200a564565b5b600101620089f3565b5b816001019150620089ab565b5b8360010193506200899b565b60005432600160a060020a0390811691161462008eda57604080518082018252601881527f6d73672e73656e646572206973206e6f74206f776e657220000000000000000060208083019190915282518084019093526011835260008051602062011c4b8339815191529083015262008d3e9162005cf6565b600a805460408051602060026001851615610100026000190190941693909304601f810184900484028201840190925281815262008ddc9332939192909183018282801562001f7e5780601f1062001f525761010080835404028352916020019162001f7e565b820191906000526020600020905b81548152906001019060200180831162001f6057829003601f168201915b5050505050620057f1565b151562008eda5762008e4d606060405190810160405280602b81526020017f75736572206973206e6f7420746865206e6577206465706172746d656e74277381526020017f20666f7265666174686572000000000000000000000000000000000000000000815260200150620055dd565b613c3360028190556040805191825260208201819052602b828201527f75736572206973206e6f7420746865206e6577206465706172746d656e74277360608301527f20666f726566617468657200000000000000000000000000000000000000000060808301525160008051602062011c8b8339815191529181900360a00190a160025495506200a564565b5b6040805180820182526005815260d960020a6430b236b4b702602080830191909152600a80548451601f6002600019610100600186161502019093169290920491820184900484028101840190955280855262008f9c949283018282801562001d915780601f1062001d655761010080835404028352916020019162001d91565b820191906000526020600020905b81548152906001019060200180831162001d7357829003601f168201915b50505050506200bc8b90919063ffffffff16565b15156200919757600093505b60165484101562009197576200909460048681548110156200000057906000526020600020906012020160005b5060100160066010018681548110156200000057906000526020600020900160005b50805460408051602060026001851615610100026000190190941693909304601f810184900484028201840190925281815292918301828280156200346f5780601f1062003443576101008083540402835291602001916200346f565b820191906000526020600020905b8154815290600101906020018083116200345157829003601f168201915b50505050506200d47b90919063ffffffff16565b15156200918a57604080518082018252601e81527f726f6c65206e6f7420696e2070726172656e74206465706172746d656e74000060208083019190915282518084019093526011835260008051602062011c4b83398151915290830152620090fd9162005cf6565b613c3560028190556040805191825260208201819052602d828201527f726f6c6520696420646f6573206e6f742065786973747320696e20707261726560608301527f6e74206465706172746d656e740000000000000000000000000000000000000060808301525160008051602062011c8b8339815191529181900360a00190a160025495506200a564565b5b83600101935062008fa8565b5b60005432600160a060020a0390811691161480156200927357506040805180820182526005815260d960020a6430b236b4b702602080830191909152600680548451601f6002600019610100600186161502019093169290920491820184900484028101840190955280855262009273949283018282801562001d915780601f1062001d655761010080835404028352916020019162001d91565b820191906000526020600020905b81548152906001019060200180831162001d7357829003601f168201915b50505050506200bc8b90919063ffffffff16565b5b80156200932a5750604080516020818101835260008252600a80548451601f600260001961010060018616150201909316929092049182018490048402810184019095528085526200932a949283018282801562001d915780601f1062001d655761010080835404028352916020019162001d91565b820191906000526020600020905b81548152906001019060200180831162001d7357829003601f168201915b50505050506200bc8b90919063ffffffff16565b5b156200933c57600060085562009366565b60048581548110156200000057906000526020600020906012020160005b50600201546001016008555b426103e802600c819055600d5560148054600160a060020a031916606060020a328102041790556004805460018101808355828183801582901162009921576012028160120283600052602060002091820191016200992191905b80821115620023a057600060008201805460018160011615610100020316600290046000825580601f10620093f757506200942c565b601f0160209004906000526020600020908101906200942c91905b80821115620023a057600081556001016200238a565b5090565b5b5060018201805460018160011615610100020316600290046000825580601f106200945957506200948e565b601f0160209004906000526020600020908101906200948e91905b80821115620023a057600081556001016200238a565b5090565b5b506002820160009055600382016000905560048201805460018160011615610100020316600290046000825580601f10620094cb575062009500565b601f0160209004906000526020600020908101906200950091905b80821115620023a057600081556001016200238a565b5090565b5b5060058201805460018160011615610100020316600290046000825580601f106200952d575062009562565b601f0160209004906000526020600020908101906200956291905b80821115620023a057600081556001016200238a565b5090565b5b506006820160009055600782016000905560088201805460018160011615610100020316600290046000825580601f106200959f5750620095d4565b601f016020900490600052602060002090810190620095d491905b80821115620023a057600081556001016200238a565b5090565b5b5060098201805460018160011615610100020316600290046000825580601f1062009601575062009636565b601f0160209004906000526020600020908101906200963691905b80821115620023a057600081556001016200238a565b5090565b5b50600a8201805460018160011615610100020316600290046000825580601f1062009663575062009698565b601f0160209004906000526020600020908101906200969891905b80821115620023a057600081556001016200238a565b5090565b5b50600b8201805460018160011615610100020316600290046000825580601f10620096c55750620096fa565b601f016020900490600052602060002090810190620096fa91905b80821115620023a057600081556001016200238a565b5090565b5b506000600c8301819055600d83018054600160a060020a0319169055600e8301805474ffffffffffffffffffffffffffffffffffffffffff19169055600f8301805482825590825260209091206200983f916004028101905b80821115620023a057600060008201805460018160011615610100020316600290046000825580601f106200978a5750620097bf565b601f016020900490600052602060002090810190620097bf91905b80821115620023a057600081556001016200238a565b5090565b5b5060018201805460018160011615610100020316600290046000825580601f10620097ec575062009821565b601f0160209004906000526020600020908101906200982191905b80821115620023a057600081556001016200238a565b5090565b5b5050600060028201819055600382015560040162009754565b5090565b5b506010820180546000825590600052602060002090810190620098d791905b80821115620023a057600081805460018160011615610100020316600290046000825580601f10620098925750620098c7565b601f016020900490600052602060002090810190620098c791905b80821115620023a057600081556001016200238a565b5090565b5b50506001016200985f565b5090565b5b5060118201805460008255906000526020600020908101906200991191905b80821115620023a057600081556001016200238a565b5090565b5b5050601201620093c1565b5090565b5b505050916000526020600020906012020160005b6006909190915060008201816000019080546001816001161561010002031660029004828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f10620099945780548555620099d3565b82800160010185558215620099d357600052602060002091601f016020900482015b82811115620099d3578254825591600101919060010190620099b6565b5b50620099f79291505b80821115620023a057600081556001016200238a565b5090565b505060018201816001019080546001816001161561010002031660029004828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1062009a50578054855562009a8f565b8280016001018555821562009a8f57600052602060002091601f016020900482015b8281111562009a8f57825482559160010191906001019062009a72565b5b5062009ab39291505b80821115620023a057600081556001016200238a565b5090565b5050600282015481600201556003820154816003015560048201816004019080546001816001161561010002031660029004828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1062009b20578054855562009b5f565b8280016001018555821562009b5f57600052602060002091601f016020900482015b8281111562009b5f57825482559160010191906001019062009b42565b5b5062009b839291505b80821115620023a057600081556001016200238a565b5090565b505060058201816005019080546001816001161561010002031660029004828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1062009bdc578054855562009c1b565b8280016001018555821562009c1b57600052602060002091601f016020900482015b8281111562009c1b57825482559160010191906001019062009bfe565b5b5062009c3f9291505b80821115620023a057600081556001016200238a565b5090565b5050600682015481600601556007820154816007015560088201816008019080546001816001161561010002031660029004828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1062009cac578054855562009ceb565b8280016001018555821562009ceb57600052602060002091601f016020900482015b8281111562009ceb57825482559160010191906001019062009cce565b5b5062009d0f9291505b80821115620023a057600081556001016200238a565b5090565b505060098201816009019080546001816001161561010002031660029004828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1062009d68578054855562009da7565b8280016001018555821562009da757600052602060002091601f016020900482015b8281111562009da757825482559160010191906001019062009d8a565b5b5062009dcb9291505b80821115620023a057600081556001016200238a565b5090565b5050600a820181600a019080546001816001161561010002031660029004828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1062009e24578054855562009e63565b8280016001018555821562009e6357600052602060002091601f016020900482015b8281111562009e6357825482559160010191906001019062009e46565b5b5062009e879291505b80821115620023a057600081556001016200238a565b5090565b5050600b820181600b019080546001816001161561010002031660029004828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1062009ee0578054855562009f1f565b8280016001018555821562009f1f57600052602060002091601f016020900482015b8281111562009f1f57825482559160010191906001019062009f02565b5b5062009f439291505b80821115620023a057600081556001016200238a565b5090565b5050600c8281015490820155600d808301549082018054606060020a600160a060020a039384168102819004600160a060020a031992831617909255600e8086018054918601805492909516840293909304911617808355905460f860020a60ff60a060020a92839004168102040260a060020a60ff0219909116179055600f808301805491830180548382556000828152602090209193600490910282019290919082156200a1a55760005260206000209160040282015b828111156200a1a557828260008201816000019080546001816001161561010002031660029004828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106200a05e57805485556200a09d565b828001600101855582156200a09d57600052602060002091601f016020900482015b828111156200a09d5782548255916001019190600101906200a080565b5b506200a0c19291505b80821115620023a057600081556001016200238a565b5090565b505060018201816001019080546001816001161561010002031660029004828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106200a11a57805485556200a159565b828001600101855582156200a15957600052602060002091601f016020900482015b828111156200a1595782548255916001019190600101906200a13c565b5b506200a17d9291505b80821115620023a057600081556001016200238a565b5090565b5050600282015481600201556003820154816003015550509160040191906004019062009ffc565b5b506200a29a9291505b80821115620023a057600060008201805460018160011615610100020316600290046000825580601f106200a1e557506200a21a565b601f0160209004906000526020600020908101906200a21a91905b80821115620023a057600081556001016200238a565b5090565b5b5060018201805460018160011615610100020316600290046000825580601f106200a24757506200a27c565b601f0160209004906000526020600020908101906200a27c91905b80821115620023a057600081556001016200238a565b5090565b5b505060006002820181905560038201556004016200a1af565b5090565b505060108201816010019080548280548282559060005260206000209081019282156200a39c5760005260206000209182015b828111156200a39c5782829080546001816001161561010002031660029004828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106200a32757805485556200a366565b828001600101855582156200a36657600052602060002091601f016020900482015b828111156200a3665782548255916001019190600101906200a349565b5b506200a38a9291505b80821115620023a057600081556001016200238a565b5090565b5050916001019190600101906200a2cd565b5b506200a41e9291505b80821115620023a057600081805460018160011615610100020316600290046000825580601f106200a3d957506200a40e565b601f0160209004906000526020600020908101906200a40e91905b80821115620023a057600081556001016200238a565b5090565b5b50506001016200a3a6565b5090565b505060118201816011019080548280548282559060005260206000209081019282156200a46e5760005260206000209182015b828111156200a46e5782548255916001019190600101906200a451565b5b506200a4929291505b80821115620023a057600081556001016200238a565b5090565b50506000600255505060188054600101905550604080518082018252601681527f696e73657274206465706172746d656e7420737563630000000000000000000060208083019190915282518084019093526011835260008051602062011c4b833981519152908301526200a5079162005cf6565b6002546040805191825260208201819052600b828201527f696e73657274207375636300000000000000000000000000000000000000000060608301525160008051602062011c8b8339815191529181900360800190a160025495505b5050505050919050565b620023038262002247836200ef65565b604080518082018252600380825260ed60020a620103e1026020808401919091528154845160026001831615610100026000190190921691909104601f8101839004830282018301909552848152929390830182828015620022ed5780601f10620022c157610100808354040283529160200191620022ed565b820191906000526020600020905b815481529060010190602001808311620022cf57829003601f168201915b50505050506200bfe4909392919063ffffffff16565b60039080519060200190828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106200235057805160ff191683800117855562002380565b8280016001018555821562002380579182015b828111156200238057825182559160200191906001019062002363565b5b50620023a49291505b80821115620023a057600081556001016200238a565b5090565b50505b5050565b6000600019815b6004548110156200a8015760048181548110156200000057906000526020600020906012020160005b50600e015460a060020a900460ff16156200a72d576200a7f7565b6200a7ed8560048381548110156200000057906000526020600020906012020160005b50805460408051602060026001851615610100026000190190941693909304601f8101849004840282018401909252818152929183018282801562001d915780601f1062001d655761010080835404028352916020019162001d91565b820191906000526020600020905b81548152906001019060200180831162001d7357829003601f168201915b50505050506200bc8b90919063ffffffff16565b156200a7f7578091505b5b6001016200a6e9565b6000198214156200a816576000925062006625565b5060005b60048281548110156200000057906000526020600020906012020160005b506010015481101562006620576200a9228460048481548110156200000057906000526020600020906012020160005b506010018381548110156200000057906000526020600020900160005b50805460408051602060026001851615610100026000190190941693909304601f8101849004840282018401909252818152929183018282801562001d915780601f1062001d655761010080835404028352916020019162001d91565b820191906000526020600020905b81548152906001019060200180831162001d7357829003601f168201915b50505050506200bc8b90919063ffffffff16565b156200a932576001925062006625565b5b6001016200a81a565b600092505b505092915050565b60408051602081019091526000808252805b6004548210156200ad2f5760048281548110156200000057906000526020600020906012020160005b50600e015460a060020a900460ff161580156200a9c3575060048281548110156200000057906000526020600020906012020160005b50600201546001145b156200ad21575060005b60048281548110156200000057906000526020600020906012020160005b50600f01548110156200ad21576000835111156200aa3457604080518082019091526001815260fa60020a600b0260208201526200aa3190849063ffffffff6200d56b16565b92505b6200ab2060048381548110156200000057906000526020600020906012020160005b50805460408051602060026001851615610100026000190190941693909304601f810184900484028201840190925281815292918301828280156200aadf5780601f106200aab3576101008083540402835291602001916200aadf565b820191906000526020600020905b8154815290600101906020018083116200aac157829003601f168201915b50505050506040604051908101604052806001815260200160f860020a602d028152602001506200ab10846200ef65565b8692919063ffffffff6200bfe416565b604080518082019091526001815260fe60020a60208201529093506200ab4e90849063ffffffff6200d56b16565b92506200aca160048381548110156200000057906000526020600020906012020160005b50600f018281548110156200000057906000526020600020906004020160005b5060019081018054604080516020600295841615610100026000190190931694909404601f8101839004830285018301909152808452908301828280156200ac1e5780601f106200abf2576101008083540402835291602001916200ac1e565b820191906000526020600020905b8154815290600101906020018083116200ac0057829003601f168201915b50505050506040604051908101604052806001815260200160f960020a601d028152602001506200ab1060048681548110156200000057906000526020600020906012020160005b50600f018581548110156200000057906000526020600020906004020160005b50600201546200ef65565b8692919063ffffffff6200bfe416565b925060048281548110156200000057906000526020600020906012020160005b50600c015415156200ad175760408051808201909152600881527f2464697361626c6500000000000000000000000000000000000000000000000060208201526200ad1490849063ffffffff6200d56b16565b92505b5b6001016200a9cd565b5b5b8160010191506200a95b565b5b505090565b60005b919050565b60005b9392505050565b60408051602081810183526000808352835180830185528181528451928301909452808252919291805b6004548210156200b62a5760048281548110156200000057906000526020600020906012020160005b50600e015460a060020a900460ff161580156200add9575060048281548110156200000057906000526020600020906012020160005b50600201546001145b156200b61c575060005b60048281548110156200000057906000526020600020906012020160005b50600f01548110156200b61c5760048281548110156200000057906000526020600020906012020160005b50600c0154600114156200b27f576000845111156200ae7657604080518082019091526001815260fa60020a600b0260208201526200ae7390859063ffffffff6200d56b16565b93505b604080518082019091526001815260f860020a607b0260208201526200aea490859063ffffffff6200d56b16565b93506200afd9620059d46040604051908101604052806006815260200160d060020a657075626b65790281526020015060048581548110156200000057906000526020600020906012020160005b50600f018481548110156200000057906000526020600020906004020160005b50805460408051602060026001851615610100026000190190941693909304601f810184900484028201840190925281815292918301828280156200af9b5780601f106200af6f576101008083540402835291602001916200af9b565b820191906000526020600020905b8154815290600101906020018083116200af7d57829003601f168201915b50505050506200f04c90919063ffffffff16565b604080518082019091526001815260fa60020a600b02602082015286919063ffffffff6200d5e616565b93506200b10d620059d46040604051908101604052806002815260200160f460020a6106970281526020015060048581548110156200000057906000526020600020906012020160005b50600f018481548110156200000057906000526020600020906004020160005b5060019081018054604080516020600295841615610100026000190190931694909404601f8101839004830285018301909152808452908301828280156200af9b5780601f106200af6f576101008083540402835291602001916200af9b565b820191906000526020600020905b8154815290600101906020018083116200af7d57829003601f168201915b50505050506200f04c90919063ffffffff16565b604080518082019091526001815260fa60020a600b02602082015286919063ffffffff6200d5e616565b93506200b1b5620059d46040604051908101604052806004815260200160e260020a631c1bdc9d0281526020015060048581548110156200000057906000526020600020906012020160005b50600f018481548110156200000057906000526020600020906004020160005b50600201549063ffffffff6200dc2716565b604080518082019091526001815260fa60020a600b02602082015286919063ffffffff6200d5e616565b93506200b24662005c7e6040604051908101604052806009815260200160ba60020a681858dd1a5d985d19590281526020015060048581548110156200000057906000526020600020906012020160005b50600f018481548110156200000057906000526020600020906004020160005b50600301549063ffffffff6200dc2716565b859063ffffffff6200d56b16565b604080518082019091526001815260f860020a607d0260208201529094506200b27790859063ffffffff6200d56b16565b93506200b612565b6000835111156200b2bb57604080518082019091526001815260fa60020a600b0260208201526200b2b890849063ffffffff6200d56b16565b92505b604080518082019091526001815260f860020a607b0260208201526200b2e990849063ffffffff6200d56b16565b92506200b41e6200b3f46040604051908101604052806006815260200160d060020a657075626b65790281526020015060048581548110156200000057906000526020600020906012020160005b50600f018481548110156200000057906000526020600020906004020160005b50805460408051602060026001851615610100026000190190941693909304601f810184900484028201840190925281815292918301828280156200af9b5780601f106200af6f576101008083540402835291602001916200af9b565b820191906000526020600020905b8154815290600101906020018083116200af7d57829003601f168201915b50505050506200f04c90919063ffffffff16565b604080518082019091526001815260fa60020a600b02602082015285919063ffffffff6200d5e616565b92506200b5526200b3f46040604051908101604052806002815260200160f460020a6106970281526020015060048581548110156200000057906000526020600020906012020160005b50600f018481548110156200000057906000526020600020906004020160005b5060019081018054604080516020600295841615610100026000190190931694909404601f8101839004830285018301909152808452908301828280156200af9b5780601f106200af6f576101008083540402835291602001916200af9b565b820191906000526020600020905b8154815290600101906020018083116200af7d57829003601f168201915b50505050506200f04c90919063ffffffff16565b604080518082019091526001815260fa60020a600b02602082015285919063ffffffff6200d5e616565b92506200b5de6200b5d06040604051908101604052806004815260200160e260020a631c1bdc9d0281526020015060048581548110156200000057906000526020600020906012020160005b50600f018481548110156200000057906000526020600020906004020160005b50600201549063ffffffff6200dc2716565b849063ffffffff6200d56b16565b604080518082019091526001815260f860020a607d0260208201529093506200b60f90849063ffffffff6200d56b16565b92505b5b6001016200ade3565b5b5b8160010191506200ad71565b60408051808201909152601f81527f7b22726574223a302c2264617461223a7b22626f6f6b6b6565706572223a5b00602082015294506200b672858563ffffffff6200d56b16565b60408051808201909152600e81527f5d2c22666f6c6c6f776572223a5b00000000000000000000000000000000000060208201529095506200b6bc90869063ffffffff6200d56b16565b94506200b6d0858463ffffffff6200d56b16565b604080518082019091526003815260e860020a625d7d7d0260208201529095506200b70390869063ffffffff6200d56b16565b94505b5050505090565b600080805b600454811015620073f3576200b7dd8460048381548110156200000057906000526020600020906012020160005b50805460408051602060026001851615610100026000190190941693909304601f8101849004840282018401909252818152929183018282801562001d915780601f1062001d655761010080835404028352916020019162001d91565b820191906000526020600020905b81548152906001019060200180831162001d7357829003601f168201915b50505050506200bc8b90919063ffffffff16565b156200b85a5760048181548110156200000057906000526020600020906012020160005b50600e015460a060020a900460ff1615156200b8505760048181548110156200000057906000526020600020906012020160005b50600d0154600160a060020a03169250620073f8566200b85a565b60009250620073f8565b5b5b6001016200b712565b600092505b5050919050565b60005b92915050565b60005b9392505050565b6000600060006000845186511415156200b8a25760009350620069f0565b600092505b85518310156200ba065785838151811015620000005790602001015160f860020a900460f860020a02602060f860020a0217915084838151811015620000005760209101015160f860020a908190040260fd60020a17905060f860020a606102600160f860020a03198316108015906200b932575060f960020a603d02600160f860020a0319831611155b80156200b950575060f860020a606102600160f860020a0319821610155b80156200b96e575060f960020a603d02600160f860020a0319821611155b156200b99957600160f860020a0319828116908216146200b9935760009350620069f0565b6200b9f8565b84838151811015620000005790602001015160f860020a900460f860020a02600160f860020a03191686848151811015620000005760209101015160f860020a9081900402600160f860020a031916146200b9f85760009350620069f0565b5b5b8260010192506200b8a7565b600193505b50505092915050565b6000805b6004548110156200bb355760048181548110156200000057906000526020600020906012020160005b50600e015460a060020a900460ff16156200ba5c576200bb2b565b6200bb1c8360048381548110156200000057906000526020600020906012020160005b50805460408051602060026001851615610100026000190190941693909304601f8101849004840282018401909252818152929183018282801562001d915780601f1062001d655761010080835404028352916020019162001d91565b820191906000526020600020905b81548152906001019060200180831162001d7357829003601f168201915b50505050506200bc8b90919063ffffffff16565b156200bb2b5780915062001de3565b5b6001016200ba18565b60001991505b50919050565b6040805160208181018352600080835260015484518301829052845160e160020a637c2fc09302815260048101869052600b604482015260a960020a6a2ab9b2b926b0b730b3b2b9026064820152608060248201526007608482015260cc60020a660302e302e312e30260a48201529451939491938493600160a060020a039092169263f85f81269260c480830193919282900301818787803b15620000005760325a03f1156200000057505060405151925050600160a060020a03821615156200bc0c57620073f8565b8190506200bc8181600160a060020a031663aebcd8dc866000604051602001526040518260e060020a0281526004018082600160a060020a03168152602001915050602060405180830381600087803b15620000005760325a03f1156200000057505060405151905063ffffffff6200f1d516565b92505b5050919050565b60006000825184511415156200bca5576000915062001c87565b5060005b83518110156200bd1c5782818151811015620000005790602001015160f860020a900460f860020a02600160f860020a03191684828151811015620000005760209101015160f860020a9081900402600160f860020a031916146200bd12576000915062001c87565b5b6001016200bca9565b600191505b5092915050565b6001546040805160006020918201819052825160e160020a637c2fc09302815260048101849052600b604482015260a960020a6a2ab9b2b926b0b730b3b2b9026064820152608060248201526007608482015260cc60020a660302e302e312e30260a48201529251909384938493600160a060020a039092169263f85f81269260c48084019391929182900301818787803b15620000005760325a03f1156200000057505060405151925050600160a060020a03821615156200bdeb57620073f8565b81905080600160a060020a031663864359ec856000604051602001526040518260e060020a02815260040180806020018281038252838181518152602001915080519060200190808383829060006004602084601f0104600302600f01f150905090810190601f1680156200be745780820380516001836020036101000a031916815260200191505b5092505050602060405180830381600087803b15620000005760325a03f11562000000575050604051519350505b5050919050565b602060405190810160405280600081526020015060006000602a6040518059106200bed15750595b8181526020808302820101604052905b50925060fc60020a60030283600081518110156200000057906020010190600160f860020a031916908160001a90535060fb60020a600f0283600181518110156200000057906020010190600160f860020a031916908160001a905350602991505b600260ff831610620073f857506010830492600f16600a8110156200bf99578060300160f860020a02838360ff1681518110156200000057906020010190600160f860020a031916908160001a9053506200bfce565b600a810360610160f860020a02838360ff1681518110156200000057906020010190600160f860020a031916908160001a9053505b5b600019909101906200bf43565b5b5050919050565b6020604051908101604052806000815260200150600060006000600060006000875189518b518d510101016040518059106200c01d5750595b8181526020808302820101604052905b50965060208b01955060208a019450602089019350602088019250602087019150600090506200c062818301878d516200f285565b8a51810190506200c078818301868c516200f285565b8951810190506200c08e818301858b516200f285565b8851810190506200c0a4818301848a516200f285565b8751015b505050505050949350505050565b60408051602081019091526000808252808080808615156200c0f557604080518082019091526001815260fc60020a600302602082015295506200a564565b869450600193506000925060008712156200c11a576000878103955093506001909201915b8491505b60008211156200c13a57600a826001909401930491506200c11e565b8260ff166040518059106200c14c5750595b8181526020808302820101604052905b5095508315156200c1955760f860020a602d0286600081518110156200000057906020010190600160f860020a031916908160001a9053505b5060001982015b60008511156200a56457600a850660300160f860020a0286828060019003935060ff1681518110156200000057906020010190600160f860020a031916908160001a905350600a850494506200c19c565b5b5050505050919050565b6040805160208181018352600080835283518083018552818152845160a081018652608081018381528152855180850187528381529381019390935293820181905260608201819052929083906200c2568763ffffffff6200f2d016565b604080518082019091526002815260f260020a611a590260208201526200c28590879063ffffffff6200f9fd16565b876000019080519060200190828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106200c2d457805160ff19168380011785556200c304565b828001600101855582156200c304579182015b828111156200c3045782518255916020019190600101906200c2e7565b5b506200c3289291505b80821115620023a057600081556001016200238a565b5090565b5050604080518082019091526004815260e060020a636e616d650260208201526200c35b90879063ffffffff6200f9fd16565b876001019080519060200190828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106200c3aa57805160ff19168380011785556200c3da565b828001600101855582156200c3da579182015b828111156200c3da5782518255916020019190600101906200c3bd565b5b506200c3fe9291505b80821115620023a057600081556001016200238a565b5090565b505060408051808201909152600f81527f6465706172746d656e744c6576656c000000000000000000000000000000000060208201526200c44790879063ffffffff6200fd9b16565b6002880155604080518082019091526009815260b860020a6873657269616c4e756d0260208201526200c48290879063ffffffff6200fd9b16565b6003880155604080518082019091526008815260c260020a671c185c995b9d12590260208201526200c4bc90879063ffffffff6200f9fd16565b876004019080519060200190828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106200c50b57805160ff19168380011785556200c53b565b828001600101855582156200c53b579182015b828111156200c53b5782518255916020019190600101906200c51e565b5b506200c55f9291505b80821115620023a057600081556001016200238a565b5090565b505060408051808201909152600b815260a960020a6a3232b9b1b934b83a34b7b70260208201526200c59990879063ffffffff6200f9fd16565b876005019080519060200190828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106200c5e857805160ff19168380011785556200c618565b828001600101855582156200c618579182015b828111156200c6185782518255916020019190600101906200c5fb565b5b506200c63c9291505b80821115620023a057600081556001016200238a565b5090565b5050604080518082019091526007815260c860020a6663726554696d650260208201526200c67290879063ffffffff6200fd9b16565b6006880155604080518082019091526007815260c860020a6675706454696d650260208201526200c6ab90879063ffffffff6200fd9b16565b600788015560408051808201909152600a815260b060020a69636f6d6d6f6e4e616d650260208201526200c6e790879063ffffffff6200f9fd16565b876008019080519060200190828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106200c73657805160ff19168380011785556200c766565b828001600101855582156200c766579182015b828111156200c7665782518255916020019190600101906200c749565b5b506200c78a9291505b80821115620023a057600081556001016200238a565b5090565b5050604080518082019091526009815260b860020a6873746174654e616d650260208201526200c7c290879063ffffffff6200f9fd16565b876009019080519060200190828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106200c81157805160ff19168380011785556200c841565b828001600101855582156200c841579182015b828111156200c8415782518255916020019190600101906200c824565b5b506200c8659291505b80821115620023a057600081556001016200238a565b5090565b505060408051808201909152600b815260a860020a6a636f756e7472794e616d650260208201526200c89f90879063ffffffff6200f9fd16565b87600a019080519060200190828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106200c8ee57805160ff19168380011785556200c91e565b828001600101855582156200c91e579182015b828111156200c91e5782518255916020019190600101906200c901565b5b506200c9429291505b80821115620023a057600081556001016200238a565b5090565b5050604080518082019091526005815260da60020a64195b585a5b0260208201526200c97690879063ffffffff6200f9fd16565b87600b019080519060200190828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106200c9c557805160ff19168380011785556200c9f5565b828001600101855582156200c9f5579182015b828111156200c9f55782518255916020019190600101906200c9d8565b5b506200ca199291505b80821115620023a057600081556001016200238a565b5090565b5050604080518082019091526004815260e060020a63747970650260208201526200ca4c90879063ffffffff6200fd9b16565b600c880155604080518082019091526005815260d960020a6430b236b4b70260208201526200ca8e906200ca8890889063ffffffff6200f9fd16565b620101e6565b600d88018054600160a060020a031916606060020a92830292909204919091179055604080518082019091526009815260ba60020a68195b9bd919531a5cdd0260208201526200cae0908790620103e6565b93505b604080518082019091526001815260f860020a607d0260208201526200cb1190859063ffffffff620106ff16565b915060008213156200cb56576200cb348460006001850163ffffffff6201074a16565b92506200cb4e846001840160001963ffffffff6201074a16565b93506200cb5a565b8392505b6200cb6583620107d7565b92508251600014156200cb78576200cf1a565b604080518082019091526006815260d060020a657075626b65790260208201526200cbab90849063ffffffff6200f9fd16565b8152604080518082019091526002815260f460020a6106970260208201526200cbdc90849063ffffffff6200f9fd16565b81602001819052506200cc1c6040604051908101604052806004815260200160e260020a631c1bdc9d02815260200150846200fd9b90919063ffffffff16565b60408083019190915280518082019091526009815260ba60020a681858dd1a5d985d19590260208201526200cc5990849063ffffffff6200fd9b16565b6060820152600f870180546001810180835582818380158290116200cd7f576004028160040283600052602060002091820191016200cd7f91905b80821115620023a057600060008201805460018160011615610100020316600290046000825580601f106200ccca57506200ccff565b601f0160209004906000526020600020908101906200ccff91905b80821115620023a057600081556001016200238a565b5090565b5b5060018201805460018160011615610100020316600290046000825580601f106200cd2c57506200cd61565b601f0160209004906000526020600020908101906200cd6191905b80821115620023a057600081556001016200238a565b5090565b5b505060006002820181905560038201556004016200cc94565b5090565b5b505050916000526020600020906004020160005b8390919091506000820151816000019080519060200190828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106200cdee57805160ff19168380011785556200ce1e565b828001600101855582156200ce1e579182015b828111156200ce1e5782518255916020019190600101906200ce01565b5b506200ce429291505b80821115620023a057600081556001016200238a565b5090565b50506020820151816001019080519060200190828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106200ce9857805160ff19168380011785556200cec8565b828001600101855582156200cec8579182015b828111156200cec85782518255916020019190600101906200ceab565b5b506200ceec9291505b80821115620023a057600081556001016200238a565b5090565b50506040820151600282015560609091015160039091015550600082136200cf14576200cf1a565b6200cae3565b60408051808201909152600a815260b260020a691c9bdb195259131a5cdd0260208201526200cf5590879060108a0163ffffffff6201094716565b86546002600019610100600184161502019091160415156200cf7b576000945062006dc8565b600194505b5050505092915050565b604080518082018252600180825260f960020a601102602080840182905284518086019095529184529083015260009182916200cfe2916200cfd491869063ffffffff6200d5e616565b859063ffffffff620106ff16565b90508060001914156200d05957604080518082018252600180825260f860020a60270260208084018290528451808601909552918452908301526200d042916200cfd491869063ffffffff6200d5e616565b859063ffffffff620106ff16565b90508060001914156200d059576000915062001c87565b5b8251016002015b83518110156200d1af5783818151811015620000005790602001015160f860020a900460f860020a02600160f860020a03191660fd60020a14806200d0d4575083818151811015620000005790602001015160f860020a900460f860020a02600160f860020a03191660f860020a600902145b806200d10e575083818151811015620000005790602001015160f860020a900460f860020a02600160f860020a03191660f860020a600d02145b806200d148575083818151811015620000005790602001015160f860020a900460f860020a02600160f860020a03191660f960020a600502145b156200d157576001016200d1a8565b83818151811015620000005790602001015160f860020a900460f860020a02600160f860020a03191660f960020a601d021415620071c3576001915062001c87566200d1a8565b6000915062001c87565b5b6200d061565b600091505b5092915050565b6000805b6004548110156200bb355760048181548110156200000057906000526020600020906012020160005b50600e015460a060020a900460ff16156200d203576200d2d5565b6200d2c68360048381548110156200000057906000526020600020906012020160005b50600801805460408051602060026001851615610100026000190190941693909304601f8101849004840282018401909252818152929183018282801562001d915780601f1062001d655761010080835404028352916020019162001d91565b820191906000526020600020905b81548152906001019060200180831162001d7357829003601f168201915b50505050506200bc8b90919063ffffffff16565b156200d2d55780915062001de3565b5b6001016200d1bf565b60001991505b50919050565b6001546040805160006020918201819052825160e160020a637c2fc09302815260048101849052600b60448201527f526f6c654d616e616765720000000000000000000000000000000000000000006064820152608060248201526007608482015260cc60020a660302e302e312e30260a48201529251909384938493600160a060020a039092169263f85f81269260c48084019391929182900301818787803b15620000005760325a03f1156200000057505060405151925050600160a060020a03821615156200d3bd57620073f8565b81905080600160a060020a031663d00cce41856000604051602001526040518260e060020a02815260040180806020018281038252838181518152602001915080519060200190808383829060006004602084601f0104600302600f01f150905090810190601f1680156200be745780820380516001836020036101000a031916815260200191505b5092505050602060405180830381600087803b15620000005760325a03f11562000000575050604051519350505b5050919050565b6000805b82548110156200d1af576200d545838281548110156200000057906000526020600020900160005b50805460408051602060026001851615610100026000190190941693909304601f810184900484028201840190925281815292918301828280156200d5305780601f106200d504576101008083540402835291602001916200d530565b820191906000526020600020905b8154815290600101906020018083116200d51257829003601f168201915b5050505050856200bc8b90919063ffffffff16565b156200d555576001915062001c87565b5b6001016200d47f565b600091505b5092915050565b602060405190810160405280600081526020015060006000600084518651016040518059106200d5985750595b8181526020808302820101604052905b5093506020860192506020850191506020840190506200d5cb818488516200f285565b620069f0865182018387516200f285565b5b50505092915050565b602060405190810160405280600081526020015060006000600060006000865188518a5101016040518059106200d61a5750595b8181526020808302820101604052905b509550602089019450602088019350602087019250602086019150600090506200d659818301868b516200f285565b8851810190506200d66f818301858a516200f285565b8751810190506200d6858183018489516200f285565b8651015b50505050509392505050565b604080516020810190915260008082528080805b6004548310156200d6fc5760048381548110156200000057906000526020600020906012020160005b50600e015460a060020a900460ff1615156200d6ef576001909301925b5b8260010192506200d6a9565b604080518082019091526001815260f860020a607b0260208201526200d72a90869063ffffffff6200d56b16565b604080518082019091526003815260ea60020a621c995d0260208201529095506200d78d906200d7639060009063ffffffff6200dc2716565b604080518082019091526001815260fa60020a600b02602082015287919063ffffffff6200d5e616565b604080518082019091526008815260c060020a672264617461223a7b0260208201529095506200d7c590869063ffffffff6200d56b16565b604080518082019091526005815260da60020a641d1bdd185b0260208201529095506200d829906200d76390869063ffffffff6200dc2716565b604080518082019091526001815260fa60020a600b02602082015287919063ffffffff6200d5e616565b604080518082019091526009815260b860020a68226974656d73223a5b0260208201529095506200d86290869063ffffffff6200d56b16565b945060009150600092505b6004548310156200dbea5760048381548110156200000057906000526020600020906012020160005b50600e015460a060020a900460ff16156200d8b1576200dbdd565b5060008615156200d8c5575060016200db53565b86600114156200d99f576200d98f8660048581548110156200000057906000526020600020906012020160005b50805460408051602060026001851615610100026000190190941693909304601f8101849004840282018401909252818152929183018282801562001d915780601f1062001d655761010080835404028352916020019162001d91565b820191906000526020600020905b81548152906001019060200180831162001d7357829003601f168201915b50505050506200bc8b90919063ffffffff16565b156200d999575060015b6200db53565b86600214156200da7c576200d98f8660048581548110156200000057906000526020600020906012020160005b5060019081018054604080516020600295841615610100026000190190931694909404601f81018390048302850183019091528084529083018282801562001d915780601f1062001d655761010080835404028352916020019162001d91565b820191906000526020600020905b81548152906001019060200180831162001d7357829003601f168201915b50505050506200bc8b90919063ffffffff16565b156200d999575060015b6200db53565b86600314156200db53576200db498660048581548110156200000057906000526020600020906012020160005b50600401805460408051602060026001851615610100026000190190941693909304601f8101849004840282018401909252818152929183018282801562001d915780601f1062001d655761010080835404028352916020019162001d91565b820191906000526020600020905b81548152906001019060200180831162001d7357829003601f168201915b50505050506200bc8b90919063ffffffff16565b156200db53575060015b5b5b5b5b80156200dbdd5760008211156200db9957604080518082019091526001815260fa60020a600b0260208201526200db9690869063ffffffff6200d56b16565b94505b6200dbd46200dbc660048581548110156200000057906000526020600020906012020160005b506200de2d565b869063ffffffff6200d56b16565b94506001909101905b5b8260010192506200d86d565b604080518082019091526003815260e860020a625d7d7d0260208201526200dc1a90869063ffffffff6200d56b16565b94505b5050505092915050565b6040805160208101909152600080825282516003019080808615156200dc53576001840193506200dc73565b8692505b60008311156200dc7357600a836001909501940492506200dc57565b5b836040518059106200dc835750595b8181526020808302820101604052905b5080519095506001925060f960020a6011029086906000908110156200000057906020010190600160f860020a031916908160001a905350600090505b85518110156200dd2d5785818151811015620000005790602001015160f860020a900460f860020a02858380600101945081518110156200000057906020010190600160f860020a031916908160001a9053505b6001016200dcd0565b60f960020a601102858380600101945081518110156200000057906020010190600160f860020a031916908160001a90535060f960020a601d02858380600101945081518110156200000057906020010190600160f860020a031916908160001a905350600019840191508615156200ddd257603060f860020a02858381518110156200000057906020010190600160f860020a031916908160001a90535062006dc8565b5b600087111562006dc857600a870660300160f860020a0285838060019003945081518110156200000057906020010190600160f860020a031916908160001a905350600a870496506200ddd3565b5b5b5050505092915050565b6040805160208181018352600080835283518085019094526001845260f860020a607b029184019190915290916200de6d90839063ffffffff6200d56b16565b604080518082018252600280825260f260020a611a5902602080840191909152875484516001821615610100026000190190911692909204601f81018290048202830182019094528382529395506200df5a936200df309388918301828280156200af9b5780601f106200af6f576101008083540402835291602001916200af9b565b820191906000526020600020905b8154815290600101906020018083116200af7d57829003601f168201915b50505050506200f04c90919063ffffffff16565b604080518082019091526001815260fa60020a600b02602082015284919063ffffffff6200d5e616565b91506200e0626200df306040604051908101604052806004815260200160e060020a636e616d6502815260200150856001018054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156200af9b5780601f106200af6f576101008083540402835291602001916200af9b565b820191906000526020600020905b8154815290600101906020018083116200af7d57829003601f168201915b50505050506200f04c90919063ffffffff16565b604080518082019091526001815260fa60020a600b02602082015284919063ffffffff6200d5e616565b60408051808201909152600f81527f6465706172746d656e744c6576656c0000000000000000000000000000000000602082015260028501549193506200e0de916200df309163ffffffff6200dc2716565b604080518082019091526001815260fa60020a600b02602082015284919063ffffffff6200d5e616565b604080518082019091526009815260b860020a6873657269616c4e756d02602082015260038501549193506200e149916200df309163ffffffff6200dc2716565b604080518082019091526001815260fa60020a600b02602082015284919063ffffffff6200d5e616565b6040805180820182526008815260c260020a671c185c995b9d1259026020808301919091526004870180548451601f600260001961010060018616150201909316929092049182018490048402810184019095528085529496506200e241946200df3094928301828280156200af9b5780601f106200af6f576101008083540402835291602001916200af9b565b820191906000526020600020905b8154815290600101906020018083116200af7d57829003601f168201915b50505050506200f04c90919063ffffffff16565b604080518082019091526001815260fa60020a600b02602082015284919063ffffffff6200d5e616565b604080518082018252600b815260a960020a6a3232b9b1b934b83a34b7b7026020808301919091526005870180548451601f600260001961010060018616150201909316929092049182018490048402810184019095528085529496506200e33c946200df3094928301828280156200af9b5780601f106200af6f576101008083540402835291602001916200af9b565b820191906000526020600020905b8154815290600101906020018083116200af7d57829003601f168201915b50505050506200f04c90919063ffffffff16565b604080518082019091526001815260fa60020a600b02602082015284919063ffffffff6200d5e616565b604080518082019091526007815260c860020a6663726554696d6502602082015260068501549193506200e3a5916200df309163ffffffff6200dc2716565b604080518082019091526001815260fa60020a600b02602082015284919063ffffffff6200d5e616565b60408051808201909152600780825260c860020a6675706454696d650260208301528501549193506200e40d916200df309163ffffffff6200dc2716565b604080518082019091526001815260fa60020a600b02602082015284919063ffffffff6200d5e616565b604080518082018252600a815260b060020a69636f6d6d6f6e4e616d65026020808301919091526008870180548451601f600260001961010060018616150201909316929092049182018490048402810184019095528085529496506200e507946200df3094928301828280156200af9b5780601f106200af6f576101008083540402835291602001916200af9b565b820191906000526020600020905b8154815290600101906020018083116200af7d57829003601f168201915b50505050506200f04c90919063ffffffff16565b604080518082019091526001815260fa60020a600b02602082015284919063ffffffff6200d5e616565b604080518082018252600980825260b860020a6873746174654e616d650260208084019190915290870180548451601f600260001961010060018616150201909316929092049182018490048402810184019095528085529496506200e600946200df3094928301828280156200af9b5780601f106200af6f576101008083540402835291602001916200af9b565b820191906000526020600020905b8154815290600101906020018083116200af7d57829003601f168201915b50505050506200f04c90919063ffffffff16565b604080518082019091526001815260fa60020a600b02602082015284919063ffffffff6200d5e616565b604080518082018252600b815260a860020a6a636f756e7472794e616d6502602080830191909152600a870180548451601f600260001961010060018616150201909316929092049182018490048402810184019095528085529496506200e6fb946200df3094928301828280156200af9b5780601f106200af6f576101008083540402835291602001916200af9b565b820191906000526020600020905b8154815290600101906020018083116200af7d57829003601f168201915b50505050506200f04c90919063ffffffff16565b604080518082019091526001815260fa60020a600b02602082015284919063ffffffff6200d5e616565b6040805180820182526005815260da60020a64195b585a5b02602080830191909152600b870180548451601f600260001961010060018616150201909316929092049182018490048402810184019095528085529496506200e7f0946200df3094928301828280156200af9b5780601f106200af6f576101008083540402835291602001916200af9b565b820191906000526020600020905b8154815290600101906020018083116200af7d57829003601f168201915b50505050506200f04c90919063ffffffff16565b604080518082019091526001815260fa60020a600b02602082015284919063ffffffff6200d5e616565b604080518082019091526004815260e060020a6374797065026020820152600c8501549193506200e856916200df309163ffffffff6200dc2716565b604080518082019091526001815260fa60020a600b02602082015284919063ffffffff6200d5e616565b604080518082019091526005815260d960020a6430b236b4b7026020820152600d8501549193506200e8d9916200df3091906200e8a290600160a060020a031663ffffffff6200bea916565b9063ffffffff6200f04c16565b604080518082019091526001815260fa60020a600b02602082015284919063ffffffff6200d5e616565b60408051808201909152600d81527f22656e6f64654c697374223a5b0000000000000000000000000000000000000060208201529092506200e92390839063ffffffff6200d56b16565b9150600090505b600f8301548110156200ed075760008111156200e97257604080518082019091526001815260fa60020a600b0260208201526200e96f90839063ffffffff6200d56b16565b91505b604080518082019091526001815260f860020a607b0260208201526200e9a090839063ffffffff6200d56b16565b91506200eab76200df306040604051908101604052806006815260200160d060020a657075626b65790281526020015085600f018481548110156200000057906000526020600020906004020160005b50805460408051602060026001851615610100026000190190941693909304601f810184900484028201840190925281815292918301828280156200af9b5780601f106200af6f576101008083540402835291602001916200af9b565b820191906000526020600020905b8154815290600101906020018083116200af7d57829003601f168201915b50505050506200f04c90919063ffffffff16565b604080518082019091526001815260fa60020a600b02602082015284919063ffffffff6200d5e616565b91506200ebcd6200df306040604051908101604052806002815260200160f460020a6106970281526020015085600f018481548110156200000057906000526020600020906004020160005b5060019081018054604080516020600295841615610100026000190190931694909404601f8101839004830285018301909152808452908301828280156200af9b5780601f106200af6f576101008083540402835291602001916200af9b565b820191906000526020600020905b8154815290600101906020018083116200af7d57829003601f168201915b50505050506200f04c90919063ffffffff16565b604080518082019091526001815260fa60020a600b02602082015284919063ffffffff6200d5e616565b91506200ec576200df306040604051908101604052806004815260200160e260020a631c1bdc9d0281526020015085600f018481548110156200000057906000526020600020906004020160005b50600201549063ffffffff6200dc2716565b604080518082019091526001815260fa60020a600b02602082015284919063ffffffff6200d5e616565b91506200ecca6200ecbc6040604051908101604052806009815260200160ba60020a681858dd1a5d985d19590281526020015085600f018481548110156200000057906000526020600020906004020160005b50600301549063ffffffff6200dc2716565b839063ffffffff6200d56b16565b604080518082019091526001815260f860020a607d0260208201529092506200ecfb90839063ffffffff6200d56b16565b91505b6001016200e92a565b60408051808201909152600281527f5d2c00000000000000000000000000000000000000000000000000000000000060208201526200ed4e90839063ffffffff6200d56b16565b60408051808201909152600a815260b260020a691c9bdb195259131a5cdd0260208201529092506200ed9e906200ecbc90601086019063ffffffff6201118316565b839063ffffffff6200d56b16565b604080518082019091526001815260f860020a607d0260208201529092506200edcf90839063ffffffff6200d56b16565b91505b50919050565b60206040519081016040528060008152602001506020604051908101604052806000815260200150600060006000600060286040518059106200ee185750595b8181526020808302820101604052905b509450600093505b60148410156200eeef578360130360080260020a87600160a060020a0316811562000000570460f860020a9081029350601081850460ff81168290048302945082850490910290030290506200ee868262011554565b858560020281518110156200000057906020010190600160f860020a031916908160001a9053506200eeb88162011554565b858560020260010181518110156200000057906020010190600160f860020a031916908160001a9053505b6001909301926200ee30565b8495505b5050505050919050565b80516000908160208211156200ef1257602091505b5060009150815b81811015620073f85783818151811015620000005790602001015160f860020a900460f860020a0260f860020a900460ff1683610100020192505b6001016200ef19565b5b5050919050565b6040805160208101909152600080825280808415156200efa257604080518082019091526001815260fc60020a600302602082015293506200f043565b600092508491505b60008211156200efc657600a826001909401930491506200efaa565b8260ff166040518059106200efd85750595b8181526020808302820101604052905b5093505060001982015b60008511156200f04357600a850660300160f860020a0284828060019003935060ff1681518110156200000057906020010190600160f860020a031916908160001a905350600a850494506200eff2565b5b505050919050565b6020604051908101604052806000815260200150600060006000600085518751016005016040518059106200f07e5750595b8181526020808302820101604052905b508051909550602088810195508781019450860192506001915060f960020a6011029086906000908110156200000057906020010190600160f860020a031916908160001a9053506200f0e68183018488516200f285565b85518101905060f960020a601102858280600101935081518110156200000057906020010190600160f860020a031916908160001a90535060f960020a601d02858280600101935081518110156200000057906020010190600160f860020a031916908160001a90535060f960020a601102858280600101935081518110156200000057906020010190600160f860020a031916908160001a9053506200f1928183018589516200f285565b86518101905060f960020a601102858280600101935081518110156200000057906020010190600160f860020a031916908160001a9053505b5050505092915050565b604080516020810190915260008082528290805b60008311156200f20657610100830492506001909101906200f1e9565b816040518059106200f2155750595b8181526020808302820101604052905b5093508492505060001981015b60008311156200f04357610100830660f860020a02848281518110156200000057906020010190600160f860020a031916908160001a90535061010083049250600019016200f232565b5b505050919050565b60005b602082106200f2ac5782518452602093840193909201915b6020820391506200f288565b6001826020036101000a039050801983511681855116818117865250505b50505050565b600d81018054600160a060020a0319169055604080516020808201928390526000918290528354848352818320845160ff19168655859460026101006001851615026000190190931692909204601f019290920482019291906200f35f565b828001600101855582156200f35f579182015b828111156200f35f5782518255916020019190600101906200f342565b5b506200f3839291505b80821115620023a057600081556001016200238a565b5090565b50506020604051908101604052806000815260200150816001019080519060200190828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106200f3e857805160ff19168380011785556200f418565b828001600101855582156200f418579182015b828111156200f4185782518255916020019190600101906200f3fb565b5b506200f43c9291505b80821115620023a057600081556001016200238a565b5090565b505060006002828101829055600383018290556040805160208082019283905290849052600485018054818652828620845160ff1916835591956001821615610100026000190190911694909404601f0191909104810192916200f4cb565b828001600101855582156200f4cb579182015b828111156200f4cb5782518255916020019190600101906200f4ae565b5b506200f4ef9291505b80821115620023a057600081556001016200238a565b5090565b505060408051602080820192839052600091829052600584018054818452828420855160ff19168355919460026001831615610100026000190190921691909104601f0192909204810192916200f571565b828001600101855582156200f571579182015b828111156200f5715782518255916020019190600101906200f554565b5b506200f5959291505b80821115620023a057600081556001016200238a565b5090565b5050600060068201819055600782018190556040805160208082019283905290839052600884018054818552828520845160ff19168355919460026001831615610100026000190190921691909104601f01929092048101926200f624565b828001600101855582156200f624579182015b828111156200f6245782518255916020019190600101906200f607565b5b506200f6489291505b80821115620023a057600081556001016200238a565b5090565b505060408051602080820192839052600091829052600984018054818452828420855160ff19168355919460026001831615610100026000190190921691909104601f0192909204810192916200f6ca565b828001600101855582156200f6ca579182015b828111156200f6ca5782518255916020019190600101906200f6ad565b5b506200f6ee9291505b80821115620023a057600081556001016200238a565b5090565b505060408051602080820192839052600091829052600a84018054818452828420855160ff19168355919460026001831615610100026000190190921691909104601f0192909204810192916200f770565b828001600101855582156200f770579182015b828111156200f7705782518255916020019190600101906200f753565b5b506200f7949291505b80821115620023a057600081556001016200238a565b5090565b505060408051602080820192839052600091829052600b84018054818452828420855160ff19168355919460026001831615610100026000190190921691909104601f0192909204810192916200f816565b828001600101855582156200f816579182015b828111156200f8165782518255916020019190600101906200f7f9565b5b506200f83a9291505b80821115620023a057600081556001016200238a565b5090565b50506000600c8201819055600f8201805482825590825260209091206200f94d916004028101905b80821115620023a057600060008201805460018160011615610100020316600290046000825580601f106200f89857506200f8cd565b601f0160209004906000526020600020908101906200f8cd91905b80821115620023a057600081556001016200238a565b5090565b5b5060018201805460018160011615610100020316600290046000825580601f106200f8fa57506200f92f565b601f0160209004906000526020600020908101906200f92f91905b80821115620023a057600081556001016200238a565b5090565b5b505060006002820181905560038201556004016200f862565b5090565b5b5080601001805460008255906000526020600020908101906200f9e591905b80821115620023a057600081805460018160011615610100020316600290046000825580601f106200f9a057506200f9d5565b601f0160209004906000526020600020908101906200f9d591905b80821115620023a057600081556001016200238a565b5090565b5b50506001016200f96d565b5090565b5b50600e8101805460a060020a60ff02191690555b50565b6040805160208101909152600080825260001990808080805b604080518082018252600180825260f960020a60110260208084018290528451808601909552918452908301526200fa6a916200fa5b918b9063ffffffff6200d5e616565b8a908763ffffffff620115ad16565b95508560001914156200fade57604080518082018252600180825260f860020a60270260208084018290528451808601909552918452908301526200facb916200fa5b918b9063ffffffff6200d5e616565b8a908763ffffffff620115ad16565b95508560001914156200fade576200fd8f565b5b875160020186019550600093505b88518610156200fc3e5788868151811015620000005790602001015160f860020a900460f860020a02600160f860020a03191660fd60020a14806200fb60575088868151811015620000005790602001015160f860020a900460f860020a02600160f860020a03191660f860020a600902145b806200fb9a575088868151811015620000005790602001015160f860020a900460f860020a02600160f860020a03191660f860020a600d02145b806200fbd4575088868151811015620000005790602001015160f860020a900460f860020a02600160f860020a03191660f960020a600502145b156200fbe6576001909501946200fc37565b88868151811015620000005790602001015160f860020a900460f860020a02600160f860020a03191660f960020a601d0214156200fc315760019586019593506200fc3e566200fc37565b6200fc3e565b5b6200faed565b88518614156200fc4e576200fd8f565b83156200fc60576200fc6a566200fc64565b8594505b6200fa16565b60408051808201909152600180825260f960020a601102602083015293506200fc9c908a908863ffffffff620115ad16565b91508160001914156200fcef57604080518082019091526001815260f860020a6027026020820152600093506200fcdc908a908863ffffffff620115ad16565b91508160001914156200fcef576200fd8f565b5b60018201915082156200fd3457604080518082019091526001815260f960020a60110260208201526200fd2c908a908463ffffffff620115ad16565b90506200fd66565b604080518082019091526001815260f860020a60270260208201526200fd63908a908463ffffffff620115ad16565b90505b8060001914156200fd77576200fd8f565b6200fd8c898380840363ffffffff6201074a16565b96505b50505050505092915050565b600060001981808080805b604080518082018252600180825260f960020a60110260208084018290528451808601909552918452908301526200fdfa916200fa5b918b9063ffffffff6200d5e616565b8a908763ffffffff620115ad16565b95508560001914156200fe6e57604080518082018252600180825260f860020a60270260208084018290528451808601909552918452908301526200fe5b916200fa5b918b9063ffffffff6200d5e616565b8a908763ffffffff620115ad16565b95508560001914156200fe6e576200fd8f565b5b875160020186019550600093505b88518610156200ffce5788868151811015620000005790602001015160f860020a900460f860020a02600160f860020a03191660fd60020a14806200fef0575088868151811015620000005790602001015160f860020a900460f860020a02600160f860020a03191660f860020a600902145b806200ff2a575088868151811015620000005790602001015160f860020a900460f860020a02600160f860020a03191660f860020a600d02145b806200ff64575088868151811015620000005790602001015160f860020a900460f860020a02600160f860020a03191660f960020a600502145b156200ff76576001909501946200ffc7565b88868151811015620000005790602001015160f860020a900460f860020a02600160f860020a03191660f960020a601d0214156200ffc15760019586019593506200ffce566200ffc7565b6200ffce565b5b6200fe7d565b88518614156200ffde576200fd8f565b83156200fff0576200fffa566200fff4565b8594505b6200fda6565b8592505b8851831015620100ab5788838151811015620000005790602001015160f860020a900460f860020a0260f860020a900491508160ff16602014806201004657508160ff166009145b806201005557508160ff16600d145b806201006457508160ff16600a145b806201007357508160ff16603a145b806201008257508160ff166022145b806201009157508160ff166027145b15156201009e57620100ab565b5b8260010192506200fffe565b6001905088838151811015620000005790602001015160f860020a900460f860020a02600160f860020a0319167f2b0000000000000000000000000000000000000000000000000000000000000014156201010d57506001918201916201014f565b88838151811015620000005790602001015160f860020a900460f860020a02600160f860020a03191660f860020a602d0214156201014f575060019091019060005b5b5b8851831015620101ca57888381518110156200000057016020015160f860020a908190048102049150603060ff83161080159062010193575060398260ff1611155b1515620101af57801515620101a9578660000396505b6200fd8f565b6030820360ff1687600a020196505b8260010192506201014f565b8015156200fd8f578660000396505b5b50505050505092915050565b60008080805b84518361ffff1610156201027457848361ffff168151811015620000005790602001015160f860020a900460f860020a0260f860020a900491508160ff16602014806201023c57508160ff166009145b806201024b57508160ff16600d145b806201025a57508160ff16600a145b1515620102675762010274565b5b826001019250620101ec565b60028361ffff1686510310156201028f57600093506200f043565b848361ffff168151811015620000005790602001015160f860020a900460f860020a02600160f860020a03191660fc60020a600302148015620103105750848360010161ffff168151811015620000005790602001015160f860020a900460f860020a02602060f860020a0217600160f860020a03191660fb60020a600f02145b15156201032157600093506200f043565b600090506002830192505b84518361ffff161015620103da57848361ffff1681518110156200000057016020015160f860020a908190048102049150603060ff83161080159062010376575060398260ff1611155b156201038857603082039150620103c4565b60618260201760ff1610158015620103a7575060668260201760ff1611155b15620103ba5760561990910190620103c4565b600093506200f043565b5b60100260ff8216015b8260010192506201032c565b8093505b505050919050565b60408051602081019091526000808252600019908080805b604080518082018252600180825260f960020a6011026020808401829052845180860190955291845290830152620104529162010443918a9063ffffffff6200d5e616565b89908663ffffffff620115ad16565b9450846000191415620104c657604080518082018252600180825260f860020a6027026020808401829052845180860190955291845290830152620104b39162010443918a9063ffffffff6200d5e616565b89908663ffffffff620115ad16565b9450846000191415620104c657620106f4565b5b865160020185019450600092505b8751851015620106265787858151811015620000005790602001015160f860020a900460f860020a02600160f860020a03191660fd60020a148062010548575087858151811015620000005790602001015160f860020a900460f860020a02600160f860020a03191660f860020a600902145b8062010582575087858151811015620000005790602001015160f860020a900460f860020a02600160f860020a03191660f860020a600d02145b80620105bc575087858151811015620000005790602001015160f860020a900460f860020a02600160f860020a03191660f960020a600502145b15620105ce576001909401936201061f565b87858151811015620000005790602001015160f860020a900460f860020a02600160f860020a03191660f960020a601d0214156201061957600194850194925062010626566201061f565b62010626565b5b620104d5565b87518514156201063657620106f4565b8215620106485762010652566201064c565b8493505b620103fe565b604080518082019091526001815260f860020a605b026020820152620106819089908763ffffffff620115ad16565b91508160001914156201069457620106f4565b60408051808201909152600180825260f860020a605d0260208301529290920191620106c99089908763ffffffff620115ad16565b9050806000191415620106dc57620106f4565b620106f1888380840363ffffffff6201074a16565b95505b505050505092915050565b60006000600060006020860192506020850191508262010724875185885186620115fd565b03905085518110156201073a57809350620069f0565b60001993505b5b50505092915050565b604080516020810190915260008082528451819085900384111562010770578486510393505b6000841162010790576040805160208101909152600081529250620107cd565b836040518059106201079f5750595b8181526020808302820101604052905b509250602086019150602083019050620107cd81868401866200f285565b5b50509392505050565b6040805160208101909152600080825280808080805b87518610156201086d5787868151811015620000005790602001015160f860020a900460f860020a0260f860020a900494508460ff16602014806201083557508460ff166009145b806201084457508460ff16600d145b806201085357508460ff16600a145b151562010860576201086d565b5b856001019550620107ed565b87519593505b6000861115620108f75787600187038151811015620000005790602001015160f860020a900460f860020a0260f860020a900494508460ff1660201480620108be57508460ff166009145b80620108cd57508460ff16600d145b80620108dc57508460ff16600a145b1515620108e957620108f7565b5b6000199095019462010873565b8592508383036040518059106201090b5750595b8181526020808302820101604052905b5096506020880191506020870190506201093b818584018686036200f285565b5b505050505050919050565b6000600060006000600060006020604051908101604052806000815260200150600096505b8754871015620109fc57878781548110156200000057906000526020600020900160005b50805460018160011615610100020316600290046000825580601f10620109b85750620109ed565b601f016020900490600052602060002090810190620109ed91905b80821115620023a057600081556001016200238a565b5090565b5b505b8660010196506201096c565b6000888181548183558181151162010a9a5760008381526020902062010a9a9181019083015b80821115620023a057600081805460018160011615610100020316600290046000825580601f1062010a55575062010a8a565b601f01602090049060005260206000209081019062010a8a91905b80821115620023a057600081556001016200238a565b5090565b5b505060010162010a22565b5090565b5b505050506000199550600094505b604080518082018252600180825260f960020a601102602080840182905284518086019095529184529083015262010afd9162010aee918c9063ffffffff6200d5e616565b8b908763ffffffff620115ad16565b955085600019141562010b7157604080518082018252600180825260f860020a602702602080840182905284518086019095529184529083015262010b5e9162010aee918c9063ffffffff6200d5e616565b8b908763ffffffff620115ad16565b955085600019141562010b715762011176565b5b885160020186019550600093505b895186101562010cd15789868151811015620000005790602001015160f860020a900460f860020a02600160f860020a03191660fd60020a148062010bf3575089868151811015620000005790602001015160f860020a900460f860020a02600160f860020a03191660f860020a600902145b8062010c2d575089868151811015620000005790602001015160f860020a900460f860020a02600160f860020a03191660f860020a600d02145b8062010c67575089868151811015620000005790602001015160f860020a900460f860020a02600160f860020a03191660f960020a600502145b1562010c795760019095019462010cca565b89868151811015620000005790602001015160f860020a900460f860020a02600160f860020a03191660f960020a601d02141562010cc457600195860195935062010cd15662010cca565b62010cd1565b5b62010b80565b895186141562010ce15762011176565b831562010cf35762010cfd5662010cf7565b8594505b62010aa9565b604080518082019091526001815260f860020a605b02602082015262010d2c908b908863ffffffff620115ad16565b925082600019141562010d3f5762011176565b60408051808201909152600180825260f860020a605d026020830152939093019262010d74908b908863ffffffff620115ad16565b915081600019141562010d875762011176565b604080518082019091526004815260e160020a631004868502602082015262010dcc9062010dbf8c8680870363ffffffff6201074a16565b9063ffffffff620116b216565b905080516000141562010ddf5762011176565b604080518082019091526001815260fa60020a600b02602082015262010e0e9082908a63ffffffff620118b616565b600096505b8754871015620111765762010efc6040604051908101604052806004815260200160e160020a631004868502815260200150898981548110156200000057906000526020600020900160005b50805460408051602060026001851615610100026000190190941693909304601f8101849004840282018401909252818152929183018282801562010ee85780601f1062010ebc5761010080835404028352916020019162010ee8565b820191906000526020600020905b81548152906001019060200180831162010eca57829003601f168201915b5050505050620116b290919063ffffffff16565b888881548110156200000057906000526020600020900160005b509080519060200190828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1062010f6257805160ff191683800117855562010f92565b8280016001018555821562010f92579182015b8281111562010f9257825182559160200191906001019062010f75565b5b5062010fb69291505b80821115620023a057600081556001016200238a565b5090565b5050620110ad604060405190810160405280600281526020017f2722000000000000000000000000000000000000000000000000000000000000815260200150898981548110156200000057906000526020600020900160005b50805460408051602060026001851615610100026000190190941693909304601f8101849004840282018401909252818152929183018282801562010ee85780601f1062010ebc5761010080835404028352916020019162010ee8565b820191906000526020600020905b81548152906001019060200180831162010eca57829003601f168201915b5050505050620116b290919063ffffffff16565b888881548110156200000057906000526020600020900160005b509080519060200190828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106201111357805160ff191683800117855562011143565b8280016001018555821562011143579182015b828111156201114357825182559160200191906001019062011126565b5b50620111679291505b80821115620023a057600081556001016200238a565b5090565b50505b86600101965062010e13565b5b50505050505050505050565b6040805160208101909152600080825282516005019080805b86548310156201123657865460001901831015620111f157868381548110156200000057906000526020600020900160005b505460026000196101006001841615020190911604939093016003019262011229565b868381548110156200000057906000526020600020900160005b50805460018160011615610100020316600290049050600201840193505b5b8260010192506201119c565b83604051805910620112455750595b8181526020808302820101604052905b5080519095506001925060f960020a6011029086906000908110156200000057906020010190600160f860020a031916908160001a905350600090505b8551811015620112ef5785818151811015620000005790602001015160f860020a900460f860020a02858380600101945081518110156200000057906020010190600160f860020a031916908160001a9053505b60010162011292565b60f960020a601102858380600101945081518110156200000057906020010190600160f860020a031916908160001a90535060f960020a601d02858380600101945081518110156200000057906020010190600160f860020a031916908160001a90535060f860020a605b02858380600101945081518110156200000057906020010190600160f860020a031916908160001a905350600092505b8654831015620115175760f960020a601102858380600101945081518110156200000057906020010190600160f860020a031916908160001a905350600090505b868381548110156200000057906000526020600020900160005b5054600260001961010060018416150201909116048110156201149757868381548110156200000057906000526020600020900160005b5081815460018160011615610100020316600290048110156200000057815460011615620114595790600052602060002090602091828204019190065b9054901a60f860020a02858380600101945081518110156200000057906020010190600160f860020a031916908160001a9053505b600101620113cb565b60f960020a601102858380600101945081518110156200000057906020010190600160f860020a031916908160001a9053508654600019018310156201150a5760fa60020a600b02858380600101945081518110156200000057906020010190600160f860020a031916908160001a9053505b5b8260010192506201138a565b60f860020a605d02858380600101945081518110156200000057906020010190600160f860020a031916908160001a9053505b5050505092915050565b600060f960020a600502600160f860020a0319831610156201158e578160f860020a900460300160f860020a02905062001c915662001c91565b8160f860020a900460570160f860020a02905062001c91565b5b919050565b600060006000600060208701925060208601915082620115d686895103878601895186620115fd565b0390508651811015620115ec5780935062005cec565b60001993505b5b5050509392505050565b6000808080808887116201169e57602087116201165e5760018760200360080260020a031980875116888b038a018a96505b8183885116146201164d5760018701968190106201162f578b8b0196505b505050839450620116a6566201169e565b8686209150879350600092505b86890383116201169e5750858320818114156201168b57839450620116a6565b6001840193505b6001909201916201166b565b5b5b88880194505b50505050949350505050565b604080516020810190915260008082528080808080805b89518761ffff161015620117815760009450600095505b88518661ffff1610156201176657888661ffff168151811015620000005790602001015160f860020a900460f860020a02600160f860020a0319168a8861ffff168151811015620000005790602001015160f860020a900460f860020a02600160f860020a031916141562011759576001945062011766565b5b856001019550620116e0565b841515620117745762011781565b5b866001019650620116c9565b89519693505b60008761ffff161115620118435760009450600095505b88518661ffff1610156201182757888661ffff168151811015620000005790602001015160f860020a900460f860020a02600160f860020a0319168a6001890361ffff168151811015620000005790602001015160f860020a900460f860020a02600160f860020a03191614156201181a576001945062011827565b5b8560010195506201179e565b841515620118355762011843565b5b6000199096019562011787565b86925061ffff808516908416116201185b57620118a8565b83830361ffff16604051805910620118705750595b8181526020808302820101604052905b50975060208a019150602088019050620118a8818561ffff16840186860361ffff166200f285565b5b5050505050505092915050565b60006000600060006000600060206040519081016040528060008152602001506000600097505b88548810156201196d57888881548110156200000057906000526020600020900160005b50805460018160011615610100020316600290046000825580601f106201192957506201195e565b601f0160209004906000526020600020908101906201195e91905b80821115620023a057600081556001016200238a565b5090565b5b505b876001019750620118dd565b6000898181548183558181151162011a0b5760008381526020902062011a0b9181019083015b80821115620023a057600081805460018160011615610100020316600290046000825580601f10620119c65750620119fb565b601f016020900490600052602060002090810190620119fb91905b80821115620023a057600081556001016200238a565b5090565b5b505060010162011993565b5090565b5b5050505060208b01965060208a019550600094505b6000925060008a51111562011a67578662011a45868d5103878a018d518a620115fd565b0393508a5184101562011a5c576001925062011a61565b8a5193505b62011a6c565b8a5193505b84840360405180591062011a7d5750595b8181526020808302820101604052905b509150506020810162011aa6818887018787036200f285565b89518401945088805480600101828181548183558181151162011b4f5760008381526020902062011b4f9181019083015b80821115620023a057600081805460018160011615610100020316600290046000825580601f1062011b0a575062011b3f565b601f01602090049060005260206000209081019062011b3f91905b80821115620023a057600081556001016200238a565b5090565b5b505060010162011ad7565b5090565b5b505050916000526020600020900160005b8490919091509080519060200190828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1062011bb257805160ff191683800117855562011be2565b8280016001018555821562011be2579182015b8281111562011be257825182559160200191906001019062011bc5565b5b5062011c069291505b80821115620023a057600081556001016200238a565b5090565b50505082151562011c175762011c1d565b62011a21565b5b505050505050505050505056636f6d6d6f6e4e616d6520636f6e666c696374656400000000000000000000004465706172746d656e744d616e61676572000000000000000000000000000000636f6d6d6f6e4e616d6520697320656d707479000000000000000000000000006f52e1083ea2b4deef2cb48dbb504881c8b27cfedc2d85bc841b9ed1613c54cc",
    "events": {
      "0x6f52e1083ea2b4deef2cb48dbb504881c8b27cfedc2d85bc841b9ed1613c54cc": {
        "anonymous": false,
        "inputs": [
          {
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
      }
    },
    "updated_at": 1503988026278,
    "links": {}
  }
};

  Contract.checkNetwork = function(callback) {
    var self = this;

    if (this.network_id != null) {
      return callback();
    }

    this.web3.version.network(function(err, result) {
      if (err) return callback(err);

      var network_id = result.toString();

      // If we have the main network,
      if (network_id == "1") {
        var possible_ids = ["1", "live", "default"];

        for (var i = 0; i < possible_ids.length; i++) {
          var id = possible_ids[i];
          if (Contract.all_networks[id] != null) {
            network_id = id;
            break;
          }
        }
      }

      if (self.all_networks[network_id] == null) {
        return callback(new Error(self.name + " error: Can't find artifacts for network id '" + network_id + "'"));
      }

      self.setNetwork(network_id);
      callback();
    })
  };

  Contract.setNetwork = function(network_id) {
    var network = this.all_networks[network_id] || {};

    this.abi             = this.prototype.abi             = network.abi;
    this.unlinked_binary = this.prototype.unlinked_binary = network.unlinked_binary;
    this.address         = this.prototype.address         = network.address;
    this.updated_at      = this.prototype.updated_at      = network.updated_at;
    this.links           = this.prototype.links           = network.links || {};
    this.events          = this.prototype.events          = network.events || {};

    this.network_id = network_id;
  };

  Contract.networks = function() {
    return Object.keys(this.all_networks);
  };

  Contract.link = function(name, address) {
    if (typeof name == "function") {
      var contract = name;

      if (contract.address == null) {
        throw new Error("Cannot link contract without an address.");
      }

      Contract.link(contract.contract_name, contract.address);

      // Merge events so this contract knows about library's events
      Object.keys(contract.events).forEach(function(topic) {
        Contract.events[topic] = contract.events[topic];
      });

      return;
    }

    if (typeof name == "object") {
      var obj = name;
      Object.keys(obj).forEach(function(name) {
        var a = obj[name];
        Contract.link(name, a);
      });
      return;
    }

    Contract.links[name] = address;
  };

  Contract.contract_name   = Contract.prototype.contract_name   = "DepartmentManager";
  Contract.generated_with  = Contract.prototype.generated_with  = "3.2.0";

  // Allow people to opt-in to breaking changes now.
  Contract.next_gen = false;

  var properties = {
    binary: function() {
      var binary = Contract.unlinked_binary;

      Object.keys(Contract.links).forEach(function(library_name) {
        var library_address = Contract.links[library_name];
        var regex = new RegExp("__" + library_name + "_*", "g");

        binary = binary.replace(regex, library_address.replace("0x", ""));
      });

      return binary;
    }
  };

  Object.keys(properties).forEach(function(key) {
    var getter = properties[key];

    var definition = {};
    definition.enumerable = true;
    definition.configurable = false;
    definition.get = getter;

    Object.defineProperty(Contract, key, definition);
    Object.defineProperty(Contract.prototype, key, definition);
  });

  bootstrap(Contract);

  if (typeof module != "undefined" && typeof module.exports != "undefined") {
    module.exports = Contract;
  } else {
    // There will only be one version of this contract in the browser,
    // and we can use that.
    window.DepartmentManager = Contract;
  }
})();
