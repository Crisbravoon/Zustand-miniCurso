// import { CustomSessionStorage } from "../storages/session.storage";
import { create, type StateCreator } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { firebaseStorage } from "../storages/firebase.storage";
import { logger } from "../middlewares/logger.middleware";

interface PersonState {
  firstName: string;
  lastName: string;
  setFirstName: (value: string) => void;
  setLastName: (value: string) => void;
}

const storeApi: StateCreator<PersonState, [["zustand/devtools", never]]> = (
  set
) => ({
  firstName: "",
  lastName: "",

  setFirstName: (value: string) =>
    set({ firstName: value }, false, "setFirstName"),
  setLastName: (value: string) =>
    set({ lastName: value }, false, "setLastName"),
});

export const usePersonStore = create<PersonState>()(
  logger(
    devtools(
      persist(storeApi, {
        name: "person-storage",
        storage: firebaseStorage,
      })
    )
  )
);
