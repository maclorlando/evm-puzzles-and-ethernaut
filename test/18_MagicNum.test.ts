import { ethers } from "hardhat";
import { expect } from "chai";

describe("Ethernaut Level 18 - MagicNumber", function () {
  it("Should deploy solver and set it correctly", async function () {
    const [player] = await ethers.getSigners();

    //Deploy MagicNum contract
    const MagicNum = await ethers.getContractFactory("MagicNum");
    const magicNum = await MagicNum.deploy();
    await magicNum.waitForDeployment();
    console.log(`MagicNum deployed at: ${magicNum.target}`);

    //Raw bytecode for Solver contract
    const bytecode =
      "0x600a600c600039600a6000f3602a60005260206000f3";

    //Deploy Solver contract with raw tx
    const tx = await player.sendTransaction({
      data: bytecode,
    });
    const receipt = await tx.wait();
    const solverAddress = receipt?.contractAddress;
    console.log(`Solver deployed at: ${solverAddress}`);

    //Set solver in MagicNum contract
    const setTx = await magicNum.setSolver(solverAddress as string);
    await setTx.wait();

    //Check that solver is set
    const solver = await magicNum.solver();
    expect(solver).to.equal(solverAddress);

    console.log("🎯 Solver set successfully");

    //Optional: Verify that calling solver returns 42
    const result = await ethers.provider.call({
      to: solverAddress,
      data: "0x",
    });

    const value = BigInt(result);
    console.log(`Solver returned: ${value}`);
    expect(value).to.equal(42n);
  });
});
