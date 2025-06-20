declare global {}

type TGameHistoryResponse = {
  id: string;
  date: string;
  winner: string;
  player1: string;
  player2: string;
  duration: number;
  moves: number;
};

type TGameHistoryParams = {
  date: string;
  winner: string;
  player1: string;
  player2: string;
  moves: number;
};
