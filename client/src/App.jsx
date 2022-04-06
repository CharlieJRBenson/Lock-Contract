import { useEffect } from "react";
import {
  getLockFactContract,
  getLockContract,
  isWalletConnected,
  getLocks,
  connectWallet,
  newLock,
  getTimeStamp,
  getLockInfo,
  withdraw,
} from "./shared/Lock";
import { useGlobalState } from "./store";

const App = () => {
  const [connectedAccount] = useGlobalState("connectedAccount");
  useEffect(() => {
    isWalletConnected();
    getLocks();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Hero />
      {!connectedAccount ? (
        <div className="text-center mb-10">
          <button
            onClick={connectWallet}
            className="text-white bg-blue-500 py-2 px-5 rounded-xl drop-shadow-xl border border-transparent hover:bg-transparent hover:text-blue-500 hover:border hover:border-blue-500 focus:outline-none focus:ring"
          >
            Connect Wallet
          </button>
        </div>
      ) : (
        <>
          <Tabuler />
          <AddTransactionCard />
        </>
      )}
    </div>
  );
};
