import { type AppType } from "next/app";

import { api } from "~/utils/api";

import "~/styles/globals.css";

import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig, mainnet } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";

const { chains, publicClient } = configureChains(
  [mainnet],
  [alchemyProvider({ apiKey: process.env.ALCHEMY_ID ?? "" }), publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "OnlyChains",
  projectId: "YOUR_PROJECT_ID",
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={[mainnet]}>
        <Component {...pageProps} />
      </RainbowKitProvider>
    </WagmiConfig>
  );
};

export default api.withTRPC(MyApp);
