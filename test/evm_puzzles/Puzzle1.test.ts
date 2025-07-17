import { ethers } from "hardhat";
import { expect } from "chai";

describe("EVM Puzzle 1", function () {
  it("Should solve Puzzle 1 by sending correct msg.value", async function () {
    const [player] = await ethers.getSigners();

    const deploymentBytecode =
      "0x600a600a600039600a6000f33456fdfdfdfdfdfd5b00";

    //Deploy contract from raw bytecode
    const tx = await player.sendTransaction({
      data: deploymentBytecode,
    });
    const receipt = await tx.wait();
    const contractAddress = receipt?.contractAddress;
    console.log(`Puzzle deployed at: ${contractAddress}`);

    //send solving transaction
    const solveTx = await player.sendTransaction({
      to: contractAddress,
      value: 7n,
    });
    await solveTx.wait();

    console.log("Puzzle solved with msg.value = 7");
  });
});
