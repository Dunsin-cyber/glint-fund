/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../common";
import type {
  Crowdfunding,
  CrowdfundingInterface,
} from "../../contracts/Crowdfunding";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "systemContractAddress",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    name: "OnlySystemContract",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint8",
        name: "id",
        type: "uint8",
      },
    ],
    name: "Claim",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint8",
        name: "id",
        type: "uint8",
      },
      {
        indexed: true,
        internalType: "address",
        name: "admin",
        type: "address",
      },
      {
        indexed: false,
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "description",
        type: "string",
      },
      {
        indexed: false,
        internalType: "uint64",
        name: "amount_required",
        type: "uint64",
      },
      {
        indexed: false,
        internalType: "string[]",
        name: "tags",
        type: "string[]",
      },
    ],
    name: "Launch",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint8",
        name: "id",
        type: "uint8",
      },
      {
        indexed: true,
        internalType: "address",
        name: "pledger",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint64",
        name: "amount",
        type: "uint64",
      },
    ],
    name: "Pledge",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint8",
        name: "id",
        type: "uint8",
      },
      {
        indexed: true,
        internalType: "address",
        name: "pledger",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint64",
        name: "amount",
        type: "uint64",
      },
    ],
    name: "Refund",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint8",
        name: "id",
        type: "uint8",
      },
      {
        indexed: true,
        internalType: "address",
        name: "pledger",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint64",
        name: "amount",
        type: "uint64",
      },
    ],
    name: "Unpledge",
    type: "event",
  },
  {
    inputs: [],
    name: "campaignCount",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    name: "campaigns",
    outputs: [
      {
        internalType: "uint8",
        name: "id",
        type: "uint8",
      },
      {
        internalType: "address payable",
        name: "admin",
        type: "address",
      },
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "uint64",
        name: "amount_required",
        type: "uint64",
      },
      {
        internalType: "bool",
        name: "donation_complete",
        type: "bool",
      },
      {
        internalType: "string",
        name: "description",
        type: "string",
      },
      {
        internalType: "uint64",
        name: "amount_donated",
        type: "uint64",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint8",
        name: "id",
        type: "uint8",
      },
    ],
    name: "claim",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "string",
        name: "description",
        type: "string",
      },
      {
        internalType: "uint64",
        name: "amount_required",
        type: "uint64",
      },
      {
        internalType: "string[]",
        name: "tags",
        type: "string[]",
      },
    ],
    name: "create",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint8",
        name: "id",
        type: "uint8",
      },
    ],
    name: "donate",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "bytes",
            name: "origin",
            type: "bytes",
          },
          {
            internalType: "address",
            name: "sender",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "chainID",
            type: "uint256",
          },
        ],
        internalType: "struct zContext",
        name: "context",
        type: "tuple",
      },
      {
        internalType: "address",
        name: "zrc20",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "message",
        type: "bytes",
      },
    ],
    name: "onCrossChainCall",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "pledgedAmount",
    outputs: [
      {
        internalType: "uint64",
        name: "",
        type: "uint64",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "systemContract",
    outputs: [
      {
        internalType: "contract SystemContract",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

const _bytecode =
  "0x60806040523480156200001157600080fd5b50604051620019e5380380620019e5833981810160405281019062000037919062000095565b806000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550506200011a565b6000815190506200008f8162000100565b92915050565b600060208284031215620000ae57620000ad620000fb565b5b6000620000be848285016200007e565b91505092915050565b6000620000d482620000db565b9050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b600080fd5b6200010b81620000c7565b81146200011757600080fd5b50565b6118bb806200012a6000396000f3fe60806040526004361061007b5760003560e01c8063b115ef411161004e578063b115ef4114610154578063bb88b7691461017d578063de43156e146101a8578063e5b0b36b146101d15761007b565b80637274e30d1461008057806395d4063f146100ab578063a4bf1c06146100d4578063aec49e9014610117575b600080fd5b34801561008c57600080fd5b506100956101ed565b6040516100a291906112f8565b60405180910390f35b3480156100b757600080fd5b506100d260048036038101906100cd9190611003565b610200565b005b3480156100e057600080fd5b506100fb60048036038101906100f69190611003565b61046d565b60405161010e9796959493929190611313565b60405180910390f35b34801561012357600080fd5b5061013e60048036038101906101399190611030565b610621565b60405161014b91906112dd565b60405180910390f35b34801561016057600080fd5b5061017b60048036038101906101769190610ea4565b610657565b005b34801561018957600080fd5b506101926108dc565b60405161019f9190611242565b60405180910390f35b3480156101b457600080fd5b506101cf60048036038101906101ca9190610f5f565b610900565b005b6101eb60048036038101906101e69190611003565b610997565b005b600260009054906101000a900460ff1681565b6000600160008360ff1660ff16815260200190815260200160002090508060000160019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16146102af576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016102a69061127d565b60405180910390fd5b8060030160009054906101000a900467ffffffffffffffff1667ffffffffffffffff168160050160009054906101000a900467ffffffffffffffff1667ffffffffffffffff161015610336576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161032d9061129d565b60405180910390fd5b8060030160089054906101000a900460ff1615610388576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161037f906112bd565b60405180910390fd5b60018160030160086101000a81548160ff0219169083151502179055508060000160019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc8260050160009054906101000a900467ffffffffffffffff1667ffffffffffffffff169081150290604051600060405180830381858888f19350505050158015610431573d6000803e3d6000fd5b507f0ae175440cd9ac12279bbac2afc93724b141516f30c13b6b31f164441ef65cf28260405161046191906112f8565b60405180910390a15050565b60016020528060005260406000206000915090508060000160009054906101000a900460ff16908060000160019054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060010180546104c990611611565b80601f01602080910402602001604051908101604052809291908181526020018280546104f590611611565b80156105425780601f1061051757610100808354040283529160200191610542565b820191906000526020600020905b81548152906001019060200180831161052557829003601f168201915b5050505050908060030160009054906101000a900467ffffffffffffffff16908060030160089054906101000a900460ff169080600401805461058490611611565b80601f01602080910402602001604051908101604052809291908181526020018280546105b090611611565b80156105fd5780601f106105d2576101008083540402835291602001916105fd565b820191906000526020600020905b8154815290600101906020018083116105e057829003601f168201915b5050505050908060050160009054906101000a900467ffffffffffffffff16905087565b60036020528160005260406000206020528060005260406000206000915091509054906101000a900467ffffffffffffffff1681565b6002600081819054906101000a900460ff168092919061067690611674565b91906101000a81548160ff021916908360ff16021790555050604051806101000160405280600260009054906101000a900460ff1660ff1681526020013373ffffffffffffffffffffffffffffffffffffffff1681526020018581526020018281526020018367ffffffffffffffff168152602001600015158152602001848152602001600067ffffffffffffffff1681525060016000600260009054906101000a900460ff1660ff1660ff16815260200190815260200160002060008201518160000160006101000a81548160ff021916908360ff16021790555060208201518160000160016101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060408201518160010190805190602001906107b5929190610b48565b5060608201518160020190805190602001906107d2929190610bce565b5060808201518160030160006101000a81548167ffffffffffffffff021916908367ffffffffffffffff16021790555060a08201518160030160086101000a81548160ff02191690831515021790555060c082015181600401908051906020019061083e929190610b48565b5060e08201518160050160006101000a81548167ffffffffffffffff021916908367ffffffffffffffff1602179055509050503373ffffffffffffffffffffffffffffffffffffffff167f324b428da2a0f864b7a7777ab85ebb823e7c43a11b52ebd21411b7fe7d599a74600260009054906101000a900460ff16868686866040516108ce959493929190611390565b60405180910390a250505050565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff168073ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161461098f576040517f14c6658d0000000000000000000000000000000000000000000000000000000081526004016109869061125d565b60405180910390fd5b505050505050565b6000600160008360ff1660ff16815260200190815260200160002090508060030160089054906101000a900460ff1615610a06576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016109fd906112bd565b60405180910390fd5b348160050160008282829054906101000a900467ffffffffffffffff16610a2d91906114e0565b92506101000a81548167ffffffffffffffff021916908367ffffffffffffffff16021790555034600360008460ff1660ff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282829054906101000a900467ffffffffffffffff16610acc91906114e0565b92506101000a81548167ffffffffffffffff021916908367ffffffffffffffff1602179055503373ffffffffffffffffffffffffffffffffffffffff168260ff167f866ae46188416da4e475d4f889f9fc22044c7d5b62de840ca15b55fceeea848134604051610b3c91906112dd565b60405180910390a35050565b828054610b5490611611565b90600052602060002090601f016020900481019282610b765760008555610bbd565b82601f10610b8f57805160ff1916838001178555610bbd565b82800160010185558215610bbd579182015b82811115610bbc578251825591602001919060010190610ba1565b5b509050610bca9190610c2e565b5090565b828054828255906000526020600020908101928215610c1d579160200282015b82811115610c1c578251829080519060200190610c0c929190610b48565b5091602001919060010190610bee565b5b509050610c2a9190610c4b565b5090565b5b80821115610c47576000816000905550600101610c2f565b5090565b5b80821115610c6b5760008181610c629190610c6f565b50600101610c4c565b5090565b508054610c7b90611611565b6000825580601f10610c8d5750610cac565b601f016020900490600052602060002090810190610cab9190610c2e565b5b50565b6000610cc2610cbd8461141d565b6113f8565b90508083825260208201905082856020860282011115610ce557610ce461173a565b5b60005b85811015610d3357813567ffffffffffffffff811115610d0b57610d0a611730565b5b808601610d188982610e18565b85526020850194506020840193505050600181019050610ce8565b5050509392505050565b6000610d50610d4b84611449565b6113f8565b905082815260208101848484011115610d6c57610d6b61173f565b5b610d778482856115cf565b509392505050565b600081359050610d8e81611829565b92915050565b600082601f830112610da957610da8611730565b5b8135610db9848260208601610caf565b91505092915050565b60008083601f840112610dd857610dd7611730565b5b8235905067ffffffffffffffff811115610df557610df461172b565b5b602083019150836001820283011115610e1157610e1061173a565b5b9250929050565b600082601f830112610e2d57610e2c611730565b5b8135610e3d848260208601610d3d565b91505092915050565b600060608284031215610e5c57610e5b611735565b5b81905092915050565b600081359050610e7481611840565b92915050565b600081359050610e8981611857565b92915050565b600081359050610e9e8161186e565b92915050565b60008060008060808587031215610ebe57610ebd611749565b5b600085013567ffffffffffffffff811115610edc57610edb611744565b5b610ee887828801610e18565b945050602085013567ffffffffffffffff811115610f0957610f08611744565b5b610f1587828801610e18565b9350506040610f2687828801610e7a565b925050606085013567ffffffffffffffff811115610f4757610f46611744565b5b610f5387828801610d94565b91505092959194509250565b600080600080600060808688031215610f7b57610f7a611749565b5b600086013567ffffffffffffffff811115610f9957610f98611744565b5b610fa588828901610e46565b9550506020610fb688828901610d7f565b9450506040610fc788828901610e65565b935050606086013567ffffffffffffffff811115610fe857610fe7611744565b5b610ff488828901610dc2565b92509250509295509295909350565b60006020828403121561101957611018611749565b5b600061102784828501610e8f565b91505092915050565b6000806040838503121561104757611046611749565b5b600061105585828601610e8f565b925050602061106685828601610d7f565b9150509250929050565b600061107c8383611126565b905092915050565b61108d81611530565b82525050565b600061109e8261148a565b6110a881856114ad565b9350836020820285016110ba8561147a565b8060005b858110156110f657848403895281516110d78582611070565b94506110e2836114a0565b925060208a019950506001810190506110be565b50829750879550505050505092915050565b61111181611542565b82525050565b61112081611599565b82525050565b600061113182611495565b61113b81856114be565b935061114b8185602086016115de565b6111548161174e565b840191505092915050565b600061116a82611495565b61117481856114cf565b93506111848185602086016115de565b61118d8161174e565b840191505092915050565b60006111a5602b836114cf565b91506111b08261175f565b604082019050919050565b60006111c86009836114cf565b91506111d3826117ae565b602082019050919050565b60006111eb6012836114cf565b91506111f6826117d7565b602082019050919050565b600061120e6011836114cf565b915061121982611800565b602082019050919050565b61122d81611578565b82525050565b61123c8161158c565b82525050565b60006020820190506112576000830184611117565b92915050565b6000602082019050818103600083015261127681611198565b9050919050565b60006020820190508181036000830152611296816111bb565b9050919050565b600060208201905081810360008301526112b6816111de565b9050919050565b600060208201905081810360008301526112d681611201565b9050919050565b60006020820190506112f26000830184611224565b92915050565b600060208201905061130d6000830184611233565b92915050565b600060e082019050611328600083018a611233565b6113356020830189611084565b8181036040830152611347818861115f565b90506113566060830187611224565b6113636080830186611108565b81810360a0830152611375818561115f565b905061138460c0830184611224565b98975050505050505050565b600060a0820190506113a56000830188611233565b81810360208301526113b7818761115f565b905081810360408301526113cb818661115f565b90506113da6060830185611224565b81810360808301526113ec8184611093565b90509695505050505050565b6000611402611413565b905061140e8282611643565b919050565b6000604051905090565b600067ffffffffffffffff821115611438576114376116fc565b5b602082029050602081019050919050565b600067ffffffffffffffff821115611464576114636116fc565b5b61146d8261174e565b9050602081019050919050565b6000819050602082019050919050565b600081519050919050565b600081519050919050565b6000602082019050919050565b600082825260208201905092915050565b600082825260208201905092915050565b600082825260208201905092915050565b60006114eb82611578565b91506114f683611578565b92508267ffffffffffffffff038211156115135761151261169e565b5b828201905092915050565b60006115298261154e565b9050919050565b600061153b8261154e565b9050919050565b60008115159050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b600067ffffffffffffffff82169050919050565b600060ff82169050919050565b60006115a4826115ab565b9050919050565b60006115b6826115bd565b9050919050565b60006115c88261154e565b9050919050565b82818337600083830152505050565b60005b838110156115fc5780820151818401526020810190506115e1565b8381111561160b576000848401525b50505050565b6000600282049050600182168061162957607f821691505b6020821081141561163d5761163c6116cd565b5b50919050565b61164c8261174e565b810181811067ffffffffffffffff8211171561166b5761166a6116fc565b5b80604052505050565b600061167f8261158c565b915060ff8214156116935761169261169e565b5b600182019050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b600080fd5b600080fd5b600080fd5b600080fd5b600080fd5b600080fd5b600080fd5b6000601f19601f8301169050919050565b7f4f6e6c792073797374656d20636f6e74726163742063616e2063616c6c20746860008201527f69732066756e6374696f6e000000000000000000000000000000000000000000602082015250565b7f6e6f742061646d696e0000000000000000000000000000000000000000000000600082015250565b7f646f6e61746564203c2072657175697265640000000000000000000000000000600082015250565b7f646f6e6174696f6e20636f6d706c657465000000000000000000000000000000600082015250565b6118328161151e565b811461183d57600080fd5b50565b6118498161156e565b811461185457600080fd5b50565b61186081611578565b811461186b57600080fd5b50565b6118778161158c565b811461188257600080fd5b5056fea26469706673582212208deed31e839371a1cfcfc1e53cf754b65796c7525e7b311a2af7339a0a07302864736f6c63430008070033";

type CrowdfundingConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: CrowdfundingConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class Crowdfunding__factory extends ContractFactory {
  constructor(...args: CrowdfundingConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    systemContractAddress: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<Crowdfunding> {
    return super.deploy(
      systemContractAddress,
      overrides || {}
    ) as Promise<Crowdfunding>;
  }
  override getDeployTransaction(
    systemContractAddress: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(systemContractAddress, overrides || {});
  }
  override attach(address: string): Crowdfunding {
    return super.attach(address) as Crowdfunding;
  }
  override connect(signer: Signer): Crowdfunding__factory {
    return super.connect(signer) as Crowdfunding__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): CrowdfundingInterface {
    return new utils.Interface(_abi) as CrowdfundingInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): Crowdfunding {
    return new Contract(address, _abi, signerOrProvider) as Crowdfunding;
  }
}
