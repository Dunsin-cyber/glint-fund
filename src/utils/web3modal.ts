import { createWeb3Modal } from "@web3modal/wagmi/react";
import { defaultWagmiConfig } from "@web3modal/wagmi/react/config";

import { WagmiProvider } from "wagmi";
import { zetachainAthensTestnet } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// 0. Setup queryClient
const queryClient = new QueryClient();

// 1. Get projectId from https://cloud.walletconnect.com
// const projectId = process.env.REACT_APP_PROJECT_ID;

const projectId = "70479ac64b436db61c95139fc7f1ee88";

// 2. Create wagmiConfig
const metadata = {
  name: "ZetaFund",
  description:
    "funding are 100 percent on-chain, secure and tamper-proof on the zetachain blockchain. You can fund with any of the solana tokens but  primarily with solana",
  url:
    process.env.NODE_ENV === "production"
      ? "http://localhost:3000"
      : "http://localhost:3000",
  icons: [
    process.env.NODE_ENV === "production"
      ? "http://localhost:3000"
      : "http://localhost:3000",
  ],
};

const chains = [zetachainAthensTestnet] as const;
const config = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
});

// 3. Create modal
createWeb3Modal({
  wagmiConfig: config,
  projectId,
  enableAnalytics: true, // Optional - defaults to your Cloud configuration
  enableOnramp: true, // Optional - false as default
});
