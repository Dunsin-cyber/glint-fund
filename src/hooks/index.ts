import { useWriteContract, useReadContract } from "wagmi";
import contractAbi from "../contract/CrowdFunding-abi.json";
import type { Address } from "viem";
import { config } from "../utils/wagmi";

export const contractAddress = "0x8F890851A4a789F273C3dCE9505B1A1B2ddCCDD7";

type ReturnType = {
  isLoading: boolean;
  data: any;
  error: any;
  refetch?: any;
};

export const useGetACampaign = (id: any): ReturnType => {
  console.log("contract called with param", id);
  const { data, error } = useReadContract({
    abi: contractAbi.abi,
    address: contractAddress,
    functionName: "campaigns",
    args: [id],
  });
  console.log("contract success with data", data);
  return {
    isLoading: !data && !error,
    data,
    error,
  };
};

export const useGetAllCampaigns = (): ReturnType => {
  const { data, error, refetch } = useReadContract({
    abi: contractAbi.abi,
    address: contractAddress,
    functionName: "getAllCampaigns",
  });

  return {
    isLoading: !data && !error,
    data,
    error,
    refetch,
  };
};

export const useGetUserProfile = (address: Address | undefined): ReturnType => {
  const { error, data } = useReadContract({
    abi: contractAbi.abi,
    address: contractAddress,
    functionName: "getUserProfile",
    args: [address],
  });

  return {
    isLoading: !data && !error,
    data,
    error,
  };
};

export const useGetAllUsers = (): ReturnType => {
  const { data, error } = useReadContract({
    abi: contractAbi.abi,
    address: contractAddress,
    functionName: "getAllUsers",
  });

  return {
    isLoading: !data && !error,
    data,
    error,
  };
};
