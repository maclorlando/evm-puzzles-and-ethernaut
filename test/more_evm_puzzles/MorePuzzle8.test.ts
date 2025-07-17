import { ethers } from "hardhat";
import { expect } from "chai";

describe("More EVM Puzzle 8", function () {
  it("Should solve More EVM Puzzle 8", async function () {
    const [player] = await ethers.getSigners();

    const deploymentBytecode =
      "0x605a600a600039605a6000f3341519600757fd5b3660006000373660006000f047600060006000600047865af1600114602857fd5b4714602f57fd5b00";

    const solveCalldata =
      "0x600a600c600039600a6000f3600160005260206000f3";

    const tx = await player.sendTransaction({
      data: deploymentBytecode,
      value: 0n, // msg.value = 0
    });
    const receipt = await tx.wait();
    const contractAddress = receipt?.contractAddress;
    console.log(`Puzzle deployed at: ${contractAddress}`);

    const solveTx = await player.sendTransaction({
      to: contractAddress,
      data: solveCalldata, // Deploys contract that returns 1
    });
    await solveTx.wait();

    console.log("Puzzle solved");
  });
});
