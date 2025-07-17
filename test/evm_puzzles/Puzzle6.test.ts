import { ethers } from "hardhat";
import { expect } from "chai";

describe("EVM Puzzle 6", function () {
  it("Should solve Puzzle 6 by sending correct calldata", async function () {
    const [player] = await ethers.getSigners();

    const deploymentBytecode =
      "0x600c600a600039600c6000f360003556fdfdfdfdfdfd5b00";

    // Deploy contract from raw bytecode
    const tx = await player.sendTransaction({
      data: deploymentBytecode,
    });
    const receipt = await tx.wait();
    const contractAddress = receipt?.contractAddress;
    console.log(`Puzzle deployed at: ${contractAddress}`);

    //Prepare calldata → 32 bytes with value 10 (0x0a)
    const calldata =
      "0x000000000000000000000000000000000000000000000000000000000000000a";

    //Send solving transaction
    const solveTx = await player.sendTransaction({
      to: contractAddress,
      data: calldata,
    });
    await solveTx.wait();

    console.log("Puzzle solved with correct calldata");
  });
});
