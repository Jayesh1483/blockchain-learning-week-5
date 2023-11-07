const { expect } = require("chai");

describe("VotingSystem", function () {
  let votingSystem;
  let owner;
  let addr1;
  let addr2;

  beforeEach(async function () {
    const VotingSystem = await ethers.getContractFactory("VotingSystem");
    [owner, addr1, addr2] = await ethers.getSigners();
    votingSystem = await VotingSystem.deploy(["Candidate 1", "Candidate 2"]);
    await votingSystem.deployed();
  });

  it("should initialize candidates correctly", async function () {
    const candidate1 = await votingSystem.candidates(0);
    const candidate2 = await votingSystem.candidates(1);
    expect(candidate1).to.equal("Candidate 1");
    expect(candidate2).to.equal("Candidate 2");
  });

  it("should allow voting and return correct vote count", async function () {
    await votingSystem.connect(addr1).vote(0);
    await votingSystem.connect(addr2).vote(0);
    const voteCount = await votingSystem.getTotalVotes(0);
    expect(voteCount).to.equal(2);
  });

  it("should prevent double voting", async function () {
    await votingSystem.connect(addr1).vote(1);
    await expect(votingSystem.connect(addr1).vote(0)).to.be.revertedWith("Already voted");
  });

  it("should allow only owner to add candidate", async function () {
    await expect(votingSystem.connect(addr1).addCandidate("Candidate 3")).to.be.revertedWith("Only contract owner can perform this action");
    await votingSystem.connect(owner).addCandidate("Candidate 3");
    const candidate3 = await votingSystem.candidates(2);
    expect(candidate3).to.equal("Candidate 3");
  });

  it("should allow only owner to remove candidate", async function () {
    await expect(votingSystem.connect(addr1).removeCandidate(0)).to.be.revertedWith("Only contract owner can perform this action");
    await votingSystem.connect(owner).removeCandidate(0);
    const candidate1 = await votingSystem.candidates(0);
    expect(candidate1).to.equal("");
  });
});
