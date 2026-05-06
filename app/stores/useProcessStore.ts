import { create } from "zustand";
import type { FruitMustPreparation, ProcessStore } from "../lib/types";

type ProcessStoreActions = {
  updateFruitMustPreparation: <Key extends keyof FruitMustPreparation>(
    key: Key,
    value: FruitMustPreparation[Key],
  ) => void;
  toggleMustAdjustment: (adjustment: string) => void;
};

export const useProcessStore = create<ProcessStore & ProcessStoreActions>(
  (set) => ({
    fruitMustPreparation: {
      sortingWashing: "yes",
      sweating: "none",
      millingMethod: "standard-crush",
      maceration: "none",
      prePressSulfite: "none",
      pressingMethod: "basket-press",
      juiceSettling: "none",
      mustAdjustments: [],
    },

    fermentationPlan: {},
    agingPlan: {},
    finishingPlan: {},
    carbonationPlan: {},

    updateFruitMustPreparation: (key, value) =>
      set((state) => ({
        fruitMustPreparation: {
          ...state.fruitMustPreparation,
          [key]: value,
        },
      })),

    toggleMustAdjustment: (adjustment) =>
      set((state) => {
        const current = state.fruitMustPreparation.mustAdjustments;

        return {
          fruitMustPreparation: {
            ...state.fruitMustPreparation,
            mustAdjustments: current.includes(adjustment)
              ? current.filter((item) => item !== adjustment)
              : [...current, adjustment],
          },
        };
      }),
  }),
);
