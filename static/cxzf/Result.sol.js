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
      throw new Error("Result error: Please call setProvider() first before calling new().");
    }

    var args = Array.prototype.slice.call(arguments);

    if (!this.unlinked_binary) {
      throw new Error("Result error: contract binary not set. Can't deploy new instance.");
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

      throw new Error("Result contains unresolved libraries. You must deploy and link the following libraries before you can deploy a new version of Result: " + unlinked_libraries);
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
      throw new Error("Invalid address passed to Result.at(): " + address);
    }

    var contract_class = this.web3.eth.contract(this.abi);
    var contract = contract_class.at(address);

    return new this(contract);
  };

  Contract.deployed = function() {
    if (!this.address) {
      throw new Error("Cannot find deployed address: Result not deployed or address not set.");
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
    "abi": [{"constant":true,"inputs":[],"name":"getErrno","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_str","type":"string"},{"name":"_addr","type":"address"}],"name":"log","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_str","type":"string"},{"name":"_i","type":"int256"}],"name":"log","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_name","type":"string"},{"name":"_version","type":"string"}],"name":"register","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_str","type":"string"}],"name":"log","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"kill","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_str","type":"string"},{"name":"_str2","type":"string"}],"name":"log","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"clearLog","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"getSender","outputs":[{"name":"_ret","type":"string"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"getOwner","outputs":[{"name":"_ret","type":"string"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"getLog","outputs":[{"name":"_ret","type":"string"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_str","type":"string"},{"name":"_ui","type":"uint256"}],"name":"log","outputs":[],"payable":false,"type":"function"},{"inputs":[],"payable":false,"type":"constructor"}],
    "unlinked_binary": "60606040526000600255341561001457600080fd5b5b5b336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506011600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16633ffbd47f6040518163ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808060200180602001838103835260068152602001807f526573756c740000000000000000000000000000000000000000000000000000815250602001838103825260078152602001807f302e302e312e300000000000000000000000000000000000000000000000000081525060200192505050600060405180830381600087803b151561019357600080fd5b6102c65a03f115156101a457600080fd5b5050505b5b611979806101b86000396000f300606060405236156100b8576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063180db1b4146100bd578063319af333146100e65780633ca6268e146101625780633ffbd47f146101c857806341304fac1461026857806341c0e1b5146102c55780634b5c4277146102da5780635c50745e1461037a5780635e01eb5a1461038f578063893d20e81461041e578063909e4ab6146104ad578063b60e72cc1461053c575b600080fd5b34156100c857600080fd5b6100d06105a2565b6040518082815260200191505060405180910390f35b34156100f157600080fd5b610160600480803590602001908201803590602001908080601f0160208091040260200160405190810160405280939291908181526020018383808284378201915050505050509190803573ffffffffffffffffffffffffffffffffffffffff169060200190919050506105ad565b005b341561016d57600080fd5b6101c6600480803590602001908201803590602001908080601f016020809104026020016040519081016040528093929190818152602001838380828437820191505050505050919080359060200190919050506106cc565b005b34156101d357600080fd5b610266600480803590602001908201803590602001908080601f0160208091040260200160405190810160405280939291908181526020018383808284378201915050505050509190803590602001908201803590602001908080601f016020809104026020016040519081016040528093929190818152602001838380828437820191505050505050919050506107d5565b005b341561027357600080fd5b6102c3600480803590602001908201803590602001908080601f01602080910402602001604051908101604052809392919081815260200183838082843782019150505050505091905050610952565b005b34156102d057600080fd5b6102d8610a50565b005b34156102e557600080fd5b610378600480803590602001908201803590602001908080601f0160208091040260200160405190810160405280939291908181526020018383808284378201915050505050509190803590602001908201803590602001908080601f01602080910402602001604051908101604052809392919081815260200183838082843782019150505050505091905050610b47565b005b341561038557600080fd5b61038d610c48565b005b341561039a57600080fd5b6103a2610c72565b6040518080602001828103825283818151815260200191508051906020019080838360005b838110156103e35780820151818401525b6020810190506103c7565b50505050905090810190601f1680156104105780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b341561042957600080fd5b610431610c9f565b6040518080602001828103825283818151815260200191508051906020019080838360005b838110156104725780820151818401525b602081019050610456565b50505050905090810190601f16801561049f5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b34156104b857600080fd5b6104c0610ced565b6040518080602001828103825283818151815260200191508051906020019080838360005b838110156105015780820151818401525b6020810190506104e5565b50505050905090810190601f16801561052e5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b341561054757600080fd5b6105a0600480803590602001908201803590602001908080601f01602080910402602001604051908101604052809392919081815260200183838082843782019150505050505091908035906020019091905050610d96565b005b600060025490505b90565b6106b1826105d08373ffffffffffffffffffffffffffffffffffffffff16610e9f565b6040805190810160405280600381526020017f207c20000000000000000000000000000000000000000000000000000000000081525060038054600181600116156101000203166002900480601f01602080910402602001604051908101604052809291908181526020018280546001816001161561010002031660029004801561069c5780601f106106715761010080835404028352916020019161069c565b820191906000526020600020905b81548152906001019060200180831161067f57829003601f168201915b50505050506110ac909392919063ffffffff16565b600390805190602001906106c6929190611880565b505b5050565b6107ba826106d98361116a565b6040805190810160405280600381526020017f207c20000000000000000000000000000000000000000000000000000000000081525060038054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156107a55780601f1061077a576101008083540402835291602001916107a5565b820191906000526020600020905b81548152906001019060200180831161078857829003601f168201915b50505050506110ac909392919063ffffffff16565b600390805190602001906107cf929190611880565b505b5050565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16633ffbd47f83836040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808060200180602001838103835285818151815260200191508051906020019080838360005b838110156108855780820151818401525b602081019050610869565b50505050905090810190601f1680156108b25780820380516001836020036101000a031916815260200191505b50838103825284818151815260200191508051906020019080838360005b838110156108ec5780820151818401525b6020810190506108d0565b50505050905090810190601f1680156109195780820380516001836020036101000a031916815260200191505b50945050505050600060405180830381600087803b151561093957600080fd5b6102c65a03f1151561094a57600080fd5b5050505b5050565b610a36816040805190810160405280600381526020017f207c20000000000000000000000000000000000000000000000000000000000081525060038054600181600116156101000203166002900480601f016020809104026020016040519081016040528092919081815260200182805460018160011615610100020316600290048015610a225780601f106109f757610100808354040283529160200191610a22565b820191906000526020600020905b815481529060010190602001808311610a0557829003601f168201915b50505050506113459092919063ffffffff16565b60039080519060200190610a4b929190611880565b505b50565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141515610aab57610b45565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166326d7b3b46040518163ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401600060405180830381600087803b1515610b3057600080fd5b6102c65a03f11515610b4157600080fd5b5050505b565b610c2d82826040805190810160405280600381526020017f207c20000000000000000000000000000000000000000000000000000000000081525060038054600181600116156101000203166002900480601f016020809104026020016040519081016040528092919081815260200182805460018160011615610100020316600290048015610c185780601f10610bed57610100808354040283529160200191610c18565b820191906000526020600020905b815481529060010190602001808311610bfb57829003601f168201915b50505050506110ac909392919063ffffffff16565b60039080519060200190610c42929190611880565b505b5050565b602060405190810160405280600081525060039080519060200190610c6e929190611880565b505b565b610c7a611900565b610c993373ffffffffffffffffffffffffffffffffffffffff166113e3565b90505b90565b610ca7611900565b610ce76000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166113e3565b90505b90565b610cf5611900565b60038054600181600116156101000203166002900480601f016020809104026020016040519081016040528092919081815260200182805460018160011615610100020316600290048015610d8b5780601f10610d6057610100808354040283529160200191610d8b565b820191906000526020600020905b815481529060010190602001808311610d6e57829003601f168201915b505050505090505b90565b610e8482610da3836115f3565b6040805190810160405280600381526020017f207c20000000000000000000000000000000000000000000000000000000000081525060038054600181600116156101000203166002900480601f016020809104026020016040519081016040528092919081815260200182805460018160011615610100020316600290048015610e6f5780601f10610e4457610100808354040283529160200191610e6f565b820191906000526020600020905b815481529060010190602001808311610e5257829003601f168201915b50505050506110ac909392919063ffffffff16565b60039080519060200190610e99929190611880565b505b5050565b610ea7611900565b600080602a604051805910610eb95750595b908082528060200260200182016040525b5092507f3000000000000000000000000000000000000000000000000000000000000000836000815181101515610efd57fe5b9060200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a9053507f7800000000000000000000000000000000000000000000000000000000000000836001815181101515610f5d57fe5b9060200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a905350602991505b60028260ff161015156110a457600f84169050601084811515610fb157fe5b049350600a8160ff16101561102c57603081017f010000000000000000000000000000000000000000000000000000000000000002838360ff16815181101515610ff757fe5b9060200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a905350611097565b6061600a8203017f010000000000000000000000000000000000000000000000000000000000000002838360ff1681518110151561106657fe5b9060200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a9053505b5b81600190039150610f92565b5b5050919050565b6110b4611900565b600080600080600080875189518b518d510101016040518059106110d55750595b908082528060200260200182016040525b50965060208b01955060208a01945060208901935060208801925060208701915060009050611119818301878d5161173e565b8a518101905061112d818301868c5161173e565b895181019050611141818301858b5161173e565b885181019050611155818301848a5161173e565b8751810190505b505050505050949350505050565b611172611900565b6000806000806000808714156111bf576040805190810160405280600181526020017f3000000000000000000000000000000000000000000000000000000000000000815250955061133b565b869450600193506000925060008712156111e6578660000394506000935082806001019350505b8491505b600082111561120f57600a828115156111ff57fe5b04915082806001019350506111ea565b8260ff166040518059106112205750595b908082528060200260200182016040525b50955083151561129c577f2d0000000000000000000000000000000000000000000000000000000000000086600081518110151561126b57fe5b9060200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a9053505b6001830390505b600085111561133a576030600a868115156112ba57fe5b06017f01000000000000000000000000000000000000000000000000000000000000000286828060019003935060ff168151811015156112f657fe5b9060200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a905350600a8581151561133257fe5b0494506112a3565b5b5050505050919050565b61134d611900565b6000806000806000865188518a51010160405180591061136a5750595b908082528060200260200182016040525b509550602089019450602088019350602087019250602086019150600090506113a8818301868b5161173e565b8851810190506113bc818301858a5161173e565b8751810190506113d081830184895161173e565b8651810190505b50505050509392505050565b6113eb611900565b6113f3611914565b60008060008060286040518059106114085750595b908082528060200260200182016040525b509450600093505b60148410156115e5578360130360080260020a8773ffffffffffffffffffffffffffffffffffffffff1681151561145457fe5b047f01000000000000000000000000000000000000000000000000000000000000000292506010837f0100000000000000000000000000000000000000000000000000000000000000900460ff168115156114ab57fe5b047f0100000000000000000000000000000000000000000000000000000000000000029150817f01000000000000000000000000000000000000000000000000000000000000009004601002837f01000000000000000000000000000000000000000000000000000000000000009004037f01000000000000000000000000000000000000000000000000000000000000000290506115498261178b565b858560020281518110151561155a57fe5b9060200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a9053506115938161178b565b85600186600202018151811015156115a757fe5b9060200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a9053505b8380600101945050611421565b8495505b5050505050919050565b6115fb611900565b600080600080851415611645576040805190810160405280600181526020017f30000000000000000000000000000000000000000000000000000000000000008152509350611736565b600092508491505b600082111561167257600a8281151561166257fe5b049150828060010193505061164d565b8260ff166040518059106116835750595b908082528060200260200182016040525b5093506001830390505b6000851115611735576030600a868115156116b557fe5b06017f01000000000000000000000000000000000000000000000000000000000000000284828060019003935060ff168151811015156116f157fe5b9060200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a905350600a8581151561172d57fe5b04945061169e565b5b505050919050565b60005b60208210151561176757825184526020840193506020830192505b602082039150611741565b6001826020036101000a039050801983511681855116818117865250505b50505050565b6000600a7f010000000000000000000000000000000000000000000000000000000000000002827effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916101561182a576030827f01000000000000000000000000000000000000000000000000000000000000009004017f010000000000000000000000000000000000000000000000000000000000000002905061187b565b6057827f01000000000000000000000000000000000000000000000000000000000000009004017f010000000000000000000000000000000000000000000000000000000000000002905061187b565b5b919050565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106118c157805160ff19168380011785556118ef565b828001600101855582156118ef579182015b828111156118ee5782518255916020019190600101906118d3565b5b5090506118fc9190611928565b5090565b602060405190810160405280600081525090565b602060405190810160405280600081525090565b61194a91905b8082111561194657600081600090555060010161192e565b5090565b905600a165627a7a7230582098f79e73a56159683a3737c04003f640504b6e3d5705944881a4438ba9f49fe20029",
    "events": {},
    "updated_at": 1505462588000,
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

  Contract.contract_name   = Contract.prototype.contract_name   = "Result";
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
    window.Result = Contract;
  }
})();
