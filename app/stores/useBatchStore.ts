import { create } from "zustand";

export type BatchApple = {
  id: number;
  name: string;
  imageUrl: string | null;
  category: string;
  species: string;
  origin: string;
  flavor: string;
  brix: number;
  ph: number;
  tannin: number;
  description: string;
  percentage: number;
};

type BatchStore = {
  apples: BatchApple[];
  addApple: (apple: Omit<BatchApple, "percentage">) => void;
  removeApple: (appleId: number) => void;
  updatePercentage: (appleId: number, percentage: number) => void;
  clearBatch: () => void;
};

export const useBatchStore = create<BatchStore>((set) => ({
  apples: [],

  addApple: (apple) =>
    set((state) => {
      const alreadyAdded = state.apples.some((item) => item.id === apple.id);

      if (alreadyAdded) return state;

      const nextApples = [
        ...state.apples,
        {
          ...apple,
          percentage: 0,
        },
      ];

      const equalPercentage = 100 / nextApples.length;

      return {
        apples: nextApples.map((apple) => ({
          ...apple,
          percentage: equalPercentage,
        })),
      };
    }),

  removeApple: (appleId) =>
    set((state) => ({
      apples: state.apples.filter((apple) => apple.id !== appleId),
    })),

  // updatePercentage: (appleId, percentage) =>
  //   set((state) => ({
  //     apples: state.apples.map((apple) =>
  //       apple.id === appleId ? { ...apple, percentage } : apple,
  //     ),
  //   })),

  updatePercentage: (appleId, percentage) =>
    set((state) => {
      const apples = [...state.apples];
      const editedIndex = apples.findIndex((apple) => apple.id === appleId);

      if (editedIndex === -1) return state;

      const currentApple = apples[editedIndex];
      const nextPercentage = Math.max(0, Math.min(100, percentage));
      const difference = nextPercentage - currentApple.percentage;

      const absorberIndex = apples.findIndex(
        (apple, index) =>
          index !== editedIndex && apple.percentage - difference >= 0,
      );

      if (absorberIndex === -1) return state;

      apples[editedIndex] = {
        ...currentApple,
        percentage: nextPercentage,
      };

      apples[absorberIndex] = {
        ...apples[absorberIndex],
        percentage: apples[absorberIndex].percentage - difference,
      };

      return { apples };
    }),

  clearBatch: () => set({ apples: [] }),
}));
