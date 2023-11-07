// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Exercise_1 {
    mapping(address => uint256) private balances;

    modifier onlyUser() {
        require(balances[msg.sender] > 0, "Not authorized");
        _;
    }

    function deposit() external payable onlyUser {
        require(msg.value > 0, "Amount should be greater than 0");
        require(balances[msg.sender] + msg.value >= balances[msg.sender], "Integer overflow");
        balances[msg.sender] += msg.value;
    }

    function withdraw(uint256 amount) external onlyUser {
        require(amount > 0, "Amount should be greater than 0");
        require(amount <= balances[msg.sender], "Insufficient balance");
        balances[msg.sender] -= amount;
        payable(msg.sender).transfer(amount);
    }
}
