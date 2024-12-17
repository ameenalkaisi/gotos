import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";
import { createStore, StateCreator, StoreApi, UseBoundStore } from "zustand";
import { shallow } from "zustand/shallow";
import { useStoreWithEqualityFn } from "zustand/traditional";
import { StoreSelector, StoreStateCreator } from "../stores/storeHelpers";

// Store
interface AllInOneSampleValues {
	count: number;
}

interface AllInOneSampleMutators {
  increment: () => void;
}

export type AllInOneSampleStore = AllInOneSampleValues & AllInOneSampleMutators;
export type AllInOneSampleStoreStateCreator = StoreStateCreator<AllInOneSampleValues, AllInOneSampleStore>;

export const DEFAULT_VALUES: AllInOneSampleValues = {
  count: 0,
};

const allInOneSampleStoreStateCreator =
  (inputs: Partial<AllInOneSampleValues>): AllInOneSampleStoreStateCreator =>
  (set, get) => ({
    ...DEFAULT_VALUES,
    ...inputs,
		increment: () => {
			const { count } = get();

			set({count: count + 1}) ;
		}
  });

export const makeAllInOneSampleStore = (inputValues: Partial<AllInOneSampleValues>) => {
  return createStore<AllInOneSampleStore>(allInOneSampleStoreStateCreator(inputValues));
};

// Provider
export const AllInOneSampleStoreProvider = ({ children }: PropsWithChildren) => {
  const [allInOneSampleStore, setAllInOneSampleStore] = useState<StoreApi<AllInOneSampleStore> | null>(null);

  useEffect(() => {
    const allInOneSampleStore = makeAllInOneSampleStore({});

    setAllInOneSampleStore(allInOneSampleStore);
  }, []);

  return (
    <AllInOneSampleStoreContext.Provider value={allInOneSampleStore}>
      {children}
    </AllInOneSampleStoreContext.Provider>
  );
};

// Hook
export function useAllInOneSampleStore(
  selector: StoreSelector<AllInOneSampleStore>,
) {
  const allInOneSampleStore = useContext(AllInOneSampleStoreContext);
  if (!allInOneSampleStore) {
    throw new Error("Missing AllInOneSampleStoreProvider");
  }

  return useStoreWithEqualityFn(allInOneSampleStore, selector, shallow);
}

export const AllInOneSampleStoreContext = createContext<StoreApi<AllInOneSampleStore> | null>(
  null,
);
