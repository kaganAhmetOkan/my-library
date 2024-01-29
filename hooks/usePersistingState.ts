import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { setLocal, getLocal } from "../lib/localStorage";

export function usePersistingState<P = undefined>(key: string, initialState?: P): [P, Dispatch<SetStateAction<P>>];

export function usePersistingState<P = undefined>(
  key: string, initialState?: P | undefined
): [P | undefined, Dispatch<SetStateAction<P | undefined>>] {
  // old persisted state
  const [persistingState, setPersistingState] = useState<P | undefined>();

  // fetch old persisted state
  useEffect(() => {
    setPersistingState(getLocal(key));
  }, [key]);

  // new persisted state
  const [value, setValue] = useState<P | undefined>(persistingState ?? initialState);

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

  // update local storage
  useEffect(() => {
    setLocal(key, value);
  }, [key, value]);

  return [value, setValue];
};