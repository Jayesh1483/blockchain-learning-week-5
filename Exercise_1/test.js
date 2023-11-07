const { expect } = require("chai");

describe("Exercise_1", function () {
  let exercise;

  beforeEach(async () => {
    const Exercise_1 = await ethers.getContractFactory("Exercise_1");
    exercise = await Exercise_1.deploy();
    await exercise.deployed();
  });

  it("Should return the initial balance as zero", async function () {
    expect(await exercise.balances("0x1")).to.equal(0);
  });

  it("Should deposit the amount successfully", async function () {
    await exercise.deposit("0x1", 100);
    expect(await exercise.balances("0x1")).to.equal(100);
  });

  it("Should withdraw the amount successfully", async function () {
    await exercise.deposit("0x1", 100);
    await exercise.withdraw("0x1", 50);
    expect(await exercise.balances("0x1")).to.equal(50);
  });

  it("Should revert on withdrawal if the balance is insufficient", async function () {
    await exercise.deposit("0x1", 50);
    await expect(exercise.withdraw("0x1", 100)).to.be.revertedWith("Insufficient balance");
  });
});
