import { useAccount, useReadContract } from "wagmi";
import contractAbi from "../contract/CrowdFunding-abi.json";
import type { Address } from "viem";

const contractAddress = "0x973C88CFb3b0011c96BA79fCF6489746e621f87e";

type ReturnType = {
  isLoading: boolean;
  data: any;
  error: any;
  refetch?: any;
};

export const useGetACampaign = (id: number): ReturnType => {
  const { data, error } = useReadContract({
    abi: contractAbi.abi,
    address: contractAddress,
    functionName: "campaigns",
    args: [id],
  });

  return {
    isLoading: !data && !error,
    data,
    error,
  };
};

export const useGetAllCampaigns = (): ReturnType => {
  const { data, error } = useReadContract({
    abi: contractAbi.abi,
    address: contractAddress,
    functionName: "getAllCampaigns",
    // args: [id],
  });

  return {
    isLoading: !data && !error,
    data,
    error,
  };
};

export const useGetUserProfile = (address: Address | undefined): ReturnType => {
  const { data, error, refetch } = useReadContract({
    abi: contractAbi.abi,
    address: contractAddress,
    functionName: "getUserProfile",
    args: ["0x391235BB134D044f0484BAaDfb4c2AA847C4a3EB"],
  });

  return {
    isLoading: !data && !error,
    data,
    error,
    refetch,
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
