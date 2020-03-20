const Incident = artifacts.require("Incident");

module.exports = function(deployer) {
  deployer.deploy(Incident);
};

