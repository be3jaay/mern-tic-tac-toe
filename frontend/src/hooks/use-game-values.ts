import { useGameStore } from "@/store/game-store";

export const useGameStoreValues = () => {
  const winner = useGameStore((state) => state.winner);
  const player1 = useGameStore((state) => state.player1);
  const player2 = useGameStore((state) => state.player2);
  const moves = useGameStore((state) => state.moves);
  const setGameStoreValues = useGameStore((state) => state.setGameStoreValues);

  return { winner, player1, player2, moves, setGameStoreValues };
};
