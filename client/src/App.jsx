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
import { setGlobalState, useGlobalState } from "./store";

const App = () => {
  const [connectedAccount] = useGlobalState("connectedAccount");
  const [locks] = useGlobalState("locks");

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
              <h1>Locks: ({locks})</h1>
            </div>
            {/* <div className="new-lock">
              <button onClick={newLock} className="get-locks-btn">
                Make Lock
              </button>
              <input
                onChange={(e) =>
                  setGlobalState("lockedFor", parseInt(e.target.value))
                }
                placeholder="lock period (s)"
              />
            </div> */}
          </>
        )}
      </header>
    </div>
  );
};
export default App;
