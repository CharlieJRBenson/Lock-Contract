import { ethers } from "ethers";
import { setGlobalState } from "../store";

import {
  LockFactoryAbi,
  LockAbi,
  LockFactoryAddress,
} from "../utils/constants.js";

const { ethereum } = window;

const getLockFactContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  return new ethers.Contract(LockFactoryAddress, LockFactoryAbi, signer);
};

const getLockContract = ({ currentLockAddress }) => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();

  return new ethers.Contract(currentLockAddress, LockAbi, signer);
};

const isWalletConnected = async () => {
  try {
    if (!ethereum) return alert("Please install Metamask");
    const accounts = await ethereum.request({ method: "eth_accounts" });
    if (accounts.length) {
      setGlobalState("connectedAccount", accounts[0]);
    } else {
      console.log("No accounts found.");
    }
  } catch (error) {
    console.log(error);
    throw new Error("No Ethereum Object");
  }
};

const getLocks = async () => {
  try {
    if (!ethereum) return alert("Please install Metamask");

    const lockFactContract = getLockFactContract();
    const locks = await lockFactContract
      .getLocks({ connectedAccount })
      .reverse();

    setGlobalState("locks", locks);
    return locks;
  } catch (error) {
    console.log(error);
    throw new Error("No Ethereum Object");
  }
};

const connectWallet = async () => {
  try {
    if (!ethereum) return alert("Please install Metamask");
    const accounts = await ethereum.request({ method: "eth_requestAccounts" });
    setGlobalState("connectedAccount", accounts[0]);
  } catch (error) {
    console.log(error);
    throw new Error("No Ethereum Object");
  }
};

const newLock = async ({ connectedAccount, lockedFor }) => {
  try {
    if (!ethereum) return alert("Please install Metamask");
    const lockFactContract = getLockFactContract();

    const createlock = await lockFactContract.newLock(
      connectedAccount,
      lockedFor
    );

    console.log(`Loading deploy- ${createlock.hash}`);
    await createlock.wait();
    console.log(`Successsful deploy - ${createlock.hash}`);

    const locks = await getLocks();
    console.log(`Locks Array : ${locks}`);
    window.location.reload();
  } catch (error) {
    console.log(error);
    throw new Error("No Ethereum Object");
  }
};

const getTimeStamp = async () => {
  try {
    if (!ethereum) return alert("Please install Metamask");
    const lockFactContract = getLockFactContract();

    const timestamp = await lockFactContract.getTimeStamp();
    console.log(`Timestamp: ${timestamp}`);
    return timestamp;
  } catch (error) {
    console.log(error);
    throw new Error("No Ethereum Object");
  }
};

const getLockInfo = async () => {
  try {
    if (!ethereum) return alert("Please install Metamask");
    const lockContract = getLockContract();

    const {
      0: _creator,
      1: _owner,
      2: _unlockDate,
      3: _createdAt,
      4: _balance,
    } = await lockContract.getInfo();

    const info = {
      creator: _creator,
      owner: _owner,
      unlockDate: _unlockDate,
      createdAt: _createdAt,
      balance: _balance,
    };

    setGlobalState("lock", info);
    return info;
  } catch (error) {
    console.log(error);
    throw new Error("No Ethereum Object");
  }
};

const withdraw = async () => {
  try {
    if (!ethereum) return alert("Please install Metamask");
    const lockContract = getLockContract();

    const wd = await lockContract.withdraw();
    console.log(`Loading withdrawal ${wd.hash}`);
    await wd.wait();
    console.log(`Successful withdrawal ${wd.hash}`);
  } catch (error) {
    console.log(error);
    throw new Error("No Ethereum Object");
  }
};

export {
  getLockFactContract,
  getLockContract,
  isWalletConnected,
  getLocks,
  connectWallet,
  newLock,
  getTimeStamp,
  getLockInfo,
  withdraw,
};
