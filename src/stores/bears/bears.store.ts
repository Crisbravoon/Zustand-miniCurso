import { create } from "zustand";

interface Bears {
  id: number;
  name: string;
}

interface BearsState {
  blackBears: number;
  polarBears: number;
  pandaBears: number;

  bears: Bears[];

  computed: {
    totalBears: number;
  };

  increaseBears: (
    type: "blackBears" | "pandaBears" | "polarBears",
    by: number
  ) => void;

  doNothing: () => void;

  clearBear: () => void;
  addBear: () => void;
}

export const useBearStore = create<BearsState>()((set, get) => ({
  bears: [
    {
      id: 1,
      name: "Oso #1",
    },
  ],

  computed: {
    get totalBears() {
      return get().polarBears + get().pandaBears + get().blackBears;
    },
  },

  blackBears: 10,
  polarBears: 5,
  pandaBears: 2,

  increaseBears: (type, by) => set((state) => ({ [type]: state[type] + by })),

  doNothing: () => set((state) => ({ bears: [...state.bears] })),

  addBear: () =>
    set((state) => ({
      bears: [
        ...state.bears,
        { id: state.bears.length + 1, name: `Oso #${state.bears.length + 1}` },
      ],
    })),

  clearBear: () => set({ bears: [] }),
}));
