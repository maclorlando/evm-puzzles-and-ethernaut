import { ethers } from "hardhat";
import { expect } from "chai";

describe("More EVM Puzzle 3", function () {
  it("Should solve More EVM Puzzle 3", async function () {
    const [player] = await ethers.getSigners();

    const deploymentBytecode =
      "0x6026600a60003960266000f33660006000373660006000f06000808080935af460055460aa14601e57fe5b00";

    const tx = await player.sendTransaction({
      data: deploymentBytecode,
    });
    const receipt = await tx.wait();
    const contractAddress = receipt?.contractAddress;
    console.log(`Puzzle deployed at: ${contractAddress}`);

    const calldata =
      "0x6005600a60003960056000f360aa60055500";

    const solveTx = await player.sendTransaction({
      to: contractAddress,
      data: calldata,
    });
    await solveTx.wait();

    console.log("Puzzle solved");
  });
});
