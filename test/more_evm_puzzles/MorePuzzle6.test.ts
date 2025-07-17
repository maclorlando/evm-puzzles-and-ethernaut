import { ethers } from "hardhat";
import { expect } from "chai";

describe("More EVM Puzzle 6", function () {
  it("Should solve More EVM Puzzle 6", async function () {
    const [player] = await ethers.getSigners();

    const deploymentBytecode =
      "0x6026600a60003960266000f37ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff03401600114602a57fd5b00";

    const tx = await player.sendTransaction({
      data: deploymentBytecode,
    });
    const receipt = await tx.wait();
    const contractAddress = receipt?.contractAddress;
    console.log(`Puzzle deployed at: ${contractAddress}`);

    const solveTx = await player.sendTransaction({
      to: contractAddress,
      value: 1n, // Any nonzero msg.value
    });
    await solveTx.wait();

    console.log("Puzzle solved");
  });
});
