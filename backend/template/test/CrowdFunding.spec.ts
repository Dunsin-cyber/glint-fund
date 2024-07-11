import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { ethers } from "hardhat";
import { Signer } from "ethers";

import {
  Crowdfunding__factory,
  SystemContract,
  SystemContract__factory,
  Crowdfunding,
  IZRC20,
} from "../typechain-types";

describe("CrowdFunding", function () {
  this.timeout(120000);

  let crowdFunding: Crowdfunding;
  let accounts: SignerWithAddress[];
  let deployer: SignerWithAddress;
  let user1: SignerWithAddress;
  let user2: SignerWithAddress;
  //TODO: create crowdfunding signed contract for two accounts,
  // one for the campaign owner and one for the donator

  beforeEach(async function () {
    accounts = await ethers.getSigners();
    [deployer, user1, user2] = accounts;

    console.log("user 1 is", user1.address, "user 2 is", user2.address);

    const CrowdFundingFactory = (await ethers.getContractFactory(
      "Crowdfunding"
    )) as Crowdfunding__factory;

    console.log("Deploying CrowdFunding contract"); // Debugging log
    crowdFunding = (await CrowdFundingFactory.deploy(
      "0x835F1F5a5578E49b5D163954cCdA60333c3ffC89"
    )) as Crowdfunding;
    await crowdFunding.deployed();
    console.log("CrowdFunding contract deployed"); // Debugging log
  });

  describe("create", function () {
    it("Should create a company and return the values", async function () {
      await crowdFunding
        .connect(user1)
        .create("campaign 1", "description 1", 1000, ["tag 1", "tag b"]);

      const campaign = await crowdFunding.connect(user1).campaigns(1);

      expect(campaign.name).to.equal("campaign 1");
      expect(campaign.description).to.equal("description 1");
      expect(campaign.amount_required).to.equal(1000);
      // expect(campaign.tags).to.equal(["tag 1", "tag b"]);
      // console.log(campaign);
    });
  });

  describe("donate", function () {
    it("Should call the donate function", async function () {
      const donate = await crowdFunding.connect(user2).donate(1);
      expect(donate.from).to.equal(user2.address);
      // expect(donate.to).to.equal(user1.address);
    });
    it("should donate 100 zeta", async function () {
      const campaign = await crowdFunding.connect(user2).campaigns(1);
      const val = crowdFunding.connect(user2).pledgedAmount(1, campaign.admin);
      // expect(Number(val)).to.equal(0);
      console.log(val);
    });
  });
});
