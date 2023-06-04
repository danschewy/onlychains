import { ConnectButton } from "@rainbow-me/rainbowkit";

export const Header = () => (
  <section
    data-testid="header"
    className="absolute top-0 flex w-screen flex-row justify-between p-4"
  >
    <span className="text-xl font-extrabold tracking-tight text-white ">
      Only<span className="text-[hsl(280,100%,70%)]">Chains</span>
    </span>
    <ConnectButton />
  </section>
);
