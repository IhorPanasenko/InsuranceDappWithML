const UserInsurances = artifacts.require("InsuranceContract");

module.exports = function (deployer) {
  deployer.deploy(UserInsurances);
};