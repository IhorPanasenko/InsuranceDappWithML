// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract InsuranceContract {
    struct Insurance {
        string policyId;
        uint256 duration;
        string category;
        uint256 price;
        uint256 coverageAmount;
        uint256 reservedAmount;
        string providerCompany;
        bool userPaid;
        bool companyPaid;
        bool isActive;
    }

    mapping(address => Insurance[]) private userInsurances;

    event InsuranceCreated(string policyId, address userAddress);
    event InsurancePaid(string policyId, address payer, uint256 amount);
    event InsuranceActivated(string policyId);
    event ReservedFundsWithdrawn(
        string policyId,
        address userAddress,
        uint256 amount
    );

    function createInsurance(
        string memory _policyId,
        uint256 _duration,
        string memory _category,
        uint256 _price,
        uint256 _coverageAmount,
        string memory _providerCompany
    ) external {
        Insurance memory newInsurance = Insurance({
            policyId: _policyId,
            duration: _duration,
            category: _category,
            price: _price,
            coverageAmount: _coverageAmount,
            reservedAmount: _coverageAmount, // Simulating that the company already paid
            providerCompany: _providerCompany,
            userPaid: false,
            companyPaid: true, // Simulating that the company has already paid
            isActive: false
        });

        userInsurances[msg.sender].push(newInsurance);

        emit InsuranceCreated(_policyId, msg.sender);
    }

    function payForInsurance(string memory policyId) external payable {
        Insurance storage insurance = getCurrentInsurance(policyId);

        require(insurance.isActive == false, "Insurance is already active");
        require(insurance.userPaid == false, "User has already paid");
        require(msg.value == insurance.price, "Incorrect payment amount");

        payable(msg.sender).transfer(msg.value);

        insurance.userPaid = true;
        emit InsurancePaid(insurance.policyId, msg.sender, msg.value);

        // Activate the insurance if both the user and the company have paid
        if (insurance.userPaid && insurance.companyPaid) {
            insurance.isActive = true;
            emit InsuranceActivated(insurance.policyId);
        }
    }

    function companyPayInsurance(string memory _policyId) external payable {
        Insurance storage insurance = getCurrentInsurance(_policyId);

        require(insurance.isActive == false, "Insurance is already active");
        require(insurance.companyPaid == false, "Company has already paid");
        require(
            msg.value == insurance.coverageAmount,
            "Incorrect payment amount"
        );

        insurance.companyPaid = true;
        insurance.reservedAmount = msg.value;

        emit InsurancePaid(insurance.policyId, msg.sender, msg.value);

        // Activate the insurance if both the user and the company have paid
        if (insurance.userPaid && insurance.companyPaid) {
            insurance.isActive = true;
            emit InsuranceActivated(insurance.policyId);
        }
    }

    function withdrawReservedAmount(
        string memory policyId,
        uint256 withdrawAmount
    ) external {
        Insurance storage insurance = getCurrentInsurance(policyId);

        require(insurance.isActive == true, "Insurance is not active");
        require(insurance.userPaid, "User has not paid");
        require(insurance.companyPaid, "Company has not paid");
        require(withdrawAmount > 0, "Imposible withdraw negative number");
        require(
            withdrawAmount < insurance.coverageAmount,
            "You can't withdraw more than you have by contract"
        );

        // Transfer reserved funds to the user
        payable(msg.sender).transfer(withdrawAmount);
        insurance.reservedAmount = insurance.reservedAmount - withdrawAmount;

        emit ReservedFundsWithdrawn(
            insurance.policyId,
            msg.sender,
            withdrawAmount
        );
    }

    function getCurrentInsurance(
        string memory policyId
    ) internal view returns (Insurance storage) {
        for (uint256 i = 0; i < userInsurances[msg.sender].length; i++) {
            if (
                keccak256(
                    abi.encodePacked(userInsurances[msg.sender][i].policyId)
                ) == keccak256(abi.encodePacked(policyId))
            ) {
                return userInsurances[msg.sender][i];
            }
        }

        revert("Insurance not found");
    }

    function getCurrentInsuranceId() internal view returns (string memory) {
        require(
            userInsurances[msg.sender].length > 0,
            "No insurance policies found"
        );
        return
            userInsurances[msg.sender][userInsurances[msg.sender].length - 1]
                .policyId;
    }

    function getUserInsuranceCount() external view returns (uint256) {
        return userInsurances[msg.sender].length;
    }

    function getUserInsuranceDetails(
        string memory policyId
    )
        external
        view
        returns (
            uint256,
            string memory,
            uint256,
            uint256,
            string memory,
            bool,
            bool,
            bool
        )
    {
        Insurance storage insurance = getCurrentInsurance(policyId);
        return (
            insurance.duration,
            insurance.category,
            insurance.price,
            insurance.coverageAmount,
            insurance.providerCompany,
            insurance.userPaid,
            insurance.companyPaid,
            insurance.isActive
        );
    }

    function getUserInsurances() external view returns (Insurance[] memory) {
        uint256 userInsuranceCount = userInsurances[msg.sender].length;
        Insurance[] memory insurances = new Insurance[](userInsuranceCount);

        for (uint256 i = 0; i < userInsuranceCount; i++) {
            Insurance storage insurance = userInsurances[msg.sender][i];

            insurances[i] = Insurance({
                policyId: insurance.policyId,
                duration: insurance.duration,
                category: insurance.category,
                price: insurance.price,
                coverageAmount: insurance.coverageAmount,
                reservedAmount: insurance.reservedAmount,
                providerCompany: insurance.providerCompany,
                userPaid: insurance.userPaid,
                companyPaid: insurance.companyPaid,
                isActive: insurance.isActive
            });
        }

        return insurances;
    }

    function getReservedAmount(
        string memory policyId
    ) external view returns (uint256) {
        Insurance storage insurance = getCurrentInsurance(policyId);
        return insurance.reservedAmount;
    }
}
