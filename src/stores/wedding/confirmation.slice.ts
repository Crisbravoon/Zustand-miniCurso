import { StateCreator } from "zustand";

export interface ConfirmationSlice {
  isConfirmed: boolean;
  setIsConfirmand: (isConfirmed: boolean) => void;
}

export const confirmationSlice: StateCreator<ConfirmationSlice> = (set) => ({
  
  isConfirmed: false,

  setIsConfirmand: (isConfirmed: boolean) => set({ isConfirmed }),
});
