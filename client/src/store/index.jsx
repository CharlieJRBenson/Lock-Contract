import { createGlobalState } from "react-hooks-global-state";

const { setGlobalState, useGlobalState } = createGlobalState({
  connectedAccount: "",
  locks: [],
  lockedFor: "",
  currentLockAddress: "",
  lock: {
    creator: "",
    owner: "",
    unlockDate: "",
    createdAt: "",
    balance: "",
  },
});
export { useGlobalState, setGlobalState };
