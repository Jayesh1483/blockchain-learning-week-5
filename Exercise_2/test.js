const { expect } = require("chai");

describe("Exercise_2", function () {
  let exercise;

  beforeEach(async () => {
    const Exercise_2 = await ethers.getContractFactory("Exercise_2");
    exercise = await Exercise_2.deploy();
    await exercise.deployed();
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

  it("Should add balances successfully", async function () {
    await exercise.addBalances("0x1", 50);
    expect(await exercise.balances("0x1")).to.equal(50);
  });

  it("Should subtract balances successfully", async function () {
    await exercise.deposit("0x1", 100);
    await exercise.subtractBalances("0x1", 50);
    expect(await exercise.balances("0x1")).to.equal(50);
  });

  it("Should self-destruct the contract successfully", async function () {
    await expect(exercise.destroyContract("0x2")).to.emit(exercise, "Destroyed");
  });
});
