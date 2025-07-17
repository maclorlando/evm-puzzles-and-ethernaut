import { ethers } from "hardhat";
import { expect } from "chai";

describe("More EVM Puzzle 10", function () {
  it("Should solve More EVM Puzzle 10", async function () {
    const [player] = await ethers.getSigners();

    const deploymentBytecode =
      "0x605b600a600039605b6000f3602060006000376000517ff0f0f0f0f0f0f0f0f0f0f0f0f0f0f0f0f0f0f0f0f0f0f0f0f0f0f0f0f0f0f0f01660206020600037600051177fabababababababababababababababababababababababababababababababab14605d57fd5b00";

    const calldata =
      "0xa0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0" + // First 32 bytes
      "0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b"; // Second 32 bytes

    const tx = await player.sendTransaction({
      data: deploymentBytecode,
    });
    const receipt = await tx.wait();
    const contractAddress = receipt?.contractAddress;
    console.log(`Puzzle deployed at: ${contractAddress}`);

    const solveTx = await player.sendTransaction({
      to: contractAddress,
      data: calldata,
    });
    await solveTx.wait();

    console.log("Puzzle solved");
  });
});
