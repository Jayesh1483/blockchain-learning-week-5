# blockchain-learning-week-5

### Exercise_1.sol

The contract includes a deposit and withdrawal functionality. The contract initially had vulnerabilities such as lack of access control, no input validation, and no protection against integer overflow or underflow. These vulnerabilities were addressed by implementing access controls, input validation, and proper checks for integer overflow/underflow.

### Exercise_2.sol

Exercise_2.sol is an advanced contract with multiple functions for depositing, withdrawing, adding balances, subtracting balances, and destroying the contract. Initially, the contract had vulnerabilities related to reentrancy attacks, arbitrary balance manipulation, and improper self-destruct usage. These vulnerabilities were mitigated by modifying the functions to handle Ether transactions securely and by adding proper input validation and authorization checks.

### VotingSystem.sol

VotingSystem.sol is a sophisticated smart contract that simulates a basic voting system. It allows voters to cast their votes for specific candidates and tracks the total votes received by each candidate. The contract includes features such as only allowing the contract owner to add or remove candidates, preventing double voting, and providing visibility into the voting results. The contract is designed to be secure and transparent, with robust checks to ensure the integrity of the voting process.

## Testing

The contracts have associated test scripts written using the Hardhat testing framework to ensure that the contracts function as intended and to identify any potential vulnerabilities. The test scripts cover various aspects of the contracts, including initialization, functionality, security checks, and access controls.
