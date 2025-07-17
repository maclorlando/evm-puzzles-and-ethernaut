import { ethers } from "hardhat";
import { expect } from "chai";

describe("EVM Puzzle 8", function () {
  it("Should solve Puzzle 8 by deploying a contract that fails on CALL", async function () {
    const [player] = await ethers.getSigners();

    const deploymentBytecode =
      "0x601a600a600039601a6000f336600080373660006000f0600080808080945af1600014601b57fd5b00";

    //Deploy the puzzle contract
    const tx = await player.sendTransaction({
      data: deploymentBytecode,
    });
    const receipt = await tx.wait();
    const contractAddress = receipt?.contractAddress;
    console.log(`Puzzle deployed at: ${contractAddress}`);

    //Calldata → Deploy a contract that always reverts (runtime = 0xfd)
    const calldata = "0xfd";

    //Send the solving transaction
    const solveTx = await player.sendTransaction({
      to: contractAddress,
      data: calldata,
    });
    await solveTx.wait();

    console.log("Puzzle solved with contract that fails on CALL");
  });
});
