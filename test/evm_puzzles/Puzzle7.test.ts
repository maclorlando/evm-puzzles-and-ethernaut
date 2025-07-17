import { ethers } from "hardhat";
import { expect } from "chai";

describe("EVM Puzzle 7", function () {
  it("Should solve Puzzle 7 by deploying a contract with 1 byte of code", async function () {
    const [player] = await ethers.getSigners();

    const deploymentBytecode =
      "0x6011600a60003960116000f336600080373660006000f03b600114601357fd5b00";

    //Deploy puzzle contract
    const tx = await player.sendTransaction({
      data: deploymentBytecode,
    });
    const receipt = await tx.wait();
    const contractAddress = receipt?.contractAddress;
    console.log(`Puzzle deployed at: ${contractAddress}`);

    //Calldata -> a contract whose runtime is just STOP (0x00)
    const calldata = "0x00";

    //Send solving transaction
    const solveTx = await player.sendTransaction({
      to: contractAddress,
      data: calldata,
    });
    await solveTx.wait();

    console.log("Puzzle solved with deployed contract of codesize 1");
  });
});
