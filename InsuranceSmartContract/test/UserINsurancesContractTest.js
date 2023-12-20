const InsuranceContract = artifacts.require("InsuranceContract");

contract("InsuranceContract", (accounts) => {
  let insuranceContract;

  beforeEach(async () => {
    insuranceContract = await InsuranceContract.new();
  });

  it("should create an insurance policy", async () => {
    const policyId = "ABC123";
    const duration = 12;
    const category = "health";
    const price = 1000;
    const coverageAmount = 50000;
    const providerCompany = "InsuranceCo";

    await insuranceContract.createInsurance(
      policyId,
      duration,
      category,
      price,
      coverageAmount,
      providerCompany,
      { from: accounts[0] }
    );

    const userInsuranceCount = await insuranceContract.getUserInsuranceCount({
      from: accounts[0],
    });

    assert.equal(userInsuranceCount, 1, "User should have 1 insurance policy");

    const reservedAmount = await insuranceContract.getReservedAmount(policyId, {
      from: accounts[0],
    });

    assert.equal(
      reservedAmount,
      coverageAmount,
      "Reserved amount should match coverage amount"
    );
  });

  it("should pay for an insurance policy", async () => {
    const policyId = "ABC123";
    const duration = 12;
    const category = "health";
    const price = 1000;
    const coverageAmount = 50000;
    const providerCompany = "InsuranceCo";

    await insuranceContract.createInsurance(
      policyId,
      duration,
      category,
      price,
      coverageAmount,
      providerCompany,
      { from: accounts[0] }
    );

    await insuranceContract.payForInsurance(policyId, {
      from: accounts[0],
      value: price,
    });

    const userInsuranceDetails = await insuranceContract.getUserInsuranceDetails(
      policyId,
      { from: accounts[0] }
    );

    assert.equal(
      userInsuranceDetails[5], // index 5 corresponds to userPaid field
      true,
      "User should be marked as paid"
    );

    const reservedAmountAfterPayment = await insuranceContract.getReservedAmount(
      policyId,
      { from: accounts[0] }
    );
  });
});

  
//   it("should withdraw reserved funds", async () => {
//     const policyId = "ABC123";
//     const duration = 12;
//     const category = "health";
//     const price = 1000;
//     const coverageAmount = 50000;
//     const providerCompany = "InsuranceCo";

//     await insuranceContract.createInsurance(
//       policyId,
//       duration,
//       category,
//       price,
//       coverageAmount,
//       providerCompany,
//       { from: accounts[0] }
//     );

//     await insuranceContract.payForInsurance(policyId, {
//       from: accounts[0],
//       value: price,
//     });

//     await insuranceContract.companyPayInsurance(policyId, {
//       from: accounts[1],
//       value: coverageAmount,
//     });

//     const initialReservedAmount = await insuranceContract.getReservedAmount(
//       policyId,
//       { from: accounts[0] }
//     );

//     assert.equal(
//       initialReservedAmount,
//       coverageAmount - price,
//       "Initial reserved amount should be correct"
//     );

//     const withdrawAmount = 500;

//     await insuranceContract.withdrawReservedAmount(policyId, withdrawAmount, {
//       from: accounts[0],
//     });

//     const reservedAmountAfterWithdraw = await insuranceContract.getReservedAmount(
//       policyId,
//       { from: accounts[0] }
//     );

//     assert.equal(
//       reservedAmountAfterWithdraw,
//       initialReservedAmount - withdrawAmount,
//       "Reserved amount should be reduced after withdrawal"
//     );
//   });

//   it("should activate an insurance policy", async () => {
//     const policyId = "ABC123";
//     const duration = 12;
//     const category = "health";
//     const price = 1000;
//     const coverageAmount = 50000;
//     const providerCompany = "InsuranceCo";

//     await insuranceContract.createInsurance(
//       policyId,
//       duration,
//       category,
//       price,
//       coverageAmount,
//       providerCompany,
//       { from: accounts[0] }
//     );

//     await insuranceContract.payForInsurance(policyId, {
//       from: accounts[0],
//       value: price,
//     });

//     await insuranceContract.companyPayInsurance(policyId, {
//       from: accounts[1],
//       value: coverageAmount,
//     });

//     const userInsuranceDetailsBeforeActivation = await insuranceContract.getUserInsuranceDetails(
//       policyId,
//       { from: accounts[0] }
//     );

//     assert.equal(
//       userInsuranceDetailsBeforeActivation[7], // index 7 corresponds to isActive field
//       false,
//       "Insurance should not be active before activation"
//     );

//     await insuranceContract.withdrawReservedAmount(policyId, coverageAmount, {
//       from: accounts[0],
//     });

//     const userInsuranceDetailsAfterActivation = await insuranceContract.getUserInsuranceDetails(
//       policyId,
//       { from: accounts[0] }
//     );

//     assert.equal(
//       userInsuranceDetailsAfterActivation[7],
//       true,
//       "Insurance should be active after activation"
//     );
//   });
