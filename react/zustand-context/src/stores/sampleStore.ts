import { createStore, StateCreator } from "zustand";
import { StoreStateCreator } from "./storeHelpers";

interface SampleValues {
	count: number;
}

interface SampleMutators {
  increment: () => void;
}

export type SampleStore = SampleValues & SampleMutators;

export type SampleStoreStateCreator = StoreStateCreator<SampleValues, SampleStore>;

export const DEFAULT_VALUES: SampleValues = {
  count: 0,
};

const sampleStoreStateCreator =
  (inputs: Partial<SampleValues>): SampleStoreStateCreator =>
  (set, get) => ({
    ...DEFAULT_VALUES,
    ...inputs,
		increment: () => {
			const { count } = get();

			set({count: count + 1}) ;
		}
  });

export const makeSampleStore = (inputValues: Partial<SampleValues>) => {
  return createStore<SampleStore>(sampleStoreStateCreator(inputValues));
};
