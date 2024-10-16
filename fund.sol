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
    struct Campaign {
        string name;
        string description;
        address admin;
        uint256 amountRequired;
        uint256 amountDonated;
        uint256 endTime;
        bool donationComplete;
    }

    struct UserProfile {
        string username;
        string email;
        string bio;
        string[] socialLinks;
    }

    struct Params {
        address target;
        bytes to;
        bool withdraw;
    }

    uint256 public campaignCounter;
    mapping(uint256 => Campaign) public campaigns;
    mapping(address => UserProfile) public userProfiles;

    SystemContract public systemContract;
    uint256 constant BITCOIN = 18332;

    constructor(address systemContractAddress) OnlySystem(systemContractAddress) {
        systemContract = SystemContract(systemContractAddress);
    }

    modifier onlyAdmin(uint256 campaignId) {
        require(campaigns[campaignId].admin == msg.sender, "Only admin allowed");
        _;
    }

    // Cross-Chain Campaign Creation
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

        campaignCounter++;
        campaigns[campaignCounter] = Campaign({
            name: name,
            description: description,
            admin: msg.sender,
            amountRequired: amountRequired,
            amountDonated: 0,
            endTime: block.timestamp + duration,
            donationComplete: false
        });
    }

    // Cross-Chain Donation
    function donateToCampaignCrossChain(
        zContext calldata context,
        address zrc20,
        uint256 amount,
        bytes calldata message
    ) external virtual override onlySystem(systemContract) {
        (uint256 campaignId) = abi.decode(message, (uint256));

        Campaign storage campaign = campaigns[campaignId];
        require(block.timestamp < campaign.endTime, "Campaign expired");
        
        IZRC20(zrc20).transfer(address(this), amount);
        campaign.amountDonated += amount;
    }

    // Cross-Chain Withdrawal
    function withdrawFundsCrossChain(
        zContext calldata context,
        address zrc20,
        uint256 amount,
        bytes calldata message
    ) external virtual override onlySystem(systemContract) {
        (uint256 campaignId) = abi.decode(message, (uint256));

        Campaign storage campaign = campaigns[campaignId];
        require(campaign.amountDonated >= amount, "Insufficient funds");
        require(campaign.donationComplete, "Campaign not complete");

        IZRC20(zrc20).transfer(campaign.admin, amount);
        campaign.amountDonated -= amount;
    }

    // Cross-Chain Finalize Campaign
    function finalizeCampaignCrossChain(
        zContext calldata context,
        address zrc20,
        uint256 amount,
        bytes calldata message
    ) external virtual override onlySystem(systemContract) {
        (uint256 campaignId) = abi.decode(message, (uint256));

        Campaign storage campaign = campaigns[campaignId];
        require(campaign.amountDonated >= campaign.amountRequired, "Funding goal not reached");
        campaign.donationComplete = true;
    }

    // Register a user profile cross-chain
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

        userProfiles[msg.sender] = UserProfile({
            username: username,
            email: email,
            bio: bio,
            socialLinks: socialLinks
        });
    }

    // Update user profile cross-chain
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

    // Cross-Chain Get Campaign Details (can be read on-chain or off-chain, no need for message)
    function getCampaignDetails(uint256 campaignId)
        public
        view
        returns (
            string memory name,
            string memory description,
            uint256 amountRequired,
            uint256 amountDonated,
            bool donationComplete
        )
    {
        Campaign memory campaign = campaigns[campaignId];
        return (
            campaign.name,
            campaign.description,
            campaign.amountRequired,
            campaign.amountDonated,
            campaign.donationComplete
        );
    }

    // Cross-Chain functionality handling incoming calls from other chains
    function onCrossChainCall(
        zContext calldata context,
        address zrc20,
        uint256 amount,
        bytes calldata message
    ) external override onlySystem(systemContract) {
        // Decode the message to figure out which cross-chain function to call
        (uint8 functionSelector, bytes memory functionData) = abi.decode(message, (uint8, bytes));

        if (functionSelector == 1) {
            createCampaignCrossChain(context, zrc20, amount, functionData);
        } else if (functionSelector == 2) {
            donateToCampaignCrossChain(context, zrc20, amount, functionData);
        } else if (functionSelector == 3) {
            withdrawFundsCrossChain(context, zrc20, amount, functionData);
        } else if (functionSelector == 4) {
            finalizeCampaignCrossChain(context, zrc20, amount, functionData);
        } else if (functionSelector == 5) {
            registerUserProfileCrossChain(context, zrc20, amount, functionData);
        } else if (functionSelector == 6) {
            updateUserProfileCrossChain(context, zrc20, amount, functionData);
        }
    }
}



    // SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/interfaces/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@zetachain/protocol-contracts/contracts/evm/tools/ZetaInteractor.sol";
import "@zetachain/protocol-contracts/contracts/evm/interfaces/ZetaInterfaces.sol";
import "@zetachain/protocol-contracts/contracts/evm/ZetaConnector.base.sol";

contract CrowdFunding is ZetaInteractor, Ownable {
    ZetaTokenConsumer private immutable _zetaConsumer;
    IERC20 internal immutable _zetaToken;
    
    struct Campaign {
        uint8 id;
        address admin;
        string name;
        string description;
        uint256 amountRequired;
        uint256 amountDonated;
        bool donationComplete;
        string[] tags;
    }
    
    struct UserProfile {
        string username;
        string email;
        string bio;
        string[] socialLinks;
    }

    mapping(address => UserProfile) public userProfiles;
    mapping(uint256 => Campaign) public campaigns;
    uint256 public campaignCount;

    constructor(address connectorAddress, address zetaConsumerAddress) ZetaInteractor(connectorAddress) {
        _zetaToken = IERC20(ZetaConnectorBase(connectorAddress).zetaToken());
        _zetaConsumer = ZetaTokenConsumer(zetaConsumerAddress);
    }

    function createCampaign(
        string memory name,
        string memory description,
        uint256 amountRequired,
        string[] memory tags
    ) public {
        campaigns[campaignCount] = Campaign({
            id: uint8(campaignCount),
            admin: msg.sender,
            name: name,
            description: description,
            amountRequired: amountRequired,
            amountDonated: 0,
            donationComplete: false,
            tags: tags
        });
        campaignCount++;
    }

    function createCrossChainCampaign(
        uint256 destinationChainId,
        string memory name,
        string memory description,
        uint256 amountRequired,
        string[] memory tags
    ) public payable {
        bytes memory message = abi.encode(name, description, amountRequired, tags);
        uint256 zetaValueAndGas = _zetaConsumer.getZetaFromEth{value: msg.value}(address(this), 0);
        _zetaToken.approve(address(connector), zetaValueAndGas);
        connector.send(
            ZetaInterfaces.SendInput({
                destinationChainId: destinationChainId,
                destinationAddress: interactorsByChainId[destinationChainId],
                destinationGasLimit: 300000,
                message: message,
                zetaValueAndGas: zetaValueAndGas,
                zetaParams: abi.encode("")
            })
        );
    }

    function pledgeCrossChain(
        uint256 destinationChainId,
        uint256 campaignId,
        uint256 amount
    ) public payable {
        bytes memory message = abi.encode(campaignId, amount);
        uint256 zetaValueAndGas = _zetaConsumer.getZetaFromEth{value: msg.value}(address(this), 0);
        _zetaToken.approve(address(connector), zetaValueAndGas);
        connector.send(
            ZetaInterfaces.SendInput({
                destinationChainId: destinationChainId,
                destinationAddress: interactorsByChainId[destinationChainId],
                destinationGasLimit: 300000,
                message: message,
                zetaValueAndGas: zetaValueAndGas,
                zetaParams: abi.encode("")
            })
        );
    }

    function claimFundsCrossChain(
        uint256 destinationChainId,
        uint256 campaignId
    ) public {
        bytes memory message = abi.encode(campaignId);
        uint256 zetaValueAndGas = _zetaConsumer.getZetaFromEth{value: msg.value}(address(this), 0);
        _zetaToken.approve(address(connector), zetaValueAndGas);
        connector.send(
            ZetaInterfaces.SendInput({
                destinationChainId: destinationChainId,
                destinationAddress: interactorsByChainId[destinationChainId],
                destinationGasLimit: 300000,
                message: message,
                zetaValueAndGas: zetaValueAndGas,
                zetaParams: abi.encode("")
            })
        );
    }

    function syncUserProfileCrossChain(
        uint256 destinationChainId,
        string memory username,
        string memory email,
        string memory bio,
        string[] memory socialLinks
    ) public {
        bytes memory message = abi.encode(username, email, bio, socialLinks);
        uint256 zetaValueAndGas = _zetaConsumer.getZetaFromEth{value: msg.value}(address(this), 0);
        _zetaToken.approve(address(connector), zetaValueAndGas);
        connector.send(
            ZetaInterfaces.SendInput({
                destinationChainId: destinationChainId,
                destinationAddress: interactorsByChainId[destinationChainId],
                destinationGasLimit: 300000,
                message: message,
                zetaValueAndGas: zetaValueAndGas,
                zetaParams: abi.encode("")
            })
        );
    }

    function updateCampaignCrossChain(
        uint256 destinationChainId,
        uint256 campaignId,
        string memory name,
        string memory description,
        uint256 amountRequired
    ) public {
        bytes memory message = abi.encode(campaignId, name, description, amountRequired);
        uint256 zetaValueAndGas = _zetaConsumer.getZetaFromEth{value: msg.value}(address(this), 0);
        _zetaToken.approve(address(connector), zetaValueAndGas);
        connector.send(
            ZetaInterfaces.SendInput({
                destinationChainId: destinationChainId,
                destinationAddress: interactorsByChainId[destinationChainId],
                destinationGasLimit: 300000,
                message: message,
                zetaValueAndGas: zetaValueAndGas,
                zetaParams: abi.encode("")
            })
        );
    }

    function deleteCampaignCrossChain(
        uint256 destinationChainId,
        uint256 campaignId
    ) public {
        bytes memory message = abi.encode(campaignId);
        uint256 zetaValueAndGas = _zetaConsumer.getZetaFromEth{value: msg.value}(address(this), 0);
        _zetaToken.approve(address(connector), zetaValueAndGas);
        connector.send(
            ZetaInterfaces.SendInput({
                destinationChainId: destinationChainId,
                destinationAddress: interactorsByChainId[destinationChainId],
                destinationGasLimit: 300000,
                message: message,
                zetaValueAndGas: zetaValueAndGas,
                zetaParams: abi.encode("")
            })
        );
    }

    function getCampaignCrossChain(
        uint256 destinationChainId,
        uint256 campaignId
    ) public {
        bytes memory message = abi.encode(campaignId);
        uint256 zetaValueAndGas = _zetaConsumer.getZetaFromEth{value: msg.value}(address(this), 0);
        _zetaToken.approve(address(connector), zetaValueAndGas);
        connector.send(
            ZetaInterfaces.SendInput({
                destinationChainId: destinationChainId,
                destinationAddress: interactorsByChainId[destinationChainId],
                destinationGasLimit: 300000,
                message: message,
                zetaValueAndGas: zetaValueAndGas,
                zetaParams: abi.encode("")
            })
        );
    }

    function transferFundsCrossChain(
        uint256 destinationChainId,
        address to,
        uint256 amount
    ) public payable {
        bytes memory message = abi.encode(to, amount);
        uint256 zetaValueAndGas = _zetaConsumer.getZetaFromEth{value: msg.value}(address(this), 0);
        _zetaToken.approve(address(connector), zetaValueAndGas);
        connector.send(
            ZetaInterfaces.SendInput({
                destinationChainId: destinationChainId,
                destinationAddress: interactorsByChainId[destinationChainId],
                destinationGasLimit: 300000,
                message: message,
                zetaValueAndGas: zetaValueAndGas,
                zetaParams: abi.encode("")
            })
        );
    }

    function getCampaignAnalyticsCrossChain(
        uint256 destinationChainId,
        uint256 campaignId
    ) public {
        bytes memory message = abi.encode(campaignId);
        uint256 zetaValueAndGas = _zetaConsumer.getZetaFromEth{value: msg.value}(address(this), 0);
        _zetaToken.approve(address(connector), zetaValueAndGas);
        connector.send(
            ZetaInterfaces.SendInput({
                destinationChainId: destinationChainId,
                destinationAddress: interactorsByChainId[destinationChainId],
                destinationGasLimit: 300000,
                message: message,
                zetaValueAndGas: zetaValueAndGas,
                zetaParams: abi.encode("")
            })
        );
    }

    function getUserStatisticsCrossChain(
        uint256 destinationChainId,
        address user
    ) public {
        bytes memory message = abi.encode(user);
        uint256 zetaValueAndGas = _zetaConsumer.getZetaFromEth{value: msg.value}(address(this), 0);
        _zetaToken.approve(address(connector), zetaValueAndGas);
        connector.send(
            ZetaInterfaces.SendInput({
                destinationChainId: destinationChainId,
                destinationAddress: interactorsByChainId[destinationChainId],
                destinationGasLimit: 300000,
                message: message,
                zetaValueAndGas: zetaValueAndGas,
                zetaParams: abi.encode("")
            })
        );
    }

}
