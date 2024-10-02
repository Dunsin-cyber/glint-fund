// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/interfaces/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@zetachain/protocol-contracts/contracts/evm/tools/ZetaInteractor.sol";
import "@zetachain/protocol-contracts/contracts/evm/interfaces/ZetaInterfaces.sol";
import "@zetachain/protocol-contracts/contracts/evm/ZetaConnector.base.sol";
import "@zetachain/protocol-contracts/contracts/evm/libs/BytesHelperLib.sol";
import "@zetachain/protocol-contracts/contracts/evm/libs/SwapHelperLib.sol";

contract CrowdFunding is ZetaInteractor, Ownable {
    ZetaTokenConsumer private immutable _zetaConsumer;
    IERC20 internal immutable _zetaToken;
    address public systemContract;

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

    constructor(address connectorAddress, address zetaConsumerAddress, address _systemContract) 
        ZetaInteractor(connectorAddress) 
    {
        _zetaToken = IERC20(ZetaConnectorBase(connectorAddress).zetaToken());
        _zetaConsumer = ZetaTokenConsumer(zetaConsumerAddress);
        systemContract = _systemContract;
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

    function onCrossChainCall(
        zContext calldata context,
        address zrc20,
        uint256 amount,
        bytes calldata message
    ) external override onlySystem(systemContract) {
        // Parameters decoding for cross-chain calls
        (address targetToken, bytes memory recipient, bool withdrawFlag) = abi.decode(message, (address, bytes, bool));
        
        uint256 inputForGas;
        address gasZRC20;
        uint256 gasFee;
        
        if (withdrawFlag) {
            (gasZRC20, gasFee) = IZRC20(targetToken).withdrawGasFee();

            inputForGas = SwapHelperLib.swapTokensForExactTokens(
                systemContract,
                zrc20,
                gasFee,
                gasZRC20,
                amount
            );
        }

        uint256 outputAmount = SwapHelperLib.swapExactTokensForTokens(
            systemContract,
            zrc20,
            withdrawFlag ? amount - inputForGas : amount,
            targetToken,
            0
        );

        if (withdrawFlag) {
            IZRC20(gasZRC20).approve(targetToken, gasFee);
            IZRC20(targetToken).withdraw(recipient, outputAmount);
        } else {
            IWETH9(targetToken).transfer(address(uint160(bytes20(recipient))), outputAmount);
        }
    }

    function createCrossChainCampaign(
        uint256 destinationChainId,
        string memory name,
        string memory description,
        uint256 amountRequired,
        string[] memory tags
    ) public payable {
        bytes memory message = abi.encode(name, description, amountRequired, tags, false);
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
        bytes memory message = abi.encode(campaignId, amount, false);
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

    // Other cross-chain functions will follow a similar pattern
    // Example for claiming funds cross-chain
    function claimFundsCrossChain(
        uint256 destinationChainId,
        uint256 campaignId
    ) public {
        bytes memory message = abi.encode(campaignId, true);
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

    modifier onlySystem(address _systemContract) {
        require(msg.sender == _systemContract, "Caller is not the system contract");
        _;
    }
}
