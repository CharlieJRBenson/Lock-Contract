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
  const [locks] = useGlobalState("locks");
  const [lockedFor] = useGlobalState("lockedFor");

  useEffect(() => {
    isWalletConnected();
    getLocks();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        {!connectedAccount ? (
          <div className="connect-wallet">
            <button onClick={connectWallet} className="connect-btn">
              Connect Wallet
            </button>
          </div>
        ) : (
          <>
            <div className="locks">
              <button onClick={getLocks} className="get-locks-btn">
                Get Locks
              </button>
              <h1>Locks: ({connectedAccount})</h1>
            </div>
            <div className="new-lock">
              <button
                onClick={() => newLock({ connectWallet }, "100")}
                className="get-locks-btn"
              >
                Make Lock
              </button>
              <input
                onChange={(e) => setGlobalState("lockedFor", e.target.value)}
                placeholder="lock period (s)"
              />
            </div>
          </>
        )}
      </header>
    </div>
  );
};
export default App;
