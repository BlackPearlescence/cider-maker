import { create } from "zustand";
import type {
  FermentationPlan,
  FruitMustPreparation,
  ProcessStore,
} from "../lib/types";

type ProcessStoreActions = {
  updateFruitMustPreparation: <Key extends keyof FruitMustPreparation>(
    key: Key,
    value: FruitMustPreparation[Key],
  ) => void;
  toggleMustAdjustment: (adjustment: string) => void;
  updateFermentationPlan: <Key extends keyof FermentationPlan>(
    key: Key,
    value: FermentationPlan[Key],
  ) => void;
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

    fermentationPlan: {
      fermentationStyle: "pitched",
      yeastCategory: "cider",
      fermentationTemperature: "cool",
      nutrientPlan: "simple",
      targetFinish: "dry",
      vessel: "carboy",
      primaryDuration: "standard",
    },
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

    updateFermentationPlan: (key, value) =>
      set((state) => ({
        fermentationPlan: {
          ...state.fermentationPlan,
          [key]: value,
        },
      })),
  }),
);
