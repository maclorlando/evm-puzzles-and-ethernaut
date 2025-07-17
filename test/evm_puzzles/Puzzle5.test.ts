import { ethers } from "hardhat";
import { expect } from "chai";

describe("EVM Puzzle 5", function () {
  it("Should solve Puzzle 5 by sending correct msg.value", async function () {
    const [player] = await ethers.getSigners();

    const deploymentBytecode =
      "0x6010600a60003960106000f334800261010014600c57fdfd5b00fdfd";

    // ✅ Deploy contract from raw bytecode
    const tx = await player.sendTransaction({
      data: deploymentBytecode,
    });
    const receipt = await tx.wait();
    const contractAddress = receipt?.contractAddress;
    console.log(`Puzzle deployed at: ${contractAddress}`);

    //Now send solving transaction
    const solveTx = await player.sendTransaction({
      to: contractAddress,
      value: 16n, //Correct value
    });
    await solveTx.wait();

    console.log("Puzzle solved with msg.value = 16");
  });
});
