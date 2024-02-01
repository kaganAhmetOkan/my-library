import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { setLocal, getLocal } from "../lib/localStorage";

export function usePersistingState<P = undefined>(key: string, initialState?: P): [P, Dispatch<SetStateAction<P>>];

export function usePersistingState<P = undefined>(
  key: string, initialState?: P | undefined
): [P | undefined, Dispatch<SetStateAction<P | undefined>>] {
  // new persisted state
  const [value, setValue] = useState<P | undefined>(initialState);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const oldState = getLocal(key);
      if (oldState !== null) setValue(oldState);
    };
  }, [key]);

  // update persisted state
  useEffect(() => {
    function updateState(event: StorageEvent) {
      if (event.key !== key) return;
      if (!event.newValue) return;
      if (event.newValue === event.oldValue) return;

      const newValue = JSON.parse(event.newValue);
      setValue(newValue);
    };

    window.addEventListener("storage", updateState);

    return () => window.removeEventListener("storage", updateState);
  }, [key]);

  // reducer function for updating value and local storage together
  function setState(
    state: SetStateAction<P | undefined>
  ) {
    setValue(state);
    setLocal(key, state);
  };

  return [value, setState];
};