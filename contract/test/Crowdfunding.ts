import { expect } from "chai";
import { ethers } from "hardhat";
import { Contract, Signer } from "ethers";
import { Crowdfunding } from "../typechain";



// const { expect } = require("chai");
// const { ethers } = require("hardhat");

describe ("Crowdfunding", function() {

    // let Crowdfunding, crowdfunding, owner, addr1, addr2;

    let CrowdfundingFactory: ContractFactory;
    let crowdfunding: Crowdfunding;
    let owner: Signer, addr1: Signer, addr2: Signer;

    beforeEach(async function () {
        Crowfunding = await ethers.getContractFactory("Crowdfunding");

        accounts = await ethers.getSigners();

        [owner, addr1, addr2] = accounts;

        // crowdfunding = await deployWZETA() 

        crowdfunding = (await CrowdfundingFactory.deploy()) as Crowdfunding;
        await crowdfunding.deployed()

    });

    it("launch new campaign", async function (){

        await crowdfunding.create("campaign 1", "description 1", 1000, ["tag 1", "tag b"]);

        const campaign = await crowdfunding.campaigns(1);

        expect(campaign.name).to.equal("campaign 1");
        expect(campaign.description).to.equal("description 1");
        expect(campaign.amount_required).to.equal(1000);
        expect(campaign.tags).to.equal(["tag 1", "tag b"]);
    });

    // await crowdfunding.donate(3, {
    //     value : 2,
    //     gas : 3000000 //WEI
    // })

});