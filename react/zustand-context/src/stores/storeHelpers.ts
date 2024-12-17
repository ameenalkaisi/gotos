import { StateCreator, StoreApi, UseBoundStore } from "zustand";

export type StoreSelector<ValuesAndMutators> = Parameters<UseBoundStore<StoreApi<ValuesAndMutators>>>[0];

export type StoreStateCreator<Values, ValuesAndMutators> = StateCreator<
  Values,
  [],
  [],
  ValuesAndMutators
>;
