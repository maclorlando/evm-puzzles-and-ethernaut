import { ethers } from "hardhat";
import { expect } from "chai";

describe("More EVM Puzzle 1", function () {
  it("Should solve More EVM Puzzle 1", async function () {
    const [player] = await ethers.getSigners();

    const deploymentBytecode =
      "0x604e600a600039604e6000f336340a56fefefefefefefefefefefefefefefefefefefefefefefefefefefefefefefefefefefefefefefefefefefefefefefefefefefefefefefefefefefefefefefefefefefefefefefe5b58360156fefe5b00";

    const tx = await player.sendTransaction({
      data: deploymentBytecode,
    });
    const receipt = await tx.wait();
    const contractAddress = receipt?.contractAddress;
    console.log(`Puzzle deployed at: ${contractAddress}`);

    const solveTx = await player.sendTransaction({
      to: contractAddress,
      value: 1n,
      data: "0xdeadbeefcafe", // 6 bytes
    });
    await solveTx.wait();

    console.log("Puzzle solved");
  });
});
