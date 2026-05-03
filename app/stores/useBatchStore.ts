import { create } from "zustand";

export type BatchApple = {
  id: number;
  name: string;
  imageUrl: string | null;
  category: string;
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

      return {
        apples: [
          ...state.apples,
          {
            ...apple,
            percentage: 0,
          },
        ],
      };
    }),

  removeApple: (appleId) =>
    set((state) => ({
      apples: state.apples.filter((apple) => apple.id !== appleId),
    })),

  updatePercentage: (appleId, percentage) =>
    set((state) => ({
      apples: state.apples.map((apple) =>
        apple.id === appleId ? { ...apple, percentage } : apple,
      ),
    })),

  clearBatch: () => set({ apples: [] }),
}));
