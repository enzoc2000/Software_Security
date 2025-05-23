import { expect } from "chai";
import { ethers } from "hardhat";
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { CarbonCredit } from "../typechain-types";

describe("CarbonCredit", function () {
  async function deployCarbonCreditFixture() {
    const [deployer, other] = await ethers.getSigners();
    // Using an initial supply of 1000 tokens
    const initialSupply = 1000;
    const CarbonCreditFactory = await ethers.getContractFactory("CarbonCredit");
    const carbonCredit = (await CarbonCreditFactory.deploy(initialSupply)) as CarbonCredit;
    await carbonCredit.deployed();//
    return { carbonCredit, deployer, other, initialSupply };
  }

  it("Should assign the total initial supply to the deployer", async function () {
    const { carbonCredit, deployer, initialSupply } = await loadFixture(deployCarbonCreditFixture);
    const decimals = await carbonCredit.decimals();
    const deployerBalance = await carbonCredit.balanceOf(deployer.address);
    const expectedSupply = ethers.parseUnits(initialSupply.toString(), decimals); //const expectedSupply = ethers.utils.parseUnits(initialSupply.toString(), decimals);
    expect(deployerBalance).to.equal(expectedSupply);
  });

  it("Should allow mining when the cooldown has passed", async function () {
    const { carbonCredit, deployer } = await loadFixture(deployCarbonCreditFixture);
    const initialBalance = await carbonCredit.balanceOf(deployer.address);
    const mineTx = await carbonCredit.mine();
    await mineTx.wait();

    const reward = await carbonCredit.MINE_REWARD();
    const newBalance = await carbonCredit.balanceOf(deployer.address);
    expect(newBalance).to.equal(initialBalance.add(reward));
  });

  it("Should revert mining if cooldown is active", async function () {
    const { carbonCredit } = await loadFixture(deployCarbonCreditFixture);
    await carbonCredit.mine();
    await expect(carbonCredit.mine()).to.be.revertedWith("Mining cooldown active");
  });

  it("Should allow mining after the mining interval has elapsed", async function () {
    const { carbonCredit, deployer, initialSupply } = await loadFixture(deployCarbonCreditFixture);
    const decimals = await carbonCredit.decimals();

    // Mine once
    let tx = await carbonCredit.mine();
    await tx.wait();
    const reward = await carbonCredit.MINE_REWARD();

    // Fast-forward EVM time by the MINING_INTERVAL
    const miningInterval = await carbonCredit.MINING_INTERVAL();
    await ethers.provider.send("evm_increaseTime", [miningInterval.toNumber()]);
    await ethers.provider.send("evm_mine", []);

    // Mine again
    tx = await carbonCredit.mine();
    await tx.wait();

    const expectedInitial = ethers.parseUnits(initialSupply.toString(), decimals); //const expectedInitial = ethers.utils.parseUnits(initialSupply.toString(), decimals);
    const deployerBalance = await carbonCredit.balanceOf(deployer.address);
    // Final balance should be initial supply plus two mining rewards
    expect(deployerBalance).to.equal(expectedInitial.add(reward.mul(2)));
  });
});