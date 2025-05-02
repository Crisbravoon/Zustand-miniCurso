import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Bears {
  id: number;
  name: string;
}

interface BearsState {
  blackBears: number;
  polarBears: number;
  pandaBears: number;

  bears: Bears[];

  totalBears: () => number;

  increaseBears: (
    type: "blackBears" | "pandaBears" | "polarBears",
    by: number
  ) => void;

  doNothing: () => void;

  clearBear: () => void;
  addBear: () => void;
}

export const useBearStore = create<BearsState>()(
  persist(
    (set, get) => ({
      bears: [
        {
          id: 1,
          name: "Oso #1",
        },
      ],

      totalBears: () => {
        return get().polarBears + get().pandaBears + get().blackBears;
      },

      blackBears: 10,
      polarBears: 5,
      pandaBears: 2,

      increaseBears: (type, by) =>
        set((state) => ({ [type]: state[type] + by })),

      doNothing: () => set((state) => ({ bears: [...state.bears] })),

      addBear: () =>
        set((state) => ({
          bears: [
            ...state.bears,
            {
              id: state.bears.length + 1,
              name: `Oso #${state.bears.length + 1}`,
            },
          ],
        })),

      clearBear: () => set({ bears: [] }),
    }),
    { name: "bears-store" }
  )
);
