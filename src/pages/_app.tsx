import { type AppType } from "next/app";

import { api } from "~/utils/api";

import "~/styles/globals.css";

import "@rainbow-me/rainbowkit/styles.css";
import {
  ConnectButton,
  getDefaultWallets,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
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
      <RainbowKitProvider chains={[mainnet]} coolMode>
        <section
          data-testid="header"
          className="absolute top-0 z-50 flex w-screen flex-row justify-between p-4"
        >
          <span className="text-xl font-extrabold tracking-tight text-white ">
            Only<span className="text-[hsl(280,100%,70%)]">Chains</span>
          </span>
          <ConnectButton />
        </section>
        <Component {...pageProps} />
      </RainbowKitProvider>
    </WagmiConfig>
  );
};

export default api.withTRPC(MyApp);
