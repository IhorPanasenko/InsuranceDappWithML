// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract JointInsurance {
    address public user1;
    address public user2;

    uint256 public totalFunds;
    uint256 public startTime;
    uint256 public endTime;
    bool public isExpired;

    modifier onlyParticipants() {
        require(msg.sender == user1 || msg.sender == user2, "Not a participant");
        _;
    }

    modifier onlyBeforeExpiration() {
        require(!isExpired && block.timestamp < endTime, "Contract expired");
        _;
    }

    modifier onlyAfterExpiration() {
        require(isExpired || block.timestamp >= endTime, "Contract not expired");
        _;
    }

    event FundsDeposited(address indexed participant, uint256 amount);
    event ContractExpired();
    event Payout(address indexed recipient, uint256 amount);

    constructor(address _user1, address _user2, uint256 _durationInDays) {
        require(_user1 != address(0) && _user2 != address(0), "Invalid user address");
        require(_user1 != _user2, "Users must be different");
        
        user1 = _user1;
        user2 = _user2;
        totalFunds = 0;
        startTime = block.timestamp;
        endTime = startTime + (_durationInDays * 1 days);
        isExpired = false;
    }

    function depositFunds() external payable onlyParticipants onlyBeforeExpiration {
        require(msg.value > 0, "Amount must be greater than zero");
        totalFunds += msg.value;
        emit FundsDeposited(msg.sender, msg.value);
    }

    function expireContract() external onlyParticipants onlyAfterExpiration {
        require(!isExpired, "Contract already expired");
        isExpired = true;
        emit ContractExpired();
        // Perform actions based on expiration rules
        // For example, trigger a payout function
        payout();
    }

    function payout() internal {
        require(isExpired, "Contract must be expired to trigger payout");
        uint256 payoutAmount = totalFunds / 2; // Split the funds equally between participants
        require(payoutAmount > 0, "No funds to distribute");
        
        // Transfer funds to participants
        payable(user1).transfer(payoutAmount);
        payable(user2).transfer(payoutAmount);

        emit Payout(user1, payoutAmount);
        emit Payout(user2, payoutAmount);
    }

    // receive() external payable {
    //     // Accept direct transfers to the contract
    //     depositFunds();
    // }
}
