// SPDX-License-Identifier: MIT
pragma solidity  0.8.7;

import "@openzeppelin/contracts/interfaces/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@zetachain/protocol-contracts/contracts/evm/tools/ZetaInteractor.sol";
import "@zetachain/protocol-contracts/contracts/evm/interfaces/ZetaInterfaces.sol";
import "@zetachain/protocol-contracts/contracts/evm/ZetaConnector.base.sol";

contract CrowdFunding is ZetaInteractor {

    ZetaTokenConsumer private immutable _zetaConsumer;
    IERC20 internal immutable _zetaToken;

    struct Campaign {
        uint8 id;                // Campaign ID
        address payable admin;   // Campaign admin
        string name;             // Campaign name
        string[] tags;           // Campaign tags
        uint64 amount_required;  // Amount required for the campaign
        bool donation_complete;  // Is the donation complete?
        string description;      // Campaign description
        uint64 amount_donated;   // Amount donated so far
    }

    mapping(uint8 => Campaign) public campaigns;
    uint8 public campaignCount;
    mapping(uint8 => mapping(address => uint64)) public pledgedAmount;

    event Launch(uint8 id, address indexed admin, string name, string description, uint64 amount_required, string[] tags);
    event Pledge(uint8 indexed id, address indexed pledger, uint64 amount);
    event Unpledge(uint8 indexed id, address indexed pledger, uint64 amount);
    event Claim(uint8 id);
    event Refund(uint8 id, address indexed pledger, uint64 amount);

    constructor(address connectorAddress, address zetaConsumerAddress)
        ZetaInteractor(connectorAddress)
    {
        _zetaToken = IERC20(ZetaConnectorBase(connectorAddress).zetaToken());
        _zetaConsumer = ZetaTokenConsumer(zetaConsumerAddress);
    }

    // Function to launch a new campaign
    function create(string memory name, string memory description, uint64 amount_required, string[] memory tags) external {
        campaignCount++;
        campaigns[campaignCount] = Campaign({
            id: campaignCount,
            admin: payable(msg.sender),
            name: name,
            tags: tags,
            amount_required: amount_required,
            donation_complete: false,
            description: description,
            amount_donated: 0
        });

        emit Launch(campaignCount, msg.sender, name, description, amount_required, tags);
    }

    // Function to pledge funds to a campaign
    function donate(uint8 id) external payable {
        Campaign storage campaign = campaigns[id];
        require(!campaign.donation_complete, "donation complete");

        campaign.amount_donated += uint64(msg.value);
        pledgedAmount[id][msg.sender] += uint64(msg.value);

        emit Pledge(id, msg.sender, uint64(msg.value));
    }

    // Function for the campaign admin to claim the funds if the goal is met
    function claim(uint8 id) external {
        Campaign storage campaign = campaigns[id];
        require(msg.sender == campaign.admin, "not admin");
        require(campaign.amount_donated >= campaign.amount_required, "donated < required");
        require(!campaign.donation_complete, "donation complete");

        campaign.donation_complete = true;
        campaign.admin.transfer(campaign.amount_donated);

        emit Claim(id);
    }

    // Cross-chain messaging function to send campaign details to another chain
    function sendMessage(uint256 destinationChainId, uint8 campaignId) external payable {
        require(campaigns[campaignId].admin != address(0), "Invalid campaign");

        if (!_isValidChainId(destinationChainId)) revert InvalidDestinationChainId();

        uint256 crossChainGas = 2 * (10 ** 18);
        uint256 zetaValueAndGas = _zetaConsumer.getZetaFromEth{ value: msg.value }(
            address(this),
            crossChainGas
        );
        _zetaToken.approve(address(connector), zetaValueAndGas);

        connector.send(
            ZetaInterfaces.SendInput({
                destinationChainId: destinationChainId,
                destinationAddress: interactorsByChainId[destinationChainId],
                destinationGasLimit: 300000,
                message: abi.encode(campaignId),
                zetaValueAndGas: zetaValueAndGas,
                zetaParams: abi.encode("")
            })
        );
    }

}