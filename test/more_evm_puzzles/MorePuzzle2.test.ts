import { ethers } from "hardhat";
import { expect } from "chai";

describe("More EVM Puzzle 2", function () {
  it("Should solve More EVM Puzzle 2", async function () {
    const [player] = await ethers.getSigners();

    const deploymentBytecode =
      "0x6026600a60003960266000f33660006000373660006000f0600080808080945af13d600a14601f57fefefe5b00";

    const tx = await player.sendTransaction({
      data: deploymentBytecode,
    });
    const receipt = await tx.wait();
    const contractAddress = receipt?.contractAddress;
    console.log(`Puzzle deployed at: ${contractAddress}`);

    const calldata =
      "0x6011600a60003960116000f3691122334455667788990052600a6000f3";

    const solveTx = await player.sendTransaction({
      to: contractAddress,
      data: calldata,
    });
    await solveTx.wait();

    console.log("Puzzle solved");
  });
});
