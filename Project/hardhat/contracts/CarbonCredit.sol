// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract CarbonCredit is ERC20 {
    mapping(address => uint256) public lastMined;
    uint256 public constant MINE_REWARD = 100 * 10 ** 18;
    uint256 public constant MINING_INTERVAL = 15 days;

    constructor() ERC20("CarbonCredit", "CC") {}
    //     constructor(uint256 initialSupply) ERC20("Carbon Credit", "CO2") {
    //     _mint(msg.sender, initialSupply * (10 ** decimals()));
    // }

    // assing the carboncredit to the wallet calling this function
    function mine() public returns (bool) {
        require(
            block.timestamp >= lastMined[msg.sender] + MINING_INTERVAL,
            "Mining cooldown active"
        );
        lastMined[msg.sender] = block.timestamp;
        _mint(msg.sender, MINE_REWARD);
        return true;
    }
}

// ERC20 functions explained:
// totalSupply(): Returns the total amount of tokens in circulation.
// balanceOf(address account): Returns the token balance of an account.
// transfer(address recipient, uint256 amount): Moves tokens from the caller's account to the recipient. It internally calls _transfer which updates balances and emits a Transfer event.
// approve(address spender, uint256 amount): Sets an allowance, enabling the spender to withdraw from the caller’s account up to the designated amount. This calls _approve internally.
// allowance(address owner, address spender): Returns the remaining number of tokens that the spender is allowed to withdraw from the owner.
// transferFrom(address sender, address recipient, uint256 amount): Allows a spender to transfer tokens from one account to another, using the allowance mechanism. It reduces the allowance accordingly.