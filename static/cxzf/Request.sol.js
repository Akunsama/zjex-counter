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
        instance[item.name].sendRawTransaction = Utils.promisifyFunction(contract[item.name].sendRawTransaction, constructor); //ok. added by liaoyan
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
      throw new Error("Request error: Please call setProvider() first before calling new().");
    }

    var args = Array.prototype.slice.call(arguments);

    if (!this.unlinked_binary) {
      throw new Error("Request error: contract binary not set. Can't deploy new instance.");
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

      throw new Error("Request contains unresolved libraries. You must deploy and link the following libraries before you can deploy a new version of Request: " + unlinked_libraries);
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
      throw new Error("Invalid address passed to Request.at(): " + address);
    }

    var contract_class = this.web3.eth.contract(this.abi);
    var contract = contract_class.at(address);

    return new this(contract);
  };

  Contract.deployed = function() {
    if (!this.address) {
      throw new Error("Cannot find deployed address: Request not deployed or address not set.");
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
    "abi": [{"constant":true,"inputs":[],"name":"getErrno","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_str","type":"string"},{"name":"_addr","type":"address"}],"name":"log","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_str","type":"string"},{"name":"_i","type":"int256"}],"name":"log","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_name","type":"string"},{"name":"_version","type":"string"}],"name":"register","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_str","type":"string"}],"name":"log","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"kill","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_str","type":"string"},{"name":"_str2","type":"string"}],"name":"log","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_str","type":"string"}],"name":"asciiStrLength","outputs":[{"name":"_length","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"clearLog","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"getSender","outputs":[{"name":"_ret","type":"string"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"getOwner","outputs":[{"name":"_ret","type":"string"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"getLog","outputs":[{"name":"_ret","type":"string"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_str","type":"string"},{"name":"_ui","type":"uint256"}],"name":"log","outputs":[],"payable":false,"type":"function"}],
    "unlinked_binary": "606060405260006002555b336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506011600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505b5b611a018061009d6000396000f300606060405236156100c3576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063180db1b4146100c8578063319af333146100f15780633ca6268e1461016d5780633ffbd47f146101d357806341304fac1461027357806341c0e1b5146102d05780634b5c4277146102e557806355418e90146103855780635c50745e146103f65780635e01eb5a1461040b578063893d20e81461049a578063909e4ab614610529578063b60e72cc146105b8575b600080fd5b34156100d357600080fd5b6100db61061e565b6040518082815260200191505060405180910390f35b34156100fc57600080fd5b61016b600480803590602001908201803590602001908080601f0160208091040260200160405190810160405280939291908181526020018383808284378201915050505050509190803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610629565b005b341561017857600080fd5b6101d1600480803590602001908201803590602001908080601f01602080910402602001604051908101604052809392919081815260200183838082843782019150505050505091908035906020019091905050610748565b005b34156101de57600080fd5b610271600480803590602001908201803590602001908080601f0160208091040260200160405190810160405280939291908181526020018383808284378201915050505050509190803590602001908201803590602001908080601f01602080910402602001604051908101604052809392919081815260200183838082843782019150505050505091905050610851565b005b341561027e57600080fd5b6102ce600480803590602001908201803590602001908080601f016020809104026020016040519081016040528093929190818152602001838380828437820191505050505050919050506109ce565b005b34156102db57600080fd5b6102e3610acc565b005b34156102f057600080fd5b610383600480803590602001908201803590602001908080601f0160208091040260200160405190810160405280939291908181526020018383808284378201915050505050509190803590602001908201803590602001908080601f01602080910402602001604051908101604052809392919081815260200183838082843782019150505050505091905050610bc3565b005b341561039057600080fd5b6103e0600480803590602001908201803590602001908080601f01602080910402602001604051908101604052809392919081815260200183838082843782019150505050505091905050610cc4565b6040518082815260200191505060405180910390f35b341561040157600080fd5b610409610cd0565b005b341561041657600080fd5b61041e610cfa565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561045f5780820151818401525b602081019050610443565b50505050905090810190601f16801561048c5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b34156104a557600080fd5b6104ad610d27565b6040518080602001828103825283818151815260200191508051906020019080838360005b838110156104ee5780820151818401525b6020810190506104d2565b50505050905090810190601f16801561051b5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b341561053457600080fd5b61053c610d75565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561057d5780820151818401525b602081019050610561565b50505050905090810190601f1680156105aa5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b34156105c357600080fd5b61061c600480803590602001908201803590602001908080601f01602080910402602001604051908101604052809392919081815260200183838082843782019150505050505091908035906020019091905050610e1e565b005b600060025490505b90565b61072d8261064c8373ffffffffffffffffffffffffffffffffffffffff16610f27565b6040805190810160405280600381526020017f207c20000000000000000000000000000000000000000000000000000000000081525060038054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156107185780601f106106ed57610100808354040283529160200191610718565b820191906000526020600020905b8154815290600101906020018083116106fb57829003601f168201915b5050505050611134909392919063ffffffff16565b60039080519060200190610742929190611908565b505b5050565b61083682610755836111f2565b6040805190810160405280600381526020017f207c20000000000000000000000000000000000000000000000000000000000081525060038054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156108215780601f106107f657610100808354040283529160200191610821565b820191906000526020600020905b81548152906001019060200180831161080457829003601f168201915b5050505050611134909392919063ffffffff16565b6003908051906020019061084b929190611908565b505b5050565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16633ffbd47f83836040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808060200180602001838103835285818151815260200191508051906020019080838360005b838110156109015780820151818401525b6020810190506108e5565b50505050905090810190601f16801561092e5780820380516001836020036101000a031916815260200191505b50838103825284818151815260200191508051906020019080838360005b838110156109685780820151818401525b60208101905061094c565b50505050905090810190601f1680156109955780820380516001836020036101000a031916815260200191505b50945050505050600060405180830381600087803b15156109b557600080fd5b6102c65a03f115156109c657600080fd5b5050505b5050565b610ab2816040805190810160405280600381526020017f207c20000000000000000000000000000000000000000000000000000000000081525060038054600181600116156101000203166002900480601f016020809104026020016040519081016040528092919081815260200182805460018160011615610100020316600290048015610a9e5780601f10610a7357610100808354040283529160200191610a9e565b820191906000526020600020905b815481529060010190602001808311610a8157829003601f168201915b50505050506113cd9092919063ffffffff16565b60039080519060200190610ac7929190611908565b505b50565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141515610b2757610bc1565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166326d7b3b46040518163ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401600060405180830381600087803b1515610bac57600080fd5b6102c65a03f11515610bbd57600080fd5b5050505b565b610ca982826040805190810160405280600381526020017f207c20000000000000000000000000000000000000000000000000000000000081525060038054600181600116156101000203166002900480601f016020809104026020016040519081016040528092919081815260200182805460018160011615610100020316600290048015610c945780601f10610c6957610100808354040283529160200191610c94565b820191906000526020600020905b815481529060010190602001808311610c7757829003601f168201915b5050505050611134909392919063ffffffff16565b60039080519060200190610cbe929190611908565b505b5050565b6000815190505b919050565b602060405190810160405280600081525060039080519060200190610cf6929190611908565b505b565b610d02611988565b610d213373ffffffffffffffffffffffffffffffffffffffff1661146b565b90505b90565b610d2f611988565b610d6f6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1661146b565b90505b90565b610d7d611988565b60038054600181600116156101000203166002900480601f016020809104026020016040519081016040528092919081815260200182805460018160011615610100020316600290048015610e135780601f10610de857610100808354040283529160200191610e13565b820191906000526020600020905b815481529060010190602001808311610df657829003601f168201915b505050505090505b90565b610f0c82610e2b8361167b565b6040805190810160405280600381526020017f207c20000000000000000000000000000000000000000000000000000000000081525060038054600181600116156101000203166002900480601f016020809104026020016040519081016040528092919081815260200182805460018160011615610100020316600290048015610ef75780601f10610ecc57610100808354040283529160200191610ef7565b820191906000526020600020905b815481529060010190602001808311610eda57829003601f168201915b5050505050611134909392919063ffffffff16565b60039080519060200190610f21929190611908565b505b5050565b610f2f611988565b600080602a604051805910610f415750595b908082528060200260200182016040525b5092507f3000000000000000000000000000000000000000000000000000000000000000836000815181101515610f8557fe5b9060200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a9053507f7800000000000000000000000000000000000000000000000000000000000000836001815181101515610fe557fe5b9060200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a905350602991505b60028260ff1610151561112c57600f8416905060108481151561103957fe5b049350600a8160ff1610156110b457603081017f010000000000000000000000000000000000000000000000000000000000000002838360ff1681518110151561107f57fe5b9060200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a90535061111f565b6061600a8203017f010000000000000000000000000000000000000000000000000000000000000002838360ff168151811015156110ee57fe5b9060200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a9053505b5b8160019003915061101a565b5b5050919050565b61113c611988565b600080600080600080875189518b518d5101010160405180591061115d5750595b908082528060200260200182016040525b50965060208b01955060208a019450602089019350602088019250602087019150600090506111a1818301878d516117c6565b8a51810190506111b5818301868c516117c6565b8951810190506111c9818301858b516117c6565b8851810190506111dd818301848a516117c6565b8751810190505b505050505050949350505050565b6111fa611988565b600080600080600080871415611247576040805190810160405280600181526020017f300000000000000000000000000000000000000000000000000000000000000081525095506113c3565b8694506001935060009250600087121561126e578660000394506000935082806001019350505b8491505b600082111561129757600a8281151561128757fe5b0491508280600101935050611272565b8260ff166040518059106112a85750595b908082528060200260200182016040525b509550831515611324577f2d000000000000000000000000000000000000000000000000000000000000008660008151811015156112f357fe5b9060200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a9053505b6001830390505b60008511156113c2576030600a8681151561134257fe5b06017f01000000000000000000000000000000000000000000000000000000000000000286828060019003935060ff1681518110151561137e57fe5b9060200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a905350600a858115156113ba57fe5b04945061132b565b5b5050505050919050565b6113d5611988565b6000806000806000865188518a5101016040518059106113f25750595b908082528060200260200182016040525b50955060208901945060208801935060208701925060208601915060009050611430818301868b516117c6565b885181019050611444818301858a516117c6565b8751810190506114588183018489516117c6565b8651810190505b50505050509392505050565b611473611988565b61147b61199c565b60008060008060286040518059106114905750595b908082528060200260200182016040525b509450600093505b601484101561166d578360130360080260020a8773ffffffffffffffffffffffffffffffffffffffff168115156114dc57fe5b047f01000000000000000000000000000000000000000000000000000000000000000292506010837f0100000000000000000000000000000000000000000000000000000000000000900460ff1681151561153357fe5b047f0100000000000000000000000000000000000000000000000000000000000000029150817f01000000000000000000000000000000000000000000000000000000000000009004601002837f01000000000000000000000000000000000000000000000000000000000000009004037f01000000000000000000000000000000000000000000000000000000000000000290506115d182611813565b85856002028151811015156115e257fe5b9060200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a90535061161b81611813565b856001866002020181518110151561162f57fe5b9060200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a9053505b83806001019450506114a9565b8495505b5050505050919050565b611683611988565b6000806000808514156116cd576040805190810160405280600181526020017f300000000000000000000000000000000000000000000000000000000000000081525093506117be565b600092508491505b60008211156116fa57600a828115156116ea57fe5b04915082806001019350506116d5565b8260ff1660405180591061170b5750595b908082528060200260200182016040525b5093506001830390505b60008511156117bd576030600a8681151561173d57fe5b06017f01000000000000000000000000000000000000000000000000000000000000000284828060019003935060ff1681518110151561177957fe5b9060200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a905350600a858115156117b557fe5b049450611726565b5b505050919050565b60005b6020821015156117ef57825184526020840193506020830192505b6020820391506117c9565b6001826020036101000a039050801983511681855116818117865250505b50505050565b6000600a7f010000000000000000000000000000000000000000000000000000000000000002827effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff191610156118b2576030827f01000000000000000000000000000000000000000000000000000000000000009004017f0100000000000000000000000000000000000000000000000000000000000000029050611903565b6057827f01000000000000000000000000000000000000000000000000000000000000009004017f0100000000000000000000000000000000000000000000000000000000000000029050611903565b5b919050565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061194957805160ff1916838001178555611977565b82800160010185558215611977579182015b8281111561197657825182559160200191906001019061195b565b5b50905061198491906119b0565b5090565b602060405190810160405280600081525090565b602060405190810160405280600081525090565b6119d291905b808211156119ce5760008160009055506001016119b6565b5090565b905600a165627a7a72305820dae80f071a131b8200e781178f39c916055d077d6b24a1c9108f0db6c55672e40029",
    "events": {},
    "updated_at": 1505462587000,
    "links": {},
    "address": ""
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

  Contract.contract_name   = Contract.prototype.contract_name   = "Request";
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
    window.Request = Contract;
  }
})();
