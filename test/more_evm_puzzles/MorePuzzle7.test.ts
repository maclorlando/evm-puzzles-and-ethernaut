import { ethers } from "hardhat";
import { expect } from "chai";

describe("More EVM Puzzle 7", function () {
  it("Should solve More EVM Puzzle 7 (at least first condition)", async function () {
    const [player] = await ethers.getSigners();

    const deploymentBytecode =
      "0x6026600a60003960266000f35a345b60019003806000146011576002565b5a90910360a614601d57fd5b00";

    const tx = await player.sendTransaction({
      data: deploymentBytecode,
      value: ethers.parseEther("0.001"),
    });
    const receipt = await tx.wait();
    const contractAddress = receipt?.contractAddress;
    console.log(`Puzzle deployed at: ${contractAddress}`);

    const solveTx = await player.sendTransaction({
      to: contractAddress,
      value: 1n,
    });
    await solveTx.wait();

    console.log("Puzzle solved (msg.value check passed)");
  });
});
