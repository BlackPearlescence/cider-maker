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
  weight: number;
};

type BatchStore = {
  apples: BatchApple[];
  addApple: (apple: Omit<BatchApple, "weight">) => void;
  removeApple: (appleId: number) => void;
  updateWeight: (appleId: number, weight: number) => void;
  clearBatch: () => void;
};

export const useBatchStore = create<BatchStore>((set) => ({
  apples: [],

  addApple: (apple) =>
    set((state) => {
      const alreadyAdded = state.apples.some((item) => item.id === apple.id);

      if (alreadyAdded) return state;

      return {
        apples: [
          ...state.apples,
          {
            ...apple,
            weight: 1,
          },
        ],
      };
    }),

  removeApple: (appleId) =>
    set((state) => ({
      apples: state.apples.filter((apple) => apple.id !== appleId),
    })),

  updateWeight: (appleId, weight) =>
    set((state) => ({
      apples: state.apples.map((apple) =>
        apple.id === appleId
          ? { ...apple, weight: Math.max(0, weight) }
          : apple,
      ),
    })),

  clearBatch: () => set({ apples: [] }),
}));
