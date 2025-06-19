import { create } from "zustand";

type TGameStoreValues = {
  winner: string;
  date: Date;
  player1: string;
  player2: string;
  duration: number;
  moves: number;
};

type TPartialGameStoreValues = Partial<TGameStoreValues> & {
  setGameStoreValues: (values: Partial<TPartialGameStoreValues>) => void;
};

export const useGameStore = create<TPartialGameStoreValues>((set) => ({
  setGameStoreValues: (values) => {
    console.log(values);
    set((state) => ({ ...state, ...values }));
  },
}));
