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
  this.timeout(60000);

  let crowdFunding: Crowdfunding;
  let accounts: SignerWithAddress[];
  let deployer: SignerWithAddress;
  let systemContract: SystemContract;
  let owner: Signer, addr1: Signer, addr2: Signer;

  beforeEach(async function () {
    accounts = await ethers.getSigners();
    [deployer] = accounts;

    const CrowdFundingFactory = (await ethers.getContractFactory(
      "Crowdfunding"
    )) as Crowdfunding__factory;

    console.log("Deploying CrowdFunding contract"); // Debugging log
    crowdFunding = (await CrowdFundingFactory.deploy(
      "0xaBDec5fCe0F9067F9B5cfabE34E0460220b301e8"
    )) as Crowdfunding;
    await crowdFunding.deployed();
    console.log("CrowdFunding contract deployed"); // Debugging log
  });

  describe("create", function () {
    it("Should create a company and return the values", async function () {
      await crowdFunding.create("campaign 1", "description 1", 1000, [
        "tag 1",
        "tag b",
      ]);

      const campaign = await crowdFunding.campaigns(1);

      expect(campaign.name).to.equal("campaign 1");
      expect(campaign.description).to.equal("description 1");
      expect(campaign.amount_required).to.equal(1000);
      // expect(campaign.tags).to.equal(["tag 1", "tag b"]);
      console.log(campaign);
    });
  });
});
