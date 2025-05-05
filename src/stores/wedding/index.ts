import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

import { createPersonSlice, PersonSlice } from "./person.slice";
import { createGuestCount, GuestSlice } from "./guest.slice";
import { createDateSlice, DateSlice } from "./date.salice";
import { ConfirmationSlice, confirmationSlice } from "./confirmation.slice";

type ShareState = PersonSlice & GuestSlice & DateSlice & ConfirmationSlice;

export const useWeddingBoundStore = create<ShareState>()(
  persist(
    devtools((...a) => ({
      ...createPersonSlice(...a),
      ...createGuestCount(...a),
      ...createDateSlice(...a),
      ...confirmationSlice(...a),
    })),
    { name: "wddding-store" }
  )
);
