/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { ethers } from "ethers";
import {
  FactoryOptions,
  HardhatEthersHelpers as HardhatEthersHelpersBase,
} from "@nomiclabs/hardhat-ethers/types";

import * as Contracts from ".";

declare module "hardhat/types/runtime" {
  interface HardhatEthersHelpers extends HardhatEthersHelpersBase {
    getContractFactory(
      name: "IZRC20",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IZRC20__factory>;
    getContractFactory(
      name: "ZContract",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ZContract__factory>;
    getContractFactory(
      name: "SystemContract",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.SystemContract__factory>;
    getContractFactory(
      name: "SystemContractErrors",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.SystemContractErrors__factory>;
    getContractFactory(
      name: "OnlySystem",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.OnlySystem__factory>;
    getContractFactory(
      name: "Crowdfunding",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Crowdfunding__factory>;

    getContractAt(
      name: "IZRC20",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IZRC20>;
    getContractAt(
      name: "ZContract",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ZContract>;
    getContractAt(
      name: "SystemContract",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.SystemContract>;
    getContractAt(
      name: "SystemContractErrors",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.SystemContractErrors>;
    getContractAt(
      name: "OnlySystem",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.OnlySystem>;
    getContractAt(
      name: "Crowdfunding",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.Crowdfunding>;

    // default types
    getContractFactory(
      name: string,
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<ethers.ContractFactory>;
    getContractFactory(
      abi: any[],
      bytecode: ethers.utils.BytesLike,
      signer?: ethers.Signer
    ): Promise<ethers.ContractFactory>;
    getContractAt(
      nameOrAbi: string | any[],
      address: string,
      signer?: ethers.Signer
    ): Promise<ethers.Contract>;
  }
}
