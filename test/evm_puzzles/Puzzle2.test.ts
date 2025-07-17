import { ethers } from "hardhat";
import { expect } from "chai";

describe("EVM Puzzle 2 (Corrected)", function () {
  it("Should solve Puzzle 2 by sending correct msg.value", async function () {
    const [player] = await ethers.getSigners();

    const deploymentBytecode =
      "0x600a600a600039600a6000f334380356fdfd5b00fdfd";

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
      value: 4n, //Correct msg.value
    });
    await solveTx.wait();

    console.log("🎯 Puzzle solved with msg.value = 4 ✅");
  });
});
