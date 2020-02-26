function doTestTransfer(){

  // create new account
  var new_account = personal.newAccount("ann");
  
  // import key
  //var beaucoup_riche = personal.importRawKey("df504d175ae63abf209bad9dda965310d99559620550e74521a6798a41215f46", "pass")
  var beaucoup_riche = "0x8cc5a1a0802db41db826c2fcb72423744338dcb0"
  
  // unlock accounts
  personal.unlockAccount(new_account, "ann");
  personal.unlockAccount(beaucoup_riche, "pass");
  
  var txn = eth.sendTransaction({from: beaucoup_riche, to: new_account, value: web3.toWei(0.01, "ether")})
  console.log("transaction: " + txn);
}
