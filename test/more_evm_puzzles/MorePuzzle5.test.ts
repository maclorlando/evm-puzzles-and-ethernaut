import { ethers } from "hardhat";
import { expect } from "chai";

describe("More EVM Puzzle 5", function () {
  it("Should solve More EVM Puzzle 5", async function () {
    const [player] = await ethers.getSigners();

    const deploymentBytecode =
      "0x6026600a60003960266000f360203611600857fd5b366000600037365903600314601957fd5b00";

    const tx = await player.sendTransaction({
      data: deploymentBytecode,
    });
    const receipt = await tx.wait();
    const contractAddress = receipt?.contractAddress;
    console.log(`Puzzle deployed at: ${contractAddress}`);

    const solveTx = await player.sendTransaction({
      to: contractAddress,
      data: "0xabcdef", // 3 bytes
    });
    await solveTx.wait();

    console.log("Puzzle solved");
  });
});
