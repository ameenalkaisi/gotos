import { useContext } from "react";
import { shallow } from "zustand/shallow";
import { useStoreWithEqualityFn } from "zustand/traditional";
import { SampleStoreContext } from "../providers/SampleZustandStoreProvider";
import { SampleStore } from "../stores/sampleStore";
import { StoreSelector } from "../stores/storeHelpers";

export function useSampleStore(
  selector: StoreSelector<SampleStore>,
) {
  const sampleStore = useContext(SampleStoreContext);
  if (!sampleStore) {
    throw new Error("Missing SampleStoreProvider");
  }

  return useStoreWithEqualityFn(sampleStore, selector, shallow);
}
