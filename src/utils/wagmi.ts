import { http, createConfig, createStorage } from "wagmi";
import { zetachainAthensTestnet } from "wagmi/chains";
import { injected } from "wagmi/connectors";

declare module "wagmi" {
  interface Register {
    config: typeof config;
  }
}

export const config = createConfig({
  chains: [zetachainAthensTestnet],
  connectors: [injected()],
  transports: {
    [zetachainAthensTestnet.id]: http(),
  },
});

// const storage = createStorage({ storage: localStorage });
