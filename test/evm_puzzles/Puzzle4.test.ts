import { ethers } from "hardhat";
import { expect } from "chai";

describe("EVM Puzzle 4", function () {
  it("Should solve Puzzle 4 by sending correct msg.value", async function () {
    const [player] = await ethers.getSigners();

    const deploymentBytecode =
      "0x600b600a600039600b6000f334381856fdfdfdfdfdfd5b00";

    //Deploy contract from raw bytecode
    const tx = await player.sendTransaction({
      data: deploymentBytecode,
    });
    const receipt = await tx.wait();
    const contractAddress = receipt?.contractAddress;
    console.log(`Puzzle deployed at: ${contractAddress}`);

    //Now send solving transaction
    const solveTx = await player.sendTransaction({
      to: contractAddress,
      value: 9n, //Correct value
    });
    await solveTx.wait();

    console.log("Puzzle solved with msg.value = 9");
  });
});
