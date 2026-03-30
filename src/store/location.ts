import { locations, type LocationItem } from "@constants";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface LocationState {
  activeLocation: LocationItem | null;           // allow null for resets
  setActiveLocation: (location: LocationItem) => void;
  resetActiveLocation: () => void;
}

const DEFAULT_LOCATION: LocationItem = locations.work;

export const useLocationStore = create<LocationState>()(
  immer((set) => ({
    activeLocation: DEFAULT_LOCATION,             // default active location

    setActiveLocation: (location: LocationItem) =>
      set((state) => {
        state.activeLocation = location;
      }),

    resetActiveLocation: () =>
      set((state) => {
        state.activeLocation = DEFAULT_LOCATION; // reset to default
      }),
  }))
);