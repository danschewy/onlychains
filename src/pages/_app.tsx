import { type AppType } from "next/app";

import { api } from "~/utils/api";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import "~/styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
// import { trpc } from "~/utils/trpc";
import "@rainbow-me/rainbowkit/styles.css";
import {
  RainbowKitProvider,
  getDefaultWallets,
  connectorsForWallets,
} from "@rainbow-me/rainbowkit";
import {
  argentWallet,
  trustWallet,
  ledgerWallet,
} from "@rainbow-me/rainbowkit/wallets";
import {
  RainbowKitSiweNextAuthProvider,
  GetSiweMessageOptions,
} from "@rainbow-me/rainbowkit-siwe-next-auth";

import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import "./styles.css";

const getSiweMessageOptions: GetSiweMessageOptions = () => ({
  statement: "Sign in to OnlyChains",
});

import "./styles.css";
// import { alchemyProvider } from "wagmi/providers/alchemy";

import { WagmiConfig, configureChains, mainnet, createConfig } from "wagmi";


import { publicProvider } from "wagmi/providers/public";

const projectId = "OnlyChains";

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [mainnet],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "OnlyChains",
  projectId,
  chains,
});

const config = createConfig({
  autoConnect: true,
  publicClient,
  connectors,
  webSocketPublicClient,
});

const MyApp: AppType = ({ Component, pageProps }: AppProps) => {
  return (
    <WagmiConfig config={config}>
      <SessionProvider refetchInterval={0} session={pageProps.session}>
        <RainbowKitSiweNextAuthProvider
          getSiweMessageOptions={getSiweMessageOptions}
        >
          <RainbowKitProvider chains={[mainnet]} coolMode>
            <ToastContainer />

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
        </RainbowKitSiweNextAuthProvider>
      </SessionProvider>
    </WagmiConfig>
  );
};

export default api.withTRPC(MyApp);
