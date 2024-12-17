import { createContext, PropsWithChildren, useEffect, useState } from "react";
import { StoreApi } from "zustand";
import { makeSampleStore, SampleStore } from "../stores/sampleStore";

export const SampleStoreContext = createContext<StoreApi<SampleStore> | null>(
  null,
);

interface SampleStoreProviderProps extends PropsWithChildren {
  initialCount: number;
};

export function SampleStoreProvider ({ children, initialCount }: SampleStoreProviderProps) {
  const [sampleStore, setSampleStore] = useState<StoreApi<SampleStore> | null>(null);

  useEffect(() => {
    const sampleStore = makeSampleStore({
      count: initialCount
    });

    setSampleStore(sampleStore);
  }, []);

  if(!sampleStore) {
    return <p>Loading...</p>
  }

  return <SampleStoreContext.Provider value={sampleStore}>
    {children}
  </SampleStoreContext.Provider>
};
