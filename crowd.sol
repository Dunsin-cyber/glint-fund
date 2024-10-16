// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@zetachain/protocol-contracts/contracts/zevm/SystemContract.sol";
import "@zetachain/protocol-contracts/contracts/zevm/interfaces/zContract.sol";
import "@zetachain/toolkit/contracts/SwapHelperLib.sol";
import "@zetachain/toolkit/contracts/BytesHelperLib.sol";
import "@zetachain/protocol-contracts/contracts/zevm/interfaces/IWZETA.sol";
import "@zetachain/toolkit/contracts/OnlySystem.sol";
import "@zetachain/protocol-contracts/contracts/zevm/interfaces/IZRC20.sol";

contract CrossChainCrowdfunding is zContract, OnlySystem {

    // Structure for each crowdfunding campaign
    struct Campaign {
        string name;
        string description;
        address admin;
        uint256 amountRequired;
        uint256 amountDonated;
        uint256 endTime;
        bool donationComplete;
    }

    // Structure for user profiles
    struct UserProfile {
        string username;
        string email;
        string bio;
        string[] socialLinks;
    }

    // Struct for handling cross-chain params
    struct Params {
        address target;
        bytes to;
        bool withdraw;
    }

    uint256 public campaignCounter; // To keep track of campaign IDs
    mapping(uint256 => Campaign) public campaigns; // Mapping to store campaigns
    mapping(address => UserProfile) public userProfiles; // Mapping to store user profiles

    SystemContract public systemContract; // ZetaChain System Contract

    // Define a constant for Bitcoin chain ID, just for example
    uint256 constant BITCOIN = 18332;

    // Constructor that accepts the system contract address for cross-chain operations
    constructor(address systemContractAddress) OnlySystem(systemContractAddress) {
        systemContract = SystemContract(systemContractAddress);
    }

    // Modifier to restrict actions to only the campaign admin
    modifier onlyAdmin(uint256 campaignId) {
        require(campaigns[campaignId].admin == msg.sender, "Only admin allowed");
        _;
    }

    /**
     * @notice Cross-chain function to create a campaign
     * @param context zContext data from cross-chain call
     * @param zrc20 Address of the ZRC20 token being used
     * @param amount Not used in campaign creation but passed by system
     * @param message Encoded campaign creation details (name, description, amountRequired, duration)
     */
    function createCampaignCrossChain(
        zContext calldata context,
        address zrc20,
        uint256 amount,
        bytes calldata message
    ) external virtual override onlySystem(systemContract) {
        (
            string memory name,
            string memory description,
            uint256 amountRequired,
            uint256 duration
        ) = abi.decode(message, (string, string, uint256, uint256));

        campaignCounter++; // Increment campaign counter
        campaigns[campaignCounter] = Campaign({
            name: name,
            description: description,
            admin: msg.sender, // Campaign admin is the creator
            amountRequired: amountRequired,
            amountDonated: 0,
            endTime: block.timestamp + duration, // End time is current time + duration
            donationComplete: false
        });
    }

    /**
     * @notice Cross-chain function to donate to a campaign
     * @param context zContext data from cross-chain call
     * @param zrc20 Address of the ZRC20 token being donated
     * @param amount Amount being donated
     * @param message Encoded campaignId
     */
    function donateToCampaignCrossChain(
        zContext calldata context,
        address zrc20,
        uint256 amount,
        bytes calldata message
    ) external virtual override onlySystem(systemContract) {
        uint256 campaignId = abi.decode(message, (uint256));

        Campaign storage campaign = campaigns[campaignId];
        require(block.timestamp < campaign.endTime, "Campaign expired");
        
        // Transfer tokens cross-chain
        IZRC20(zrc20).transfer(address(this), amount);
        campaign.amountDonated += amount; // Update campaign's donated amount
    }

    /**
     * @notice Cross-chain function to withdraw funds from a campaign
     * @param context zContext data from cross-chain call
     * @param zrc20 Address of the ZRC20 token being withdrawn
     * @param amount Amount to be withdrawn
     * @param message Encoded campaignId
     */
    function withdrawFundsCrossChain(
        zContext calldata context,
        address zrc20,
        uint256 amount,
        bytes calldata message
    ) external virtual override onlySystem(systemContract) {
        uint256 campaignId = abi.decode(message, (uint256));

        Campaign storage campaign = campaigns[campaignId];
        require(campaign.amountDonated >= amount, "Insufficient funds");
        require(campaign.donationComplete, "Campaign not complete");

        // Transfer the withdrawn funds to the campaign admin
        IZRC20(zrc20).transfer(campaign.admin, amount);
        campaign.amountDonated -= amount;
    }

    /**
     * @notice Cross-chain function to finalize a campaign (mark it complete)
     * @param context zContext data from cross-chain call
     * @param zrc20 Address of the ZRC20 token (for accounting purposes)
     * @param amount Not used in finalization
     * @param message Encoded campaignId
     */
    function finalizeCampaignCrossChain(
        zContext calldata context,
        address zrc20,
        uint256 amount,
        bytes calldata message
    ) external virtual override onlySystem(systemContract) {
        uint256 campaignId = abi.decode(message, (uint256));

        Campaign storage campaign = campaigns[campaignId];
        require(campaign.amountDonated >= campaign.amountRequired, "Funding goal not reached");
        campaign.donationComplete = true; // Mark the campaign as completed
    }

    /**
     * @notice Cross-chain function to register a user profile
     * @param context zContext data from cross-chain call
     * @param zrc20 Address of the ZRC20 token (not used here)
     * @param amount Not used in registration
     * @param message Encoded user profile details (username, email, bio, socialLinks)
     */
    function registerUserProfileCrossChain(
        zContext calldata context,
        address zrc20,
        uint256 amount,
        bytes calldata message
    ) external virtual override onlySystem(systemContract) {
        (
            string memory username,
            string memory email,
            string memory bio,
            string[] memory socialLinks
        ) = abi.decode(message, (string, string, string, string[]));

        // Register the user's profile
        userProfiles[msg.sender] = UserProfile({
            username: username,
            email: email,
            bio: bio,
            socialLinks: socialLinks
        });
    }

    /**
     * @notice Cross-chain function to update a user profile
     * @param context zContext data from cross-chain call
     * @param zrc20 Address of the ZRC20 token (not used here)
     * @param amount Not used in updating the profile
     * @param message Encoded user profile updates (newBio, newSocialLinks)
     */
    function updateUserProfileCrossChain(
        zContext calldata context,
        address zrc20,
        uint256 amount,
        bytes calldata message
    ) external virtual override onlySystem(systemContract) {
        (
            string memory newBio,
            string[] memory newSocialLinks
        ) = abi.decode(message, (string, string[]));

        UserProfile storage profile = userProfiles[msg.sender];
        profile.bio = newBio;
        profile.socialLinks = newSocialLinks;
    }

    /**
     * @notice Cross-chain function to transfer ownership of a campaign
     * @param context zContext data from cross-chain call
     * @param zrc20 Address of the ZRC20 token (not used here)
     * @param amount Not used in transfer
     * @param message Encoded campaignId and newOwner address
     */
    function transferCampaignOwnershipCrossChain(
        zContext calldata context,
        address zrc20,
        uint256 amount,
        bytes calldata message
    ) external virtual override onlySystem(systemContract) {
        (uint256 campaignId, address newOwner) = abi.decode(message, (uint256, address));

        Campaign storage campaign = campaigns[campaignId];
        require(campaign.admin == msg.sender, "Only admin can transfer ownership");

        // Transfer ownership of the campaign
        campaign.admin = newOwner;
    }

    /**
     * @notice Cross-chain function to extend a campaign's duration
     * @param context zContext data from cross-chain call
     * @param zrc20 Address of the ZRC20 token (not used here)
     * @param amount Not used in extension
     * @param message Encoded campaignId and additional duration in seconds
     */
    function extendCampaignDurationCrossChain(
        zContext calldata context,
        address zrc20,
        uint256 amount,
        bytes calldata message
    ) external virtual override onlySystem(systemContract) {
        (uint256 campaignId, uint256 additionalDuration) = abi.decode(message, (uint256, uint256));

        Campaign storage campaign = campaigns[campaignId];
        require(campaign.admin == msg.sender, "Only admin can extend campaign duration");

        // Extend the campaign's end time
        campaign.endTime += additionalDuration;
    }

    /**
     * @notice Cross-chain call handler to invoke specific functions based on the function selector
     * @param context zContext data from cross-chain call
     * @param zrc20 Address of the ZRC20 token being used
     * @param amount Amount being transferred (if any)
     * @param message Encoded function call details
     */
    function onCrossChainCall(
        zContext calldata context,
        address zrc20,
        uint256 amount,
        bytes calldata message
    ) external virtual override onlySystem(systemContract) {
        // This function routes cross-chain calls to specific functions based on the message selector
    }
}
