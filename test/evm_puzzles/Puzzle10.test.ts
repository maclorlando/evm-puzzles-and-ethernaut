import { ethers } from "hardhat";
import { expect } from "chai";

describe("EVM Puzzle 10 (Final Boss)", function () {
  it("Should solve Puzzle 10 with correct calldata and msg.value", async function () {
    const [player] = await ethers.getSigners();

    const deploymentBytecode =
      "0x601e600a600039601e6000f338349011600857fd5b3661000390061534600a0157fdfdfdfd5b00";

    // Deploy the puzzle contract
    const tx = await player.sendTransaction({
      data: deploymentBytecode,
    });
    const receipt = await tx.wait();
    const contractAddress = receipt?.contractAddress;
    console.log(`Puzzle deployed at: ${contractAddress}`);

    // Calldata → 3 bytes
    const calldata = "0xdeadbe";

    // Send the solving transaction
    const solveTx = await player.sendTransaction({
      to: contractAddress,
      value: 8n, //Correct msg.value
      data: calldata,
    });
    await solveTx.wait();

    console.log("puzzle 10 solved");
  });
});
