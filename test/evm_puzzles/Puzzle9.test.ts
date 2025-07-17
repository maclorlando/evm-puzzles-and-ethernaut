import { ethers } from "hardhat";
import { expect } from "chai";

describe("EVM Puzzle 9", function () {
  it("Should solve Puzzle 9 with correct calldata and msg.value", async function () {
    const [player] = await ethers.getSigners();

    const deploymentBytecode =
      "0x6019600a60003960196000f336600310600957fdfd5b343602600814601457fd5b00";

    // Deploy the puzzle contract
    const tx = await player.sendTransaction({
      data: deploymentBytecode,
    });
    const receipt = await tx.wait();
    const contractAddress = receipt?.contractAddress;
    console.log(`Puzzle deployed at: ${contractAddress}`);

    // Calldata → must be at least 3 bytes
    const calldata = "0xdeadbeef";

    // Send solving transaction
    const solveTx = await player.sendTransaction({
      to: contractAddress,
      value: 2n, //Correct msg.value
      data: calldata,
    });
    await solveTx.wait();

    console.log("Puzzle solved with msg.value = 2 and calldata length = 4");
  });
});
