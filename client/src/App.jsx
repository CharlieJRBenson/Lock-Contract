import "./App.css";
import { useState } from "react";
import { ethers } from "ethers";
import LockFactory from "./artifacts/contracts/LockFactory.sol/LockFactory.json";

const LockFactoryAddress = "0xED5d79356875abD608A876E2B6f466716ff5aB83";

function App() {
  //store motivation locally
  const [lockPeriod, setLockPeriod] = useState();

  //request metamask access
  async function requestAccount() {
    await window.ethereum.request({ method: "eth_requestAccounts" });
  }

  //call contract to set motivation
  async function createNewLock() {
    if (typeof window.ethereum == "undefined") return;

    await requestAccount();
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const signerAdd = signer.getAddress();
    const contract = new ethers.Contract(
      motivationAddress,
      Motivation.abi,
      signer
    );
    const createlock = await contract.newLock(signerAdd, lockPeriod);
    await createlock.wait();
    fetchLocks();
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>{motivation}</h1>
        <h4>Add Your Motivational Quote to The Blockchain!</h4>
        <h5>Get a Random Motivation:</h5>
        <button onClick={fetchMotivation}>Random Motivation</button>
        <p>Add a Motivational Quote:</p>
        <button onClick={createNewLock}>Add Motivation</button>
        <input
          onChange={(e) => setLockPeriod(e.target.value)}
          placeholder="your motivation here"
        ></input>
      </header>
    </div>
  );
}

export default App;
