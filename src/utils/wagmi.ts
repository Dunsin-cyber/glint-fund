import { http, createConfig, createStorage } from "wagmi";
import { zetachainAthensTestnet } from "wagmi/chains";
import { metaMask } from "wagmi/connectors";

declare module "wagmi" {
  interface Register {
    config: typeof config;
  }
}

export const config = createConfig({
  chains: [zetachainAthensTestnet],
  connectors: [metaMask()],
  transports: {
    [zetachainAthensTestnet.id]: http(),
  },
});

// const storage = c  reateStorage({ storage: localStorage });
