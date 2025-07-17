import { ethers } from "hardhat";
import { expect } from "chai";

describe("More EVM Puzzle 4", function () {
  it("Should solve More EVM Puzzle 4", async function () {
    const [player] = await ethers.getSigners();

    const deploymentBytecode =
      "0x6026600a60003960266000f330313660006000373660003031f0319004600214601857fd5b00";

    // Deploy the puzzle contract
    const deployTx = await player.sendTransaction({
      data: deploymentBytecode,
      value: ethers.parseEther("0.01"), // initial funding
    });
    const receipt = await deployTx.wait();
    const contractAddress = receipt?.contractAddress;
    console.log(`Puzzle deployed at: ${contractAddress}`);

    // Check contract balance
    const balance = await ethers.provider.getBalance(contractAddress);
    const halfBalance = balance / 2n;

    // Calldata to deploy a STOP contract
    const calldata = "0x60006000f3";

    // Solve
    const solveTx = await player.sendTransaction({
      to: contractAddress,
      value: halfBalance,
      data: calldata,
    });
    await solveTx.wait();

    console.log("Puzzle solved");
  });
});
