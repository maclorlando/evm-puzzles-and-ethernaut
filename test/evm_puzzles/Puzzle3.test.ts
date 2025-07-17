import { ethers } from "hardhat";
import { expect } from "chai";

describe("EVM Puzzle 3 (Correct JSON Version)", function () {
  it("Should solve Puzzle 3 by sending correct calldata length", async function () {
    const [player] = await ethers.getSigners();

    const deploymentBytecode =
      "0x6006600a60003960066000f33656fdfd5b00";

    //Deploy contract from raw bytecode
    const tx = await player.sendTransaction({
      data: deploymentBytecode,
    });
    const receipt = await tx.wait();
    const contractAddress = receipt?.contractAddress;
    console.log(`Puzzle deployed at: ${contractAddress}`);

    //Prepare calldata → must be 4 bytes
    const calldata = "0xdeadbeef";

    //Send solving transaction
    const solveTx = await player.sendTransaction({
      to: contractAddress,
      data: calldata,
    });
    await solveTx.wait();

    console.log("Puzzle solved with calldata length = 4");
  });
});
