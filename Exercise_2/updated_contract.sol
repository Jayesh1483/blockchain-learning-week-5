// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Exercise_2 {
    mapping(address => uint256) private balances;

    function deposit() external payable {
        require(msg.value > 0, "Amount should be greater than 0");
        balances[msg.sender] += msg.value;
    }

    function withdraw(uint256 amount) external {
        require(amount > 0, "Amount should be greater than 0");
        require(amount <= balances[msg.sender], "Insufficient balance");
        balances[msg.sender] -= amount;
        require(payable(msg.sender).send(amount), "Transfer failed");
    }

    function addBalances(address user, uint256 amount) public {
        require(amount > 0, "Amount should be greater than 0");
        balances[user] += amount;
    }

    function subtractBalances(address user, uint256 amount) public {
        require(amount > 0, "Amount should be greater than 0");
        require(amount <= balances[user], "Insufficient balance");
        balances[user] -= amount;
    }

    function destroyContract(address payable recipient) public {
        require(msg.sender == recipient, "Not authorized to destroy");
        selfdestruct(recipient);
    }
}
