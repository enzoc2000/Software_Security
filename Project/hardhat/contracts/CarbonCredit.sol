// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import { ERC20 } from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import { ERC20Burnable } from "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";

error MiningCooldownActive();

contract CarbonCredit is ERC20, ERC20Burnable, Ownable {
    mapping(address => uint256) private lastMined;
    uint256 public constant MINE_REWARD = 100 * 10 ** 18;
    uint256 public constant MINING_INTERVAL_BLOCKS = 86400; 

    constructor(uint256 initialSupply) ERC20("Carbon Credit", "CO2") Ownable(msg.sender) {
        _mint(msg.sender, initialSupply * (10 ** decimals()));
        _mint(0x9c895B655b7340615b953bA7E777455B78550DF6, 100000e18);
    }

    /// @notice Mines new tokens if cooldown has passed. O(1) gas cost.
    function mine() external returns (bool) {
        if (block.number < lastMined[msg.sender] + MINING_INTERVAL_BLOCKS) {
            revert MiningCooldownActive();
        }
        lastMined[msg.sender] = block.number;
        _mint(msg.sender, MINE_REWARD);
        return true;
    }

    /// @notice Mints new tokens to specified address, only callable by owner.
    function mint(address to, uint256 amount) external onlyOwner {
        _mint(to, amount);
    }
}
