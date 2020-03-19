/* Imports */
var Web3 = require('web3');
var fs = require("fs");

/* inits */
var argv = process.argv;
var web3 = new Web3();


var abi = fs.readFileSync("./web-server/build/Incident.abi")
web3.setProvider(new web3.providers.HttpProvider('http://localhost:8545'));
console.log("setup-ed")


/* load and unlock contract */
var owner_account = "0x8cc5a1a0802db41db826c2fcb72423744338dcb0"
web3.eth.personal.unlockAccount(owner_account, "pass", 100000);
var contract_address = "0xbb85B721aaEdFeC6B47Ea2b7DbEcE57194481137"
//var contract_address = "0xfd95cD79F634b82DDA6f57822D9CB855Aa4F9497"
var contract = new web3.eth.Contract(JSON.parse(abi), contract_address)
console.log("unlocked")

/* accessor fns */
function call_contract(id, lat, lng, speed, heading, ts, verified, resolve){
  var ret = '';
  var a = contract.methods.setAccident(id, lat, lng, speed, heading, ts, 1).send({from: owner_account});
  a.then(function (e)
    {
      ret = e['transactionHash']; 
      //console.log("txn hash: ", ret);
      if (typeof resolve !== 'undefined')
        resolve(ret);
    });

  return a;
}

async function get_data(txn_id, resolve, reject){
  /*
   * @resolv and @reject are functions called upon resolve/reject of promise.  
   */


  // import and setup
  const abiDecoder = require('abi-decoder'); // NodeJS
  abiDecoder.addABI(JSON.parse(abi));

  web3.eth.getTransaction(txn_id).then(
    async function(e){
      var ret = await abiDecoder.decodeMethod(e.input)
      if (typeof resolve !== 'undefined')
        return resolve(ret);
      return ret;
      //return Promise.resolve(ret);
    },
    function(e) {
      console.log("> XXX failed", e)
    }
  );
}

async function test_one(resolve) {

  var entry = [ 
    { name: '_id', value: '42', type: 'string' },
    { name: '_lati', value: '121212', type: 'string' },
    { name: '_longi', value: '232323', type: 'string' },
    { name: '_speed', value: '4', type: 'string' },
    { name: '_heading', value: '20', type: 'string' },
    { name: '_timestamp', value: '12313131', type: 'string' },
    { name: '_verified', value: true, type: 'bool' } ]

  // helper to parse entry
  var ev = function(key) {
      return entry.filter(
        function(e) {
          if (e.name == key)
            return true
      })[0].value
    }

  var ret = ''
  // validate that what was sent is what is returned from BC
  var verify = await function (txn_id){
    return get_data(txn_id, function (e){
      var data = e['params'];
      ret = 
        data['_id'] == entry['_id'] &&
        data['_lati'] == entry['_lati'];
      //console.log('ret', ret, e['params']);
        if (typeof resolve !== 'undefined')
          return resolve(ret);
      return ret
    })
  }

  var txn_id = await call_contract(
                ev('_id'),
                ev('_lati'),
                ev('_longi'),
                ev('_speed'),
                ev('_heading'),
                ev('_timestamp'),
                ev('_verified'),
                verify);

  console.log("TXN:", txn_id);
  console.log("ret:", ret);


  return ret;
}
