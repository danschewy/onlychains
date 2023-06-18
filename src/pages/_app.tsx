import { type AppType } from "next/app";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import type { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";
// import { trpc } from "~/utils/trpc";
import "@rainbow-me/rainbowkit/styles.css";
import {
  ConnectButton,
  getDefaultWallets,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import { RainbowKitSiweNextAuthProvider, GetSiweMessageOptions } from '@rainbow-me/rainbowkit-siwe-next-auth';
import { configureChains, createConfig, WagmiConfig, mainnet } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";

const getSiweMessageOptions: GetSiweMessageOptions = () => ({
  statement: 'Sign in to OnlyChains',
});

import { SessionProvider } from 'next-auth/react';
import type { Session } from 'next-auth';

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

const MyApp: AppType = ({ Component, pageProps }: AppProps) => {
  return (
    <WagmiConfig config={wagmiConfig}>
     <SessionProvider refetchInterval={0} session={pageProps.session} >
      <RainbowKitSiweNextAuthProvider getSiweMessageOptions={getSiweMessageOptions}>

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
