// contracts/UserInsurances.sol
// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract UserInsurances {
    struct Insurance {
        uint256 policyNumber;
        uint256 insuranceCompanyId;
        uint256 insuranceCategoryId;
        uint256 duration;
        uint256 premiumAmount;
        uint256 coverageAmount;
        bool isExpired;
    }

    mapping(address => Insurance[]) private userInsurances;

    function addInsurance(
        uint256 policyNumber,
        uint256 insuranceCompanyId,
        uint256 insuranceCategoryId,
        uint256 duration,
        uint256 premiumAmount,
        uint256 coverageAmount
    ) external {
        Insurance memory newInsurance = Insurance({
            policyNumber: policyNumber,
            insuranceCompanyId: insuranceCompanyId,
            insuranceCategoryId: insuranceCategoryId,
            duration: duration,
            premiumAmount: premiumAmount,
            coverageAmount: coverageAmount,
            isExpired: false
        });

        userInsurances[msg.sender].push(newInsurance);
    }

    function getUserInsurances() external view returns (Insurance[] memory) {
        return userInsurances[msg.sender];
    }
}
