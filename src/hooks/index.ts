import { useAccount, useReadContract } from "wagmi";
import contractAbi from "../contract/CrowdFunding-abi.json";

const contractAddress = "0x835F1F5a5578E49b5D163954cCdA60333c3ffC89";

type ReturnType = {
  isLoading: boolean;
  data: any;
  error: any;
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
