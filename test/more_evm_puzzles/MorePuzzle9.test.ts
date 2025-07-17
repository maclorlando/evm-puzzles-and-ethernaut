import { ethers } from "hardhat";
import { expect } from "chai";
import { keccak256, toBeHex } from "ethers";

describe("More EVM Puzzle 9", function () {
  it("Should solve More EVM Puzzle 9", async function () {
    const [player] = await ethers.getSigners();

    const deploymentBytecode =
      "0x6019600a60003960196000f334600052602060002060f81c60a814601657fdfdfdfd5b00";

    // ✅ Deploy the contract
    const tx = await player.sendTransaction({
      data: deploymentBytecode,
    });
    const receipt = await tx.wait();
    const contractAddress = receipt?.contractAddress;
    console.log(`Puzzle deployed at: ${contractAddress}`);

    // ✅ Brute-force msg.value
    console.log("🔍 Searching for valid msg.value...");

    let solution: bigint | null = null;
    for (let i = 0n; i < 100_000n; i++) {
      const padded = ethers.zeroPadValue(toBeHex(i), 32);
      const hash = keccak256(padded);
      const firstByte = parseInt(hash.slice(2, 4), 16);

      if (firstByte === 0xa8) {
        solution = i;
        console.log(`🎯 Found valid msg.value: ${solution}`);
        break;
      }
    }

    if (solution === null) {
      throw new Error("❌ No solution found in search space.");
    }

    // ✅ Solve the puzzle
    const solveTx = await player.sendTransaction({
      to: contractAddress,
      value: solution,
    });
    await solveTx.wait();

    console.log("🎉 Puzzle solved ✅");
  });
});
